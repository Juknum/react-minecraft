// ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config({
  files: ['src/**/*.ts{,x}'],
  plugins: {
    'unused-imports': unusedImports,
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
		...tseslint.configs.strict,
		...tseslint.configs.stylistic,
  ],
  rules: {
    'indent': ['error', 'tab', { SwitchCase: 1 }],
		'no-multi-spaces': ['error', { ignoreEOLComments: true }],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'unused-imports/no-unused-imports': 'error',
  }
});