const path = require('path')
const postcssCopy = require('postcss-copy')
const postcssEasyImport = require('postcss-easy-import')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    postcssEasyImport({prefix: '_'}), // keep this first
    // require('postcss-url')({ url: 'inline' }),
    // require('postcss-url')({
    //   url: 'copy',
    //   // basePath: path.resolve(__dirname, 'node_modules/@blueprintjs/core/dist'),
    //   basePath: path.resolve(__dirname, 'node_modules/material-design-icons/iconfont/'),
    //   assetsPath: './static/styles'
    // }),
    postcssCopy({
		// basePath: [path.resolve(__dirname, 'node_modules/material-design-icons/iconfont/')],
		// preservePath: true,
		// dest: 'static/styles'
		basePath: ['package.json'],
		dest: 'dist'
	}),
    autoprefixer({ prefix: '_' }) // so imports are auto-prefixed too
  ]
}