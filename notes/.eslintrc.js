module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'react/prop-types': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
};
