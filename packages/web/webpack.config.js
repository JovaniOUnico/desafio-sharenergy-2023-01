const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
require('dotenv').config({ path: './.env' }); 

// Instantiate the plugin.
// The `template` property defines the source
// of a template file that this plugin will use.
// We will create it later.
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
});

const env = new webpack.DefinePlugin({
  "process.env": JSON.stringify(process.env),
});

module.exports = {
  mode: "development",
  // Our application entry point.
  entry: "./src/index.tsx",
  
  // These rules define how to deal 
  // with files with given extensions.
  // For example, .tsx files 
  // will be compiled with ts-loader,
  // a spcific loader for webpack
  // that knows how to work with TypeScript files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|jpg|png|gif|svg)$/i, 
        loader: 'file-loader'
      }
    ],
  },

  // Telling webpack which extensions
  // we are interested in.
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },

  // Use the html plugin.
  plugins: [htmlPlugin, env],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    historyApiFallback: true,
    compress: true,
    port: 8080
  }  
};