import { DeleteCategory } from './actions/DeleteCategory'
import { CategoryColumn } from './columns'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/common'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

interface CategoryActions {
	row: Row<CategoryColumn>
}

export function CategoryActions({ row }: CategoryActions) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center'>
				<DropdownMenuLabel>Действие</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DeleteCategory categoryId={row.original.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
