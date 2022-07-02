module.exports = {
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:jest-react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['jsx-a11y', '@typescript-eslint', 'jest', 'jest-react'],
  ignorePatterns: ['.eslintrc.js', 'vite.config.ts'],
  rules: {
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['methods', 'arrowFunctions'] },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    'no-console': ['error'],
    'no-debugger': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'expectSaga'],
      },
    ],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 0,
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/indent': 0,
    'operator-linebreak': 'off',
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'no-restricted-syntax': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0
  },
};
