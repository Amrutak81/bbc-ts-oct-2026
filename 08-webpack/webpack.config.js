import path from "node:path"
import HtmlWebpackPlugin from "html-webpack-plugin"

export default {
	entry: "./src/app.ts",
	resolve: {
		extensions: [".ts", ".js", ".tsx"]
	},
	module: {
		rules: [
			{
				use: 'ts-loader',
				test: /.ts$/,
				exclude: /node_modules/
			}
		]
	},
	output: {
		path: path.resolve(import.meta.dirname, "dist"),
		clean: true,
		filename: "main.[contenthash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: false
		}
		)
	]
}
