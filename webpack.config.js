/**
 * webpack.config.js | Cannlytics Console
 * Created: 12/9/2020
 * Resources:
 *     https://pascalw.me/blog/2020/04/19/webpack-django.html
 *     https://medium.com/@poshakajay/heres-how-i-reduced-my-bundle-size-by-90-2e14c8a11c11
 *     https://webpack.js.org/guides/code-splitting/
 */
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const appName = 'cannlytics_console';

module.exports = env => {
  return {
    // FIXME:
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'eval',
    // mode: 'development',
    // devtool: 'eval',
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
    // entry: {
    //   consoleStyle: `./${appName}/assets/css/console.scss`,
    //   cannlyticsStyle: `./${appName}/assets/css/cannlytics.scss`,
    //   cannlytics: `./${appName}/assets/js/index.js`,
    //   dashboard: `./${appName}/assets/js/dashboard/dashboard.js`,
    // },
    entry: [
      `./${appName}/assets/css/console.scss`,
      `./${appName}/assets/css/cannlytics.scss`,
      `./${appName}/assets/js/index.js`,
    ],
    output: {
      path: path.resolve(__dirname, `${appName}/static/${appName}`), // Should be in STATICFILES_DIRS.
      filename: './js/cannlytics.js',
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
                name: './css/[name].css',
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
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new CssMinimizerPlugin(),
    //   ],
    // },
    plugins: [
      new Dotenv(), // Make .env variables available in entry file.
      new OptimizeCSSAssetsPlugin({
        // cssProcessorPluginOptions: {
        //   preset: ['default', { discardComments: { removeAll: true } }],
        // },
      }), // Minimize the CSS.
    ],
  }
}
