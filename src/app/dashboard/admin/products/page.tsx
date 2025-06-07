import { StatisticContainer } from './(components)/StatisticContainer'
import { ProductTable } from './(components)/table/ProductTable'
import { Heading } from '@/components/ui/common'

export default function ProductsPage() {
	return (
		<>
			<Heading title='Продукты' description='Управление продуктами' />
			<StatisticContainer />
			<ProductTable />
		</>
	)
}
