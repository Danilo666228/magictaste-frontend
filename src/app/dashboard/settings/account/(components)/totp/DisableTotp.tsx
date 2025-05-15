import { Loader2, ShieldOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/common/Button/Button'
import { ConfirmModal } from '@/components/ui/elements/modal/ConfirmModal'

import { useDisableTotpMutation } from '@/shared/api/hooks/totp/useDisableTotpMutation'
import { useQueryClient } from '@tanstack/react-query'

export function DisableTotp() {
	const queryClient = useQueryClient()
	const [isOpen, setIsOpen] = useState(false)

	const { mutateAsync: disable, isPending } = useDisableTotpMutation({
		options: {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['getProfile'] })
				setIsOpen(false)
			}
		}
	})

	return (
		<ConfirmModal
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={
				<Button variant={'destructive'} size="sm" disabled={isPending} className="bg-red-600 hover:bg-red-700">
					Отключить
				</Button>
			}
			title="Отключение двухфакторной аутентификации"
			description="Вы уверены, что хотите отключить двухфакторную аутентификацию? Это снизит уровень защиты вашего аккаунта."
			icon={<ShieldOff className="h-6 w-6 text-red-600" />}
			confirmText={
				isPending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Отключение...
					</>
				) : (
					'Отключить 2FA'
				)
			}
			confirmVariant="destructive"
			onConfirm={() => disable({})}
			disabled={isPending}
		/>
	)
}
