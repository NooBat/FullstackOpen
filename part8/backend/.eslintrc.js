module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['*.graphql'],
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-else-return': ['error', { allowElseIf: true }],
  },
};
