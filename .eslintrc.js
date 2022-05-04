module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/no-array-index-key': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@chakra-ui/react',
            importNames: ['Link'],
            message: 'Use custom Link component instead.',
          },
        ],
      },
    ],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'import/no-cycle': 'off',
    'no-multi-assign': 'off',
    semi: ['error', 'never'],
  },
}
