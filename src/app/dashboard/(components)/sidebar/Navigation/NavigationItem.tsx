'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar
} from '@/components/ui/common'

import { NavigationItemProps } from './types'
import { cn } from '@/lib/utils'

export function NavigationItem({ item, pathname }: NavigationItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const isActive = pathname === item.url
	const { state } = useSidebar()
	const isCollapsed = state === 'collapsed'

	if (isCollapsed && item.items) {
		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<SidebarMenuItem className={cn(isActive && 'rounded-lg bg-muted/50')}>
						<SidebarMenuButton tooltip={item.title} className={cn(isActive && 'text-primary')}>
							{item.icon && <item.icon size={18} />}
							{item.title}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</PopoverTrigger>
				<PopoverContent className='w-48 p-2' side='right' align='start'>
					<div className='flex flex-col gap-1'>
						{item.items.map(subItem => (
							<Link
								key={subItem.url}
								href={subItem.url || '#'}
								onClick={() => setIsPopoverOpen(false)}
								className={cn(
									'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
									pathname === subItem.url ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
								)}>
								{subItem.icon && <subItem.icon size={18} />}
								<span>{subItem.title}</span>
							</Link>
						))}
					</div>
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className='group/collapsible'>
			<SidebarMenuItem className={cn(isActive && 'rounded-lg bg-muted/50')}>
				<CollapsibleTrigger asChild>
					{item.url ? (
						<Link href={item.url} className='w-full'>
							<SidebarMenuButton tooltip={item.title} className={cn(isActive && 'text-primary')}>
								{item.icon && <item.icon size={18} />}
								{item.title}
								{item.items && item.items.length > 0 && (
									<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
								)}
							</SidebarMenuButton>
						</Link>
					) : (
						<SidebarMenuButton tooltip={item.title} className={cn(isActive && 'text-primary')}>
							{item.icon && <item.icon size={18} />}
							{item.title}
							{item.items && item.items.length > 0 && (
								<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
							)}
						</SidebarMenuButton>
					)}
				</CollapsibleTrigger>
				{item.items && item.items.length > 0 && (
					<CollapsibleContent>
						<SidebarMenuSub>
							{item.items?.map(subItem => (
								<SidebarMenuSubItem key={subItem.title} className={cn(pathname === subItem.url && 'bg-muted/50', 'rounded-lg')}>
									{subItem.url ? (
										<Link href={subItem.url} className='w-full'>
											<SidebarMenuSubButton asChild>
												<div className='flex items-center gap-2'>
													{subItem.icon && <subItem.icon size={18} />}
													<span className={cn(pathname === subItem.url && 'text-primary')}>{subItem.title}</span>
												</div>
											</SidebarMenuSubButton>
										</Link>
									) : (
										<SidebarMenuSubButton>
											{subItem.icon && <subItem.icon size={18} />}
											<span className={cn(pathname === subItem.url && 'text-primary')}>{subItem.title}</span>
										</SidebarMenuSubButton>
									)}
								</SidebarMenuSubItem>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				)}
			</SidebarMenuItem>
		</Collapsible>
	)
}
