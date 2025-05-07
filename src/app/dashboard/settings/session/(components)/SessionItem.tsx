import { Clock, MapPin, Trash2 } from 'lucide-react'
import { useFormatter } from 'next-intl'

import { Badge, Button, Card, CardContent } from '@/components/ui/common'

import { useDeleteSessionMutation } from '@/shared/api/hooks/session/useDeleteSessionMutation'
import { useGetAllSessionsQuery } from '@/shared/api/hooks/session/useGetAllSessionsQuery'
import { Session } from '@/shared/api/types'

import { SessionInfo } from './SessionInfo'
import { getBrowserIcon } from '@/lib/utils/getBrowseIcon'

interface SessionItemProps {
	session: Session | undefined
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session?.metadata.device.browser ?? '')
	const { refetch } = useGetAllSessionsQuery()
	const { mutate: deleteSession, isPending } = useDeleteSessionMutation({
		options: {
			onSuccess: () => {
				refetch()
			}
		}
	})
	const formatter = useFormatter()

	if (!session) return null

	return (
		<Card className={`border transition-all ${isCurrentSession ? 'border-primary/30 bg-primary/5' : 'hover:shadow-md'}`}>
			<CardContent className='p-0'>
				<div className='flex flex-col gap-4 p-4 md:flex-row md:items-center'>
					<div className='flex items-center gap-4'>
						<div className={`rounded-full p-2.5 ${isCurrentSession ? 'bg-primary/20' : 'bg-muted/30'}`}>
							{Icon && <Icon className='h-6 w-6 text-primary' />}
						</div>

						<div className='space-y-1'>
							<div className='flex items-center gap-2'>
								<h3 className='font-medium'>{session.metadata.device.browser}</h3>
								{isCurrentSession && (
									<Badge variant='outline' className='bg-primary/10 text-xs text-primary'>
										Текущая
									</Badge>
								)}
							</div>
							<div className='flex items-center gap-3 text-sm text-muted-foreground'>
								<span>{session.metadata.device.os}</span>
								<span className='h-1 w-1 rounded-full bg-muted-foreground/50'></span>
								<div className='flex items-center gap-1'>
									<Clock className='h-3.5 w-3.5' />
									<span>
										{formatter.dateTime(new Date(session.createdAt), {
											dateStyle: 'medium',
											timeStyle: 'short'
										})}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='flex items-center gap-2 md:ml-auto'>
						<div className='flex items-center gap-1 text-sm text-muted-foreground'>
							<MapPin className='h-3.5 w-3.5' />
							<span>
								{session.metadata.location.city}, {session.metadata.location.country}
							</span>
						</div>

						<div className='ml-auto flex items-center gap-2'>
							<SessionInfo session={session} />

							{!isCurrentSession && (
								<Button
									variant='destructive'
									size='sm'
									onClick={() => deleteSession({ config: { params: { id: session.id } } })}
									disabled={isPending}
									className='bg-red-600 hover:bg-red-700'>
									<Trash2 className='mr-1 h-4 w-4' />
									Удалить
								</Button>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
