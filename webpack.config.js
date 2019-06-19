const path = require('path');

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
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'ncstat.js',
    path: path.resolve(__dirname, 'dist')
  }
};
