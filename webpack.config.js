const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src") + "/index.jsx"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production"
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production"
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
