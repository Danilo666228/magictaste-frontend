import { Loader2, QrCode, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
	Button,
	Container,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/common'

import { useProfile } from '@/hooks/useProfile'

import { useEnableTotpMutation } from '@/shared/api/hooks/totp/useEnableTotpMutation'
import { useGetGenerateTotpQuery } from '@/shared/api/hooks/totp/useGetGenerateTotpQuery'

export function EnableTotp() {
	const { refetch } = useProfile()
	const { data: twoFactorAuth, refetch: refetchGenerateTotp } = useGetGenerateTotpQuery()
	const { mutateAsync: enableTotp, isPending } = useEnableTotpMutation({ options: { onSuccess: () => refetch() } })
	const [code, setCode] = useState('')
	const [seconds, setSeconds] = useState(twoFactorAuth?.data.remainingSeconds || 30)

	useEffect(() => {
		if (twoFactorAuth?.data.remainingSeconds) {
			setSeconds(twoFactorAuth.data.remainingSeconds)
		}

		const timer = setInterval(() => {
			setSeconds(prev => {
				if (prev <= 1) {
					refetchGenerateTotp()
					return twoFactorAuth?.data.remainingSeconds || 30
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [twoFactorAuth?.data.remainingSeconds, refetchGenerateTotp])

	const onComplete = (value: string) => {
		enableTotp({ params: { pin: value, secret: twoFactorAuth?.data.secret ?? '' } })
		setCode('')
	}
	return (
		<Dialog modal>
			<DialogTrigger asChild>
				<Button variant='default' size='sm' className='bg-primary hover:bg-primary/90'>
					Включить
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-md'>
				<DialogHeader className='space-y-3'>
					<DialogTitle className='text-center text-xl font-semibold'>Настройка 2FA</DialogTitle>
					<div className='flex items-center justify-center gap-2 text-muted-foreground'>
						<Smartphone className='h-4 w-4' />
						<span className='text-sm'>Настройка приложения аутентификации</span>
					</div>
				</DialogHeader>

				<div className='space-y-4'>
					<div className='rounded-lg border bg-muted/20 p-3'>
						<p className='text-sm leading-relaxed text-muted-foreground'>
							Отсканируйте QR-код с помощью приложения аутентификации (Google Authenticator, Authy) и введите 6-значный код для
							подтверждения.
						</p>
					</div>

					<div className='flex flex-col items-center justify-center gap-4'>
						<div className='relative rounded-lg border bg-white p-1'>
							<Image
								src={twoFactorAuth?.data.qrCodeUrl || ''}
								alt='QR-код'
								width={200}
								height={200}
								className='rounded-md'
								loading='lazy'
								unoptimized
							/>
							<div className='absolute bottom-2 right-2 rounded-full bg-white p-1 shadow-sm'>
								<QrCode className='h-4 w-4 text-primary' />
							</div>
						</div>

						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<span className='relative mr-2 flex size-2'>
								<span className='absolute left-0 top-0 inline-flex h-full w-full animate-ping rounded-full bg-primary' />
								<span className='relative inline-flex size-2 rounded-full bg-primary' />
							</span>
							<span>Код обновится через: {seconds} сек</span>
						</div>
					</div>

					<Container className='rounded-lg bg-muted/20 p-3'>
						<div className='flex flex-col gap-2'>
							<span className='text-center text-sm font-medium'>Секретный код:</span>
							<div className='break-all rounded bg-black/5 p-2 text-center text-sm'>{twoFactorAuth?.data.secret || ''}</div>
							<span className='text-center text-xs text-muted-foreground'>
								Используйте этот код, если не можете отсканировать QR-код
							</span>
						</div>
					</Container>

					<div className='mt-4 flex flex-col items-center gap-3'>
						<span className='text-sm font-medium'>Введите код из приложения:</span>
						<InputOTP maxLength={6} value={code} onChange={setCode} className='text-bold' onComplete={e => onComplete(e)}>
							<InputOTPGroup>
								<InputOTPSlot className='h-12 w-12 text-lg' index={0} />
								<InputOTPSlot className='h-12 w-12 text-lg' index={1} />
								<InputOTPSlot className='h-12 w-12 text-lg' index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot className='h-12 w-12 text-lg' index={3} />
								<InputOTPSlot className='h-12 w-12 text-lg' index={4} />
								<InputOTPSlot className='h-12 w-12 text-lg' index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
				</div>

				<DialogFooter className='mt-4 flex justify-between gap-3'>
					<DialogClose asChild>
						<Button variant={'outline'} className='flex-1'>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Подключение...
								</>
							) : (
								'Отмена'
							)}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
