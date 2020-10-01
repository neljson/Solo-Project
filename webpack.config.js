const path = require('path')
// don't know what htmlwebpackplug in is for...?
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //src is where we put all of our react stuff
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    //webpack will create a dist folder, and compile all our JS into bundle.js
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // rules we tell Webpack to apply when transforming our JS files into bundle.js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // env transforms class to functions for older pre-ES6 browsers to understand
            // preset-react will translate JSX into JS
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  devServer: {
    // dist folder needs to match vs build folder whatever we name it
    publicPath: '/dist',
    // this is if we go beyond base url using react router, ie localhost:8000/posts/1 --> 404 error
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',

      //Example of what happens in Leader.js if it were to make a request on production.
      // fetch('/api/leaders') // http://localhost:3000/api/leaders
    },
  },
}
