'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, Filter, Search, Settings } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Typography
} from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { checkAccessRoles } from '@/lib/utils/accessRoles'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[] | undefined
	filterKey?: string
	createModal?: React.ReactNode
	editModal?: (row: TData) => React.ReactNode
	isLoading?: boolean
	title?: string
	filters?: {
		key: string
		label: string
		options: { value: string; label: string }[]
	}[]
	onPageChange?: (page: number) => void
	onPageSizeChange?: (pageSize: number) => void
	totalCount?: number
	pageSize?: number
	page?: number
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterKey,
	createModal,
	editModal,
	isLoading = false,
	title,
	filters,
	onPageChange,
	onPageSizeChange,
	totalCount,
	pageSize = 10,
	page = 1
}: DataTableProps<TData, TValue>) {
	const { profile } = useProfile()
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		pageCount: totalCount ? Math.ceil(totalCount / pageSize) : 1,
		state: {
			sorting,
			columnFilters,
			pagination: {
				pageIndex: page - 1,
				pageSize
			}
		}
	})

	if (!profile?.data) return null

	return (
		<div className='space-y-4'>
			<Card>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<div className='flex flex-col gap-2'>
							<CardTitle>{title}</CardTitle>
							<CardDescription>Управление данными в системе</CardDescription>
						</div>
						<div className='flex items-center gap-2'>
							{filterKey && (
								<>
									{checkAccessRoles(
										profile?.data.roles.map(role => role.name),
										['SUPER_ADMIN', 'ADMIN']
									) && <div className='flex items-center gap-2'>{createModal}</div>}

									<div className='relative'>
										<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
										<Input
											placeholder='Поиск...'
											value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
											onChange={event => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
											className='w-[300px] pl-8'
										/>
									</div>
								</>
							)}
							{filters?.map(filter => (
								<Select key={filter.key} onValueChange={value => table.getColumn(filter.key)?.setFilterValue(value)}>
									<SelectTrigger className='w-[180px]'>
										<Filter className='mr-2 h-4 w-4' />
										<SelectValue placeholder={filter.label} />
									</SelectTrigger>
									<SelectContent>
										{filter.options.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							))}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map(header => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											)
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{isLoading ? (
									Array.from({ length: 5 }).map((_, index) => (
										<TableRow key={`loading-${index}`}>
											{Array.from({ length: columns.length }).map((_, cellIndex) => (
												<TableCell key={`loading-cell-${cellIndex}`}>
													<Skeleton className='h-8 w-full rounded-md' />
												</TableCell>
											))}
										</TableRow>
									))
								) : table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map(row => (
										<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map(cell => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
											{checkAccessRoles(
												(profile?.data.roles ?? []).map(role => role.name),
												['SUPER_ADMIN', 'ADMIN']
											) && (
												<TableCell className='text-right'>
													<Popover>
														<PopoverTrigger asChild>
															<Button variant='ghost' size='icon'>
																<Settings size={16} />
															</Button>
														</PopoverTrigger>
														<PopoverContent className='flex flex-col gap-2 p-0'>
															<div className='px-2 py-1 text-center'>
																<Typography className='text-center text-sm font-semibold'>
																	Действия
																</Typography>
															</div>
															<Separator className='' />
															<div className='p-2'>{editModal && editModal(row.original)}</div>
														</PopoverContent>
													</Popover>
												</TableCell>
											)}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className='h-24 text-center'>
											Ничего не найдено
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className='mt-4 flex items-center justify-between px-4'>
						<div className='hidden flex-1 text-sm text-muted-foreground lg:flex'>
							{table.getFilteredSelectedRowModel().rows.length} из {table.getFilteredRowModel().rows.length} строк выбрано.
						</div>
						<div className='flex w-full items-center gap-8 lg:w-fit'>
							<div className='hidden items-center gap-2 lg:flex'>
								<Label htmlFor='rows-per-page' className='text-sm font-medium'>
									Строк на странице
								</Label>
								<Select
									value={`${pageSize}`}
									onValueChange={value => {
										onPageSizeChange?.(Number(value))
									}}>
									<SelectTrigger className='w-20' id='rows-per-page'>
										<SelectValue placeholder={pageSize} />
									</SelectTrigger>
									<SelectContent side='top'>
										{[10, 20, 30, 40, 50].map(size => (
											<SelectItem key={size} value={`${size}`}>
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='flex w-fit items-center justify-center text-sm font-medium'>
								Страница {page} из {Math.ceil((totalCount || 0) / pageSize)}
							</div>
							<div className='ml-auto flex items-center gap-2 lg:ml-0'>
								<Button
									variant='outline'
									className='hidden h-8 w-8 p-0 lg:flex'
									onClick={() => onPageChange?.(1)}
									disabled={page === 1}>
									<span className='sr-only'>На первую страницу</span>
									<ChevronsLeftIcon />
								</Button>
								<Button
									variant='outline'
									className='size-8'
									size='icon'
									onClick={() => onPageChange?.(page - 1)}
									disabled={page === 1}>
									<span className='sr-only'>На предыдущую страницу</span>
									<ChevronLeftIcon />
								</Button>
								<Button
									variant='outline'
									className='size-8'
									size='icon'
									onClick={() => onPageChange?.(page + 1)}
									disabled={page === Math.ceil((totalCount || 0) / pageSize)}>
									<span className='sr-only'>На следующую страницу</span>
									<ChevronRightIcon />
								</Button>
								<Button
									variant='outline'
									className='hidden size-8 lg:flex'
									size='icon'
									onClick={() => onPageChange?.(Math.ceil((totalCount || 0) / pageSize))}
									disabled={page === Math.ceil((totalCount || 0) / pageSize)}>
									<span className='sr-only'>На последнюю страницу</span>
									<ChevronsRightIcon />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
