const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const { WEBPACK_ENV } = process.env;

const PLUGIN_NAME = path.basename(process.cwd());
const BUILD_DIR = path.resolve(__dirname, 'dist');
const MODE = WEBPACK_ENV === 'development' ? 'development' : 'production';
const DEVTOOL = WEBPACK_ENV === 'development' ? 'cheap-module-source-map' : 'source-map';
const FILE_NAMING_PATTERN = '[name].[ext]';

module.exports = {
	mode: MODE,
	devtool: DEVTOOL,
	entry: {
		'main': [
			'./src/main.ts',
			'./src/main.scss',
		],
	},
	output: {
		filename: FILE_NAMING_PATTERN.replace('[ext]', 'js'),
		path: path.resolve(BUILD_DIR),
		publicPath: `/wp-content/plugins/${PLUGIN_NAME}/dist/`,
	},
	optimization: {
		minimize: WEBPACK_ENV === 'development' ? false : true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new DependencyExtractionWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: FILE_NAMING_PATTERN.replace('[ext]', 'css'),
			chunkFilename: FILE_NAMING_PATTERN.replace('[ext]', 'css').replace('[name]', '[id]'),
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, 'tsconfig.json'),
			})
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'ts-loader'
					}
				],
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: [
					'babel-loader',
				]
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					}
				]
			},
		]
	},
};
