var webpack = require('webpack');
module.exports = {
	mode: 'development',
	plugins: [new webpack.ProvidePlugin({
     	'THREE': 'three/build/three'
})]
}
