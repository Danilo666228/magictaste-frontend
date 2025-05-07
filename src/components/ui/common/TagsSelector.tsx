'use client'

import { motion } from 'framer-motion'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Typography
} from '@/components/ui/common'

import { Button } from './Button/Button'
import { cn } from '@/lib/utils/twMerge'

type Tag = {
	id: string
	label: string
}

interface TagsSelectorProps {
	modal?: boolean
	tags: Tag[]
	selectedTags: Tag[]
	onChange: (tags: Tag[]) => void
}

export function TagsSelector({ tags, selectedTags, onChange, modal = false }: TagsSelectorProps) {
	const [inputValue, setInputValue] = useState('')
	const [open, setOpen] = useState(false)

	const filteredTags = tags.filter(tag => !selectedTags.some(selected => selected.id === tag.id))

	const handleTagChange = (id: string, isAdding: boolean) => {
		const updatedTags = isAdding ? [...selectedTags, tags.find(tag => tag.id === id)!] : selectedTags.filter(tag => tag.id !== id)
		onChange(updatedTags)
		if (isAdding) {
			setOpen(false)
		}
	}

	return (
		<Popover modal={modal} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className='w-[400px]'>
				<div className='flex flex-wrap items-center gap-2 rounded-lg border p-2'>
					{selectedTags.map((tag, index) => (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 1 }}
							key={`${tag.id}-${index}`}
							className='flex cursor-pointer items-center gap-2 rounded-sm border px-2 py-1'>
							<Typography tag='span'>{tag.label}</Typography>
							<Button
								className='size-4 rounded-sm hover:bg-red-500'
								variant='ghost'
								size='icon'
								onClick={e => {
									handleTagChange(tag.id, false)
									e.stopPropagation()
								}}>
								<X className='ml-auto opacity-50' />
							</Button>
						</motion.div>
					))}
					<ChevronsUpDown size={16} className='ml-auto opacity-50' />
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Command>
					<CommandInput placeholder='Ингредиенты' value={inputValue} onValueChange={setInputValue} />
					<CommandEmpty>Ничего не найдено</CommandEmpty>
					<CommandGroup heading='Ингредиенты'>
						{filteredTags.map((tag, index) => (
							<motion.div key={`${tag.id}-${index}`} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 1 }}>
								<CommandItem value={tag.label} onSelect={() => handleTagChange(tag.id, true)}>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											selectedTags.some(selected => selected.id === tag.id) ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{tag.label}
								</CommandItem>
							</motion.div>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
