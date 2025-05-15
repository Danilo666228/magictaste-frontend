'use client'

import { Image as ImageIcon, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Skeleton,
	Typography
} from '@/components/ui/common'
import { ImageUpload } from '@/components/ui/elements/image-upload/ImageUpload'

import { useChangeAvatarMutation } from '@/shared/api/hooks/account/useChangeAvatarMutation'

import { useChangeAvatarForm } from '../../(hooks)/useChangeAvatarForm'

import { getMediaSource } from '@/lib/utils'
import { cn } from '@/lib/utils/twMerge'
import { Modal } from '@/components/ui/elements/modal/Default/Modal'

export function ChangeAvatarForm() {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const { isPending, profile, handleFileChange, handleDeleteAvatar } = useChangeAvatarForm()
	const { mutateAsync: changeAvatar, error } = useChangeAvatarMutation({
		config: {
			headers: {
				ContentType: 'multipart/form-data'
			}
		}
	})

	const handleAvatarClick = () => inputRef.current?.click()

	const hasAvatar = Boolean(profile?.data.picture)

	const [isOpen, setIsOpen] = useState(false)
	if (isPending) return <ChangeAvatarFormSkeleton />

	return (
		<Card className="w-full border shadow-sm">
			<CardHeader className="flex flex-row items-center gap-3 bg-muted/30 pb-4">
				<div className="rounded-full bg-primary/10 p-2">
					<ImageIcon className="h-5 w-5 text-primary" />
				</div>
				<div>
					<CardTitle className="text-xl font-medium">Изменить аватар</CardTitle>
					<CardDescription>Выберите новый аватар для вашего профиля</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-6 p-6">
				<div className="group relative">
					<Avatar
						onClick={handleAvatarClick}
						className={cn(
							'h-[150px] w-[150px] cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:opacity-90 hover:shadow-md',
							!hasAvatar && 'border-dashed border-muted-foreground/50'
						)}>
						<Modal
							title="Изменение аватара"
							open={isOpen}
							onOpenChange={setIsOpen}>
							<ImageUpload
								onSubmit={async file => {
									const formData = new FormData()
									formData.append('file', file)
									await changeAvatar({ params: { formData } })
								}}
							/>
						</Modal>
						<AvatarImage src={getMediaSource(profile?.data.picture)} />
						<AvatarFallback className="bg-muted/50">
							<Typography className="text-center text-sm text-muted-foreground">Фото отсутствует</Typography>
						</AvatarFallback>

						<div
							className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
							<Typography className="text-sm font-medium text-white">Изменить</Typography>
						</div>
					</Avatar>
					{hasAvatar && (
						<Badge
							onClick={handleDeleteAvatar}
							className="absolute -bottom-2 right-0 flex h-8 w-8 cursor-pointer justify-center rounded-full bg-red-600 p-0 shadow-md transition-colors hover:bg-red-700">
							<Trash2 size={16} />
						</Badge>
					)}
				</div>
				<div className="flex w-full flex-col items-center gap-3">
					<Typography className="max-w-[300px] text-center text-sm text-muted-foreground">
						Поддерживаемые форматы: .jpg, .jpeg, .png или .gif. Макс.размер: 10 МБ
					</Typography>
					<Button variant="outline" size="sm" onClick={handleAvatarClick} className="mt-2">
						Выбрать файл
					</Button>
				</div>
				<Input className="hidden" type="file" ref={inputRef} onChange={handleFileChange} accept="image/*" />
			</CardContent>
		</Card>
	)
}

export function ChangeAvatarFormSkeleton() {
	return <Skeleton className="h-[350px] w-full rounded-xl" />
}
