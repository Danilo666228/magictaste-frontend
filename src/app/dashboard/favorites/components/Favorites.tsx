'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Typography } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useProfile } from '@/hooks/useProfile'

import { useGetFavoriteProductsQuery } from '@/shared/api/hooks/favorite/useGetFavoriteProductsQuery'
import { useDebounceValue } from '@/shared/hooks'

import { FavoriteList } from './FavoriteList'
import { ROUTE } from '@/config/route.config'

export function Favorites() {
	const { profile } = useProfile()
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearch = useDebounceValue(searchValue, 500)

	const { data: favorites } = useGetFavoriteProductsQuery({
		config: {
			params: {
				search: debouncedSearch
			}
		}
	})

	return (
		<div className='container mx-auto'>
			<div className='mb-4 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Heart size={32} className='fill-red-500 text-red-500' />
					<Typography className='text-2xl font-bold'>Избранные товары</Typography>
				</div>
				<SearchInput placeholder='Поиск избранных' searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			{!favorites?.data.length ? (
				<div className='flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/50 p-12 text-center'>
					<div className='rounded-full border bg-background p-3 shadow-md'>
						<Heart className='h-8 w-8 fill-red-500 text-red-500' />
					</div>
					<Typography tag='h3' className='text-muted-foreground'>
						Добавьте товары в избранное, чтобы просматривать их здесь
					</Typography>
					<Link href={ROUTE.menu()} className='text-primary'>
						<Typography tag={'h3'}>Перейти в меню</Typography>
					</Link>
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					<FavoriteList favorites={favorites?.data ?? []} />
				</div>
			)}
		</div>
	)
}
