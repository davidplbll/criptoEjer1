const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtract = require('mini-css-extract-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const indextInput = "./src/index.html";
const indexOutput = "index.html";
const basePath = __dirname;
const distPath = "dist";
const webpackInitConfig = {
  mode: "development",
  resolve: {
    extensions: [".js"],
  },
  entry: {
    app: ["@babel/polyfill", "./src/index.js"],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: "[chunkhash][name].js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      { 
        test: /\.scss$/, 
        loader: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCSSExtract({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
     new MiniCSSExtractPlugin({
        filename: "./src/style.css",
      })
  ],
};
module.exports = webpackInitConfig;
