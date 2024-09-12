const path = require("path");

const commonConfig = {
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
      {
        // Handle CSS modules
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS modules
            },
          },
        ],
      },
      {
        // Handle regular CSS
        test: /\.css$/,
        exclude: /\.module\.css$/, // Exclude CSS modules
        use: ["style-loader", "css-loader"], // Process normal CSS
      },
    ],
  },
  externals: {
    preact: "preact",
  },
};

module.exports = [
  {
    ...commonConfig,
    entry: "./index.ts",
    output: {
      filename: "index.cjs.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
    },
  },
  {
    ...commonConfig,
    entry: "./index.ts",
    output: {
      filename: "index.esm.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
  },
];
