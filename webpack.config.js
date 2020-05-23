
const path = require('path');

module.exports = {
  mode: "production",
  entry: ['./main.tsx'],
  output: {
    path: path.join(__dirname, '/builds/js'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.tx', '.jsx', '.json'],
    alias: {
      'client': path.resolve('client'),
    }
  },
};
