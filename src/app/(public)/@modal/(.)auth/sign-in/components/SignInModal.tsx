'use client'

import { useRouter } from 'next/navigation'

import { SignInForm } from '@/app/auth/sign-in/(components)/SignInForm'

import { Dialog, DialogContent } from '@/components/ui/common'

export function SignInModal() {
	const router = useRouter()
	return (
		<Dialog modal defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				{/* <DialogHeader></DialogHeader> */}
				<SignInForm />
			</DialogContent>
		</Dialog>
	)
}
