'use client'

import { Computer, ShieldAlert } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/common'
import { Skeleton } from '@/components/ui/common/Skeleton'

import { useGetAllSessionsQuery } from '@/shared/api/hooks/session/useGetAllSessionsQuery'
import { useGetCurrentSessionQuery } from '@/shared/api/hooks/session/useGetCurrentSessionQuery'

import { SessionItem } from './SessionItem'

export function SessionList() {
	const { data: currentSession, isPending: isCurrentSessionLoading, error: currentSessionError } = useGetCurrentSessionQuery()
	const { data: sessions, isPending: isSessionsLoading, error: sessionsError } = useGetAllSessionsQuery()

	const isLoading = isCurrentSessionLoading || isSessionsLoading
	const hasError = currentSessionError || sessionsError

	return (
		<Card className='border shadow-sm'>
			<CardHeader className='bg-muted/30 pb-4'>
				<div className='flex items-center gap-3'>
					<div className='rounded-full bg-primary/10 p-2'>
						<Computer className='h-5 w-5 text-primary' />
					</div>
					<div>
						<CardTitle className='text-xl font-medium'>Управление сессиями</CardTitle>
						<CardDescription>Просмотр и управление активными сессиями вашего аккаунта</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				{hasError ? (
					<div className='flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4'>
						<ShieldAlert className='h-5 w-5 text-red-600' />
						<p className='text-red-800'>Произошла ошибка при загрузке данных о сессиях</p>
					</div>
				) : isLoading ? (
					<div className='space-y-4'>
						<Skeleton className='h-[100px] w-full rounded-lg' />
						<Skeleton className='h-[100px] w-full rounded-lg' />
					</div>
				) : (
					<>
						<div className='space-y-3'>
							<h3 className='flex items-center gap-2 text-lg font-medium'>
								<span className='relative flex size-2'>
									<span className='absolute left-0 top-0 inline-flex h-full w-full animate-ping rounded-full bg-primary' />
									<span className='relative inline-flex size-2 rounded-full bg-primary' />
								</span>
								Текущая сессия
							</h3>
							<SessionItem session={currentSession?.data.session} isCurrentSession />
						</div>

						<div className='space-y-3 pt-2'>
							<h3 className='text-lg font-medium'>Все активные сессии</h3>
							{!sessions?.data.length ? (
								<div className='rounded-lg border bg-muted/20 p-4 text-center'>
									<p className='text-muted-foreground'>Нет других активных сессий</p>
								</div>
							) : (
								<ul className='space-y-3'>
									{sessions.data.map(session => (
										<li key={session.id}>
											<SessionItem session={session} isCurrentSession={session.id === currentSession?.data.session.id} />
										</li>
									))}
								</ul>
							)}
						</div>
					</>
				)}
			</CardContent>
		</Card>
	)
}
