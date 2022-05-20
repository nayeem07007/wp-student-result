const path = require("path");

const defaults = require("@wordpress/scripts/config/webpack.config");


module.exports = (env, argv) => {
  let production = argv.mode === "production";

  return {
    entry: {
      index: path.resolve(__dirname, "src/index.js"),
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
    },

    devtool: production ? false : "source-map",

    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },

    // module = {
    //   ...defaults,
    //   externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    //   },
    // },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
