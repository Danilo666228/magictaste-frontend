'use client'

import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/common'
import { SearchInput } from '@/components/ui/elements/input/SearchInput'

import { useProfile } from '@/hooks/useProfile'

import { SERVER_URL } from '@/lib/constants/url.constants'

import { Account } from '@/shared/api/types'

import { SupportTicketChat } from './SupportTicketChat/SupportTicketChat'
import { SupportTicketList } from './SupportTicketList'

export function SupportTickets() {
	const [selectedTicket, setSelectedTicket] = useState<Account | null>(null)
	const [socket, setSocket] = useState<Socket | null>(null)
	const [searchQuery, setSearchQuery] = useState('')
	const { profile } = useProfile()

	useEffect(() => {
		if (!profile?.data.id) return

		const socket = io(SERVER_URL, {
			auth: {
				userId: profile.data.id
			},
			withCredentials: true,
			transports: ['websocket']
		})

		socket.on('newChatRequest', data => {})

		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [profile?.data.id])

	const handleTicketClick = (ticket: Account) => {
		setSelectedTicket(ticket)

		if (socket && profile?.data.id) {
			socket.emit('assignChat', {
				userId: ticket.id,
				supportId: profile.data.id
			})
		}
	}

	return (
		<div className='h-[calc(100vh-100px)]'>
			<ResizablePanelGroup direction='horizontal' className='w-full rounded-lg border'>
				<ResizablePanel className='min-w-[300px]' defaultSize={100}>
					<div className='flex w-full flex-col gap-4 p-4'>
						<SearchInput placeholder='Поиск' setSearchValue={setSearchQuery} searchValue={searchQuery} />
						{socket ? (
							<SupportTicketList onTicketSelect={handleTicketClick} socket={socket} searchQuery={searchQuery} />
						) : (
							<div>Подключение к серверу...</div>
						)}
					</div>
				</ResizablePanel>
				{selectedTicket && <ResizableHandle withHandle />}
				{selectedTicket && (
					<ResizablePanel className='min-w-[300px]' defaultSize={100}>
						<SupportTicketChat socket={socket} selectedTicket={selectedTicket} onClose={() => setSelectedTicket(null)} />
					</ResizablePanel>
				)}
			</ResizablePanelGroup>
		</div>
	)
}
