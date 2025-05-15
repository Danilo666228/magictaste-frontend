import { ColumnDef } from '@tanstack/react-table'
import { Check, ChevronDown } from 'lucide-react'
import { useFormatter } from 'next-intl'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Checkbox,
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Typography
} from '@/components/ui/common'
import { SortableHeader } from '@/components/ui/elements/table/SortableHeader'

import { Account, Role } from '@/shared/api/types'

import { getMediaSource } from '@/lib/utils'
import { getRoleName } from '@/shared/api/helpers/getRoleName'

export interface AccountColumn extends Account {
	actions?: string
}

export const columns: ColumnDef<AccountColumn>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)}
								aria-label="Select row" />
		),
		size: 28,
		enableSorting: false,
		enableHiding: false
	},

	{
		accessorKey: 'userName',
		header: ({ column }) => <SortableHeader column={column}>Имя пользователя</SortableHeader>
	},
	{
		accessorKey: 'picture',
		cell: ({ getValue }) => {
			return (
				<Avatar className="mx-auto h-[70px] w-[70px]">
					<AvatarImage src={getMediaSource(getValue<string>()) ?? ''} />
					<AvatarFallback className="text-sm">{'Фото не найдено'}</AvatarFallback>
				</Avatar>
			)
		},
		header: ({ column }) => <SortableHeader column={column}>Аватар</SortableHeader>
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <SortableHeader column={column}>Email</SortableHeader>
	},
	{
		accessorKey: 'createdAt',
		cell: ({ getValue }) => {
			const formatted = useFormatter()
			return formatted.dateTime(new Date(getValue<string>()))
		},
		header: ({ column }) => <SortableHeader column={column}>Дата регистрации</SortableHeader>
	},
	{
		accessorKey: 'updatedAt',
		cell: ({ getValue }) => {
			const formatted = useFormatter()
			return formatted.dateTime(new Date(getValue<string>()))
		},
		header: ({ column }) => <SortableHeader column={column}>Дата обновления</SortableHeader>
	},
	{
		accessorKey: 'roles',
		header: ({ column }) => <SortableHeader column={column}>Роли</SortableHeader>,
		cell: ({ getValue }) => {
			const roles = getValue<Role[]>()

			if (!roles || roles.length === 0) {
				return <span className="text-center text-sm italic text-muted-foreground">Нет ролей</span>
			}

			const displayedRoles = roles.slice(0, 2)
			const remainingCount = roles.length - displayedRoles.length

			return (
				<Popover>
					<PopoverTrigger asChild>
						<div className="group flex w-full cursor-pointer items-center justify-center gap-1.5 text-center">
							<div className="flex max-w-[200px] flex-wrap justify-center gap-1.5">
								{displayedRoles.map(role => (
									<span
										key={role.id}
										className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
										{getRoleName(role.name)}
									</span>
								))}
								{remainingCount > 0 && (
									<span
										className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
										+{remainingCount}
									</span>
								)}
							</div>
							<ChevronDown size={15}
													 className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-[250px] p-0">
						<Command className="w-full">
							<CommandInput placeholder="Поиск роли" />
							<CommandList>
								{roles.length > 0 ? (
									roles.map(role => (
										<CommandItem key={role.id} className="flex items-center justify-between gap-2">
											<span className="h-2 w-2 rounded-full bg-primary" />
											<Typography className="mr-auto">{getRoleName(role.name)}</Typography>
											<Check size={10} className="text-primary" />
										</CommandItem>
									))
								) : (
									<CommandEmpty>
										<div className="py-2 text-center text-sm text-muted-foreground">Ничего не найдено.</div>
									</CommandEmpty>
								)}
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Действие',
		cell: ({ row }) => {
		}
	}
]
