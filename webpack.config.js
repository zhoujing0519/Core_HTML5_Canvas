module.exports = {
	entry: {
		dial: './src/js/dial.js',
		bezier: './src/js/bezier.js',
		drag: './src/js/drag.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/demos/js/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
		]
	},
};