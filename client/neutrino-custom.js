const webpack = require('webpack');

module.exports = neutrino => {
  neutrino.config
    .output
      .publicPath('/')
      .end()
    .devtool('source-map')
};
