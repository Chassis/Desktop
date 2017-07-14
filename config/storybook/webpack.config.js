const path = require( 'path' );
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
	const config = genDefaultConfig(baseConfig, env);

	// Shim in our fake electron modules.
	config.resolve.alias.child_process = path.resolve( __dirname, 'dummy-child_process.js' );
	config.resolve.alias.electron = path.resolve( __dirname, 'dummy-electron.js' );

	// Add SCSS processing.
	// console.log( config );
	config.module.rules.push({
		test: /\.scss$/,
		use: [
			{
				loader: "style-loader" // creates style nodes from JS strings
			},
			{
				loader: "css-loader" // translates CSS into CommonJS
			},
			{
				loader: "sass-loader" // compiles Sass to CSS
			},
		],
		// loader: ExtractTextPlugin.extract('style', 'css!sass')
	});

	return config;
};
