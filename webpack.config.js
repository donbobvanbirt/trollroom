const webpack = require('webpack')
const path = require('path')

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
  ],
  output: {
    path: path.resolve('build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY)
      }
    })
  ],


  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
