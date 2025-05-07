import { chartConfig } from './chart.config'

export const chartData = (sales: number, customers: number) => [
	{
		name: 'Продажи',
		value: sales,
		fill: chartConfig.sales.theme.light
	},

	{
		name: 'Клиенты',
		value: customers,
		fill: chartConfig.clients.theme.light
	}
]
