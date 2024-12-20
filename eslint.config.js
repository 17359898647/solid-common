import eslint from '@antfu/eslint-config'

export default eslint({
  ignores: [
    'node_modules',
    'src/types/*',
  ],
  unocss: true,
  jsx: true,
  isInEditor: false,
  solid: {
    overrides: {
      'solid/reactivity': 0,
    },
  },
  jsonc: false,
  stylistic: {
    overrides: {
      'style/jsx-sort-props': [2, {
        callbacksLast: true,
        ignoreCase: false,
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false,
      }],
      'style/jsx-max-props-per-line': [2, {
        maximum: {
          multi: 1,
          single: 1,
        },
      }],
      'style/jsx-first-prop-new-line': [2, 'always'],
      'style/jsx-wrap-multilines': [2, {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        return: 'parens-new-line',
      }],
      'style/jsx-one-expression-per-line': [2, {
        allow: 'literal',
      }],
      'no-console': 0,
      'import/order': [2, {
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: false,
          orderImportKind: 'asc',
        },
      }],
    },
  },
})
