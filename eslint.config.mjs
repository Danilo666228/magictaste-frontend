import * as pluginReatom from '@reatom/eslint-plugin'
import { eslint } from '@siberiacancode/eslint'
import pluginTanstackQuery from '@tanstack/eslint-plugin-query'

export default eslint(
	{
		typescript: true,
		react: true,
		jsx: true,

		plugins: ['simple-import-sort'],
		rules: {
			'simple-import-sort/imports': {
				group: ['^@', '^[./]'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				}
			}
		}
	},
	{
		name: 'cooljs/tanstack-query',
		plugins: {
			'@tanstack/query': pluginTanstackQuery
		},
		rules: {
			...pluginTanstackQuery.configs.recommended.rules
		}
	},
	{
		name: 'cooljs/reatom',
		plugins: {
			'@reatom': pluginReatom
		},
		...pluginReatom.configs.recommended
	},
	{
		name: 'cooljs/rewrite',
		rules: {
			'no-restricted-syntax': 'off',
			'promise/always-return': 'off'
		}
	}
)
