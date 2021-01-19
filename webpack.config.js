/**
 * webpack.config.js | Cannlytics Console
 * Created: 12/9/2020
 * Resources:
 *     https://pascalw.me/blog/2020/04/19/webpack-django.html
 *     https://medium.com/@poshakajay/heres-how-i-reduced-my-bundle-size-by-90-2e14c8a11c11
 */

const path = require('path');
const appName = 'cannlytics_console';
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [{
  mode: 'development', // PRODUCTION: Change from development to production.
  devtool: 'eval', // PRODUCTION: Change from eval to source-map.
  entry: [
    `./${appName}/assets/js/index.js`,
  ],
  output: {
    filename: './js/bundle.js',
    libraryTarget: 'var',
    library: 'cannlytics', // Turns JavaScript into a module.
    path: path.resolve(__dirname, `${appName}/static/${appName}`), // Should be in STATICFILES_DIRS.
    // publicPath: "/static/", // Should match Django STATIC_URL.
    // chunkFilename: "[id]-[hash].js", // DO have Webpack hash chunk filename.
  },
  devServer: {
    writeToDisk: true, // Write files to disk in dev mode, so that Django can serve the assets.
  },
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader', // Convert ES2015 to JavaScript.
        query: {
          // presets: ["@babel/preset-env"],
          "presets": [
            ["@babel/preset-env", {
              "targets": { "esmodules": true }
            }]
          ]
        },
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: MiniCssExtractPlugin.loader },
      //     { loader: 'css-loader', options: { importLoaders: 1 } }
      //   ],
      // },
    ],
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: './css/bundle.css'
  //   })
  // ]
}];
