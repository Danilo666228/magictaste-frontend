import { Search, X } from 'lucide-react'
import { ComponentProps } from 'react'

import { Input } from '@/components/ui/common'

interface SearchInputProps extends ComponentProps<'input'> {
	searchValue: string
	setSearchValue: (value: string) => void
	placeholder?: string
}

export const SearchInput = ({ searchValue, setSearchValue, placeholder = 'Поиск блюд...', ...props }: SearchInputProps) => {
	return (
		<div className='relative w-full sm:w-[400px]'>
			<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
				<Search className='h-4 w-4 text-gray-400' />
			</div>
			<Input
				type='search'
				className='focus:primary w-full border-gray-200 py-2 pl-10 pr-10 focus:ring-1 focus:ring-primary focus:ring-opacity-50 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden'
				placeholder={placeholder}
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				{...props}
			/>
			{searchValue && (
				<button className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={() => setSearchValue('')}>
					<X className='h-4 w-4 text-gray-400 hover:text-gray-600' />
				</button>
			)}
		</div>
	)
}
