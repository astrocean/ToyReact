const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development", // "production" | "development" | "none",
  entry: './src/index.js',
  output: {
    path:path.resolve(__dirname, "dist"), 
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
                "plugins": [
                    ["@babel/plugin-transform-react-jsx",{
                        pragma:'createElement'
                }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default)
      template: 'index.html'
    })
  ],
  optimization:{
    minimize:false
  }
};