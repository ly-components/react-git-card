var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var hots = [path.join(__dirname, 'src'), path.join(__dirname, 'demo')];
if (pkg.dependencies)
  for (var pack in pkg.dependencies) {
    /^react-/.test(pack) && hots.push(path.join(__dirname, 'node_modules', pack));
  }
module.exports = {
  entry: {
    demo: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './demo/demo'
    ]
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: '[name].entry.js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'react-hot!babel',
      include: hots
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer!less'
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
