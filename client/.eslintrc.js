const { Neutrino } = require('neutrino');
const pkg = require('./package.json');
const api = Neutrino();
const eslint = require('neutrino-middleware-eslint');

pkg.neutrino.use
  .map(require)
  .map(api.use);

api.use(eslint, {
  test: /\.(js|jsx)$/,
  exclude: [],
  eslint: {
    baseConfig: {
      extends: 'airbnb',
    },
    envs: ['browser'],
    rules: {
      'jsx-quotes': ['error', 'prefer-single'],
      'react/jsx-filename-extension': 'off',
      'jsx-a11y/href-no-hash': 'off'
    }
  }
});

module.exports = api.eslintrc();
