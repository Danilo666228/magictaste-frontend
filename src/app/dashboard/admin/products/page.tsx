import { Heading } from '@/components/ui/common'

import { StatisticContainer } from './(components)/StatisticContainer'
import { ProductTable } from './(components)/table/ProductTable'

export default function ProductsPage() {
	return (
		<>
			<Heading title='Продукты' description='Управление продуктами' />
			<StatisticContainer />
			<ProductTable />
		</>
	)
}
