const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");

const miniCssExtract = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: devMode ? "development" : "production",

  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: / [\\/]node_modules[\\/] /,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },

  entry: {
    app: path.resolve(__dirname, "src/index.js"),

    //This is a way for splitting codes
    // app: {
    //   import: path.resolve(__dirname, "src/index.js"),
    //   dependOn: "vendor",
    // },
    vendor: ["react", "react-dom"],
  },

  output: {
    path: path.join(__dirname, "dist"),

    filename: "[name].[hash].babel.js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /node_modules/,

        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },

      {
        test: /\.css$/i,

        use: [
          devMode ? "style-loader" : miniCssExtract.loader,
          {
            loader: "css-loader",
            // options: { module: true },
          },
        ],
      },
      {
        test: /\.(png | jpe?g | svg | gif | eot | ttf | woff | woff2 )$/i,
        type: "asset",
      },
    ],
  },

  plugins: [
    new miniCssExtract({
      filename: "[name].[hash].css",
    }),

    new htmlWebpackPlugin({
      title: "Webpack config exercise",
      filename: path.join(__dirname, "dist/index.html"),
      template: path.join(__dirname, "src/index.html"),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },

    port: 9089,
    open: true,
  },
};
