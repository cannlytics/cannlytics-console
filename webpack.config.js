/**
 * Webpack | Cannlytics Console
 * Created: 12/9/2020
 * Resources:
 *     https://pascalw.me/blog/2020/04/19/webpack-django.html
 *     https://medium.com/@poshakajay/heres-how-i-reduced-my-bundle-size-by-90-2e14c8a11c11
 *     https://webpack.js.org/guides/code-splitting/
 *     https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/
 */

// Webpack plugins.
const BundleTracker = require('webpack-bundle-tracker')
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Need to nerd basis:
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// Node utilities.
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const appName = 'cannlytics_console';

module.exports = env => {
  return {
    // FIXME:
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'eval',
    devServer: {
      writeToDisk: true, // Write files to disk in dev mode, so that Django can serve the assets.
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({
      allowlist: [/^chartjs/, /^chart.js/],
    })], // in order to ignore all modules in node_modules folder
    resolve: {
      extensions: ['.js'],
    },
    // entry: [
    //   { cannlytics_css: `./${appName}/assets/css/cannlytics.scss`},
    //   { console_css: `./${appName}/assets/css/console.scss` },
    //   { cannlytics_js: `./${appName}/assets/js/index.js` },
    //   // `./${appName}/assets/css/console.scss`,
    //   // `./${appName}/assets/css/cannlytics.scss`,
    //   // `./${appName}/assets/js/index.js`,
    // ],
    entry: {
      cannlytics_css: `./${appName}/assets/css/cannlytics.scss`,
      console_css: `./${appName}/assets/css/console.scss`,
      cannlytics: `./${appName}/assets/js/index.js`,
      login_css: `./${appName}/assets/css/login.scss`,
    },
    output: {
      path: path.resolve(__dirname, `${appName}/static/${appName}`), // Should be in STATICFILES_DIRS.
      filename: './plugins/cannlytics/[name]-[hash].js',
      // filename: `./plugins/cannlytics/[name]-${version}.js`,
      libraryTarget: 'var',
      library: 'cannlytics', // Turns JavaScript into a module.
      // publicPath: "/static/", // Should match Django STATIC_URL.
      // chunkFilename: "[id]-[hash].js", // DO have Webpack hash chunk filename.
    },
    // optimization: {
    //   runtimeChunk: 'single',
    // },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'file-loader', // Output CSS.
              options: {
                name: './plugins/cannlytics/[name]-[hash].css',
                // name: `./plugins/cannlytics/[name]-${version}.css`,
              },
            },
            {
              loader: 'sass-loader', // Compiles Sass to CSS.
              options: {
                implementation: require('sass'),
                webpackImporter: false,
                sassOptions: {
                  includePaths: ['./node_modules'],
                },
              },
            },
            // {
            //   loader: MiniCssExtractPlugin.loader, // Minify CSS.
            // },
          ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader', // Convert ES2015 to JavaScript.
          query: {
            "presets": [
              ["@babel/preset-env", {
                "targets": { "esmodules": true }
              }]
            ]
          },
        },
      ],
    },
    plugins: [

      // Make .env variables available in entry file.
      new Dotenv(),

      // Minimize the CSS.
      new OptimizeCSSAssetsPlugin({
        // cssProcessorPluginOptions: {
        //   preset: ['default', { discardComments: { removeAll: true } }],
        // },
      }),

      // Create bundle with hashes.
      new BundleTracker({filename: './webpack-stats.json'}),
      
      // Remove old bundles.
      // new CleanWebpackPlugin(),

      // Grep hashes after build.
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            // Fill file hashes into templates with Python using
            // templates and entries specified in build.py.
            exec('python build.py', (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
          });
        }
      },
    ],
  }
}
