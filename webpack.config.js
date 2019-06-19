const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  target: 'node',
  mode: process.env.ENV || 'development',
  node: {
    fs: true,
    readline: true
  },
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useCache: true,
          isolatedModules: true,
          usePrecompiledFiles: true,
        },
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ],
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'ncstat.js',
    path: path.resolve(__dirname, 'dist')
  }
};
