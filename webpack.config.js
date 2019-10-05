module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    // uncomment these two lines to make life easier on dev
    // watch: true,
    // devtool: "source-map",
    devServer: {
      contentBase: './dist'
    }
  };
  