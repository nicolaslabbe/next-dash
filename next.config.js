const path = require("path");
const glob = require("glob");

require("dotenv").config();
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    config.module.rules.push(
      {
        test: /\.css$/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext].js"
        }
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "url-loader?limit=100000&&name=[name].[ext]?[hash:8]"
      }
    );

    return config;
  }
};
