const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const currentPath = path.join(__dirname);
const envPath = currentPath + '/.env';
const fileEnv = dotenv.config({ path: envPath }).parsed;
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});


module.exports = {
  mode: "production",
  entry: ['./src/main.tsx'],
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
    extensions: ['.js', '.tsx', '.ts', '.tx', '.jsx', '.json'],
    alias: {
      'src': path.resolve('src'),
    }
  },
  watchOptions: {
    ignored: [
      '/node_modules/',
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ]
};
