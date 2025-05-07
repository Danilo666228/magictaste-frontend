export const BASE_COLORS = [
	{
		name: 'indigo',
		color: '234 89% 74%',
		label: 'Индиго'
	},
	{
		name: 'sky',
		color: '199 89% 48%',
		label: 'Небесный'
	},
	{
		name: 'mint',
		color: '168 74% 45%',
		label: 'Мятный'
	},
	{
		name: 'teal',
		color: '172 66% 50%',
		label: 'Бирюзовый'
	},
	{
		name: 'emerald',
		color: '142 71% 45%',
		label: 'Изумрудный'
	},
	{
		name: 'amber',
		color: '43 96% 56%',
		label: 'Янтарный'
	},
	{
		name: 'rose',
		color: '336 80% 58%',
		label: 'Розовый'
	},
	{
		name: 'coral',
		color: '16 85% 66%',
		label: 'Коралловый'
	},
	{
		name: 'purple',
		color: '269 75% 63%',
		label: 'Пурпурный'
	},
	{
		name: 'slate',
		color: '215 25% 27%',
		label: 'Графитовый'
	}
] as const

export type BaseColor = (typeof BASE_COLORS)[number]['name']
