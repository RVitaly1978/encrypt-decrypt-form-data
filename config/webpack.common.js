const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: [`${paths.src}/index.js`],
  output: {
    path: paths.build,
    filename: '[name]-[hash:8].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: paths.build,
        ignore: ['*.DS_Store', 'template.html'],
      },
    ]),

    new HtmlWebpackPlugin({
      template: `${paths.static}/template.html`, // template file
      filename: 'index.html', // output file
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },
    ],
  },
};
