// ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import importOrder from 'eslint-plugin-import';

export default tseslint.config({
  files: [
		'src/**/*.ts{,x}', 
		'docs/**/*.ts{,x}'
	],
	ignores: [
		'docs/.next/**',
	],
  plugins: {
    'unused-imports': unusedImports,
    'import': importOrder,
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
		...tseslint.configs.strict,
		...tseslint.configs.stylistic,
  ],
  rules: {
    'indent': ['error', 'tab', { SwitchCase: 1 }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: [
					'builtin',
					'external',
					'internal',
					['parent', 'sibling', 'index'],
					'type',
				],
				pathGroups: [
					{
						pattern: 'react',
						group: 'builtin',
						position: 'after',
					},
					{
						pattern: 'react-icons/**',
						group: 'builtin',
						position: 'after',
					},
					{
						pattern: 'next/**',
						group: 'builtin',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['react', 'react-icons/**', 'next/**'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],
		'no-multi-spaces': ['error', { ignoreEOLComments: true }],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
		'object-curly-spacing': ['warn', 'always'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'unused-imports/no-unused-imports': 'error',
  }
});