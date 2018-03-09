module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol-base'],
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['prettier'],
};
