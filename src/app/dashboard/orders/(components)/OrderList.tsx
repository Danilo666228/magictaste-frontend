'use client'

import { SearchX } from 'lucide-react'
import { useState } from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Typography } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useGetOrdersQuery } from '@/shared/api/hooks/order/useGetOrdersQuery'

import { OrderItem } from './OrderItem/OrderItem'

type SearchByDate = 'date-desc' | 'date-asc'

export function OrderList() {
	const { data: orders, isLoading } = useGetOrdersQuery()
	const [searchValue, setSearchValue] = useState<string>('')
	const [sortByDate, setSortByDate] = useState<SearchByDate>('date-asc')

	const hasOrders = orders?.data && orders.data.length > 0

	const filterOrders = hasOrders
		? orders.data.filter(order => order.items.some(item => item.productTitle.toLowerCase().includes(searchValue.toLowerCase())))
		: []

	const sortedOrders = [...filterOrders].sort((a, b) => {
		switch (sortByDate) {
			case 'date-asc':
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			case 'date-desc':
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			default:
				return 0
		}
	})

	return (
		<div>
			<div className='flex justify-between'>
				<SearchInput placeholder='Поиск по названию блюда' searchValue={searchValue} setSearchValue={setSearchValue} />
				<Select onValueChange={value => setSortByDate(value as SearchByDate)}>
					<SelectTrigger className='w-[240px]'>
						<SelectValue placeholder='Выбери тип сортировки' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>По дате</SelectLabel>
							<SelectItem value='date-asc'>Сначала новые</SelectItem>
							<SelectItem value='date-desc'>Сначала старые</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{!hasOrders && searchValue && !sortedOrders?.length && (
				<div className='mt-5 flex min-h-[250px] justify-center rounded-xl border-2 border-dashed'>
					<div className='my-auto flex flex-col items-center gap-3'>
						<SearchX className='text-muted-foreground' size={56} />
						<Typography className='text-xl font-semibold'>По вашему запросу ничего не найден</Typography>
					</div>
				</div>
			)}
			{sortedOrders?.map(order => <OrderItem key={order.id} order={order} />)}
		</div>
	)
}
