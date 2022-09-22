module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      extends: ['plugin:@graphql-eslint/operations-recommended'],
    },
    {
      files: ['**/__tests__/*.js', '**/__tests__/*.jsx', '**.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ['react', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
            distinctGroup: true,
          },
          {
            pattern: '@*/**',
            group: 'external',
            position: 'before',
            distinctGroup: false,
          },
        ],
        pathGroupsExcludedImportTypes: [],
        warnOnUnassignedImports: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-case-declarations': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: true,
      },
    ],
    'no-void': 0,
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
