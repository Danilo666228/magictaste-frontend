'use client'

import { User } from 'lucide-react'
import { useFormatter } from 'next-intl'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Separator,
	Skeleton,
	Typography
} from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'

export function ProfileAbout() {
	const { profile, isPending } = useProfile()
	const formatter = useFormatter()
	return isPending ? (
		<ProfileAboutSkeleton />
	) : (
		<Card className="overflow-hidden border shadow-sm">
			<CardHeader className="bg-muted/40 pb-4">
				<CardTitle className="flex items-center justify-between">
					<Typography tag="h2" className="text-xl font-semibold">
						Личная информация
					</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="flex flex-col items-start gap-8 md:flex-row">
					<div className="flex flex-col items-center gap-3">
						<Avatar className={cn('h-[150px] w-[150px] border-2 shadow-md')}>
							<AvatarImage width={300} height={300} src={getMediaSource(profile?.data.picture)} alt="Фото профиля" />
							<AvatarFallback className="bg-primary/10">
								<User size={50} className="text-primary/60" />
							</AvatarFallback>
						</Avatar>
					</div>

					<div className="max-w-[400px] flex-1 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium">
								Электронная почта
							</Label>
							<Input id="email" type="text" defaultValue={profile?.data.email} readOnly className="bg-muted/30" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="username" className="text-sm font-medium">
								Имя пользователя
							</Label>
							<Input id="username" type="text" defaultValue={profile?.data.userName} readOnly className="bg-muted/30" />
						</div>

						<Separator className="my-4" />

						<div className="flex flex-wrap gap-4 pt-2">
							<div className="rounded-md bg-muted/20 px-4 py-2">
								<p className="text-xs text-muted-foreground">Дата регистрации</p>
								<p
									className="font-medium">{formatter.dateTime(new Date(profile?.data.createdAt ?? ''), { dateStyle: 'short' })}</p>
							</div>
							<div className="rounded-md bg-muted/20 px-4 py-2">
								<p className="text-xs text-muted-foreground">Статус</p>
								<p className="font-medium">Активен</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export function ProfileAboutSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/40">
				<Skeleton className="h-7 w-48" />
			</CardHeader>
			<CardContent className="p-6">
				<div className="flex flex-col gap-8 md:flex-row">
					<Skeleton className="h-[150px] w-[150px] rounded-full" />
					<div className="flex-1 space-y-4">
						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-10 w-full" />
						</div>
						<Skeleton className="my-4 h-[1px] w-full" />
						<div className="flex gap-4">
							<Skeleton className="h-16 w-32" />
							<Skeleton className="h-16 w-32" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
