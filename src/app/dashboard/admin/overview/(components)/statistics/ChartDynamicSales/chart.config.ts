import { ChartConfig } from '@/components/ui/common'

export const chartConfig = {
	sales: {
		label: 'Продажи',
		theme: {
			light: '#8884d8',
			dark: '#a78bfa'
		}
	},

	clients: {
		label: 'Клиенты',
		theme: {
			light: '#ffc658',
			dark: '#facc15'
		}
	}
} satisfies ChartConfig
