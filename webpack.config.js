const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin       = require('clean-webpack-plugin');
var appEnv = process.env.NODE_ENV || 'development';
var apiUrl = (appEnv == 'development') ? '' : 'https://protected-dawn-23767.herokuapp.com';

var config = {

  entry: './src/bootstrap.js',
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },

  postcss: [
      require('postcss-cssnext')({
          browsers: ['ie >= 9', 'last 2 versions']
      })
  ],

  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel" },

      // load css and postCSS
      //{ test: /\.css$/, loader: 'to-string!css-loader!postcss-loader'},
      { test: /\.css$/, loader: "raw"},

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  // inject js bundle to index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: false
    }),
    new webpack.DefinePlugin({ 
        '__API_URL__': JSON.stringify(apiUrl)
    })
  ],

  // webpack dev server configuration
  devServer: {
    contentBase: "./src",
    noInfo: false,
    hot: false
  }
};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist'])
  );
}

module.exports = config;