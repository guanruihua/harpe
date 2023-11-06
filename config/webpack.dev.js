const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')

const plugins = [
	new CleanWebpackPlugin(),
	new ProgressBarWebpackPlugin(),
	new ESBuildPlugin(),
	new webpack.DefinePlugin({
		"process.env.PROJECT_ENV": JSON.stringify(process.env.PROJECT_ENV)
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, '../public/index.html'),
		filename: 'index.html',
	}),
	new MiniCssExtractPlugin({
		filename: 'css/[name].[fullhash].css',
	}),
	new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
].filter(Boolean)

const rules = [
	{ test: /\.(js)$/, loader: 'babel-loader', exclude: /node_modules/ },
	{
		test: /\.css$/i,
		exclude: /node_modules/,
		use: [
			// MiniCssExtractPlugin.loader, 
			'style-loader', 'css-loader',
			// 'postcss-loader'
		],
	},
	{
		test: /\.module.less$/,
		exclude: /node_modules/,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '_[local]_[hash:base64:6]',
					},
					importLoaders: 2,
				},
			},
			{
				loader: 'postcss-loader',
			},
			{
				loader: 'less-loader',
				options: {
					lessOptions: {
						importLoaders: 2,
						javascriptEnabled: true,
					},
				},
			},
		],
	},
	{
		test: /\.less$/,
		exclude: /\.module.less/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'less-loader', // compiles Less to CSS
				options: {
					lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
						javascriptEnabled: true,
					},
				},
			}]
	},
	{
		test: /\.[jt]sx?$/,
		exclude: /node_modules/,
		loader: 'esbuild-loader',
		options: {
			loader: 'tsx',
			target: 'esnext',
			jsxFactory: 'React.createElement',
			jsxFragment: 'React.Fragment',
		},
	},
	{
		test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf|ico)$/i,
		type: "asset/resource",
		exclude: /node_modules/
	},
]

module.exports = {
	entry: {
		app: path.resolve(__dirname, '../background/index.tsx'),
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[fullhash].js',
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, '../src')
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
	},
	plugins,
	module: {
		rules
	},
	cache: {
		type: 'filesystem',
		// 可选配置
		buildDependencies: {
			config: [__filename],
		},
		name: 'development-cache',
	},
	mode: 'development',
	devServer: {
		port: 6457,
		host: '0.0.0.0',
		watchContentBase: true,
		inline: true,
		stats: 'errors-only',
		historyApiFallback: true,
		hot: true,
		contentBase: path.join(__dirname, '../public'),
		compress: true,
		clientLogLevel: 'warning',
		headers: { 'Access-Control-Allow-Origin': '*' },
		open: false,
		watchOptions: {
			ignored: /node_modules/,
		},
	},
	devtool: 'source-map'
}


