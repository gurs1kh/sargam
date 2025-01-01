/* global module */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    'prettier',
    'import',
    'prefer-arrow-functions',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        // prop: 'parens-new-line', // TODO: address clash with prettier
      },
    ],
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useAsyncEffect|useModal)' }],
    'react/react-in-jsx-scope': 0,
    'no-irregular-whitespace': ['warn', { skipTemplates: true }],
  },
}
