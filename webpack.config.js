const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Root paths.
const root = path.resolve(__dirname, './')
const dist = path.resolve(__dirname, './dist')
const src = path.resolve(__dirname, './src')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: `${src}/index.ts`,
  output: {
    path: dist,
    filename: 'index.js',
    library: 'logscribe',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
  },
  optimization: {
    // This is a library. No need to minify.
    minimize: false
  },
  plugins: [
    // Cleans the destination folder before building new.
    new CleanWebpackPlugin([dist], { root }),
  ],
}
