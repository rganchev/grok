const path = require('path');

module.exports = {
	entry: {
		script: './main.js',
		html: './index.html',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['latest', 'react', 'stage-0'],
				plugins: ['transform-decorators-legacy'],
			},
		}, {
			test: /\.html$/,
			loader: 'file-loader',
			query: {
				name: '[name].[ext]',
			},
		}],
	},
}