module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    quotes: ["error", "single", { avoidEscape: true }],
    "jsx-quotes": ["error", "prefer-single"],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.js", "**/*.spec.js", "**/*.config.js"] },
    ],
  },
};
