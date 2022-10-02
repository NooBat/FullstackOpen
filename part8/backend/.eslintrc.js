module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['./src/**/*.js'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      extends: 'plugin:@graphql-eslint/schema-recommended',
      rules: {
        '@graphql-eslint/description-style': 0,
        '@graphql-eslint/no-typename-prefix': 0,
        '@graphql-eslint/strict-id-in-types': [
          'error',
          { exceptions: { suffixes: ['Response'] } },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-else-return': ['error', { allowElseIf: true }],
  },
};
