'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Typography } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useFavorite } from '@/hooks/useFavorite'

import { useDebounceValue } from '@/shared/hooks'

import { FavoriteList } from './FavoriteList'

export function Favorites() {
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearch = useDebounceValue(searchValue, 500)
	const { favorites } = useFavorite(debouncedSearch)

	return (
		<div className='container mx-auto'>
			<div className='mb-4 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Heart size={32} className='fill-red-500 text-red-500' />
					<Typography className='text-2xl font-bold'>Избранные товары</Typography>
				</div>
				<SearchInput placeholder='Введите название товара' searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='flex flex-col gap-4'>
				<FavoriteList favorites={favorites?.data} />
			</div>
		</div>
	)
}
