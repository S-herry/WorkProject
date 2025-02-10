const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/main.jsx",
    output: {
      filename: "js/main.js",
      path: path.resolve(__dirname, "./build"),
      clean: true,
      chunkFilename: "js/main.js",
      publicPath: "/",
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // 強制所有模組合併到一個檔案中
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
        chunkFilename: "css/style.css",
      }),
    ],
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]",
          },
        },
        {
          test: /\.(woff|woff2|ttf|eot|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "font/[name].[ext]",
          },
        },
        {
          test: /\.mp3$/,
          type: "asset/resource",
          generator: {
            filename: "mp3/[name].[ext]",
          },
        },
        {
          test: /\.(?:js|jsx?|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env"],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: false, // 禁用代碼分割
      minimizer: [new CssMinimizerPlugin()],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "static"),
      },
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
