const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
				test: /\.(svg|png|jpg|jpeg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[hash][ext][query]',
				},
			},
			{
				test: /\.(otf|ttf|woff|woff2|eof)$/i,
				type: 'asset/resource',
			},
      {
				test: /\.css$/i,
				use: [
					{
						loader: 'style-loader'
					},
					'css-loader',
					'postcss-loader',
				],
			},
      {
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html', inject: 'body' }),
    new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new DotEnv(),
  ],
  optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
  },
};
