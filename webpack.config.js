const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: [
    {
      filename: "index.cjs.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
    },
    {
      filename: "index.esm.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        type: "module",
      },
    },
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    preact: "preact", // Treat Preact as an external dependency
  },
};
