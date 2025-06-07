import { VerificationAccount } from './(components)/VerificationAccount'
import { ROUTE } from '@/shared/utils/constants/route'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export default async function VerifyAccountPage(props: { searchParams: Promise<{ token: string }> }) {
	const searchParams = await props.searchParams

	if (!searchParams.token || !z.string().uuid().safeParse(searchParams.token).success) {
		return redirect(ROUTE.auth.signIn)
	}

	return <VerificationAccount token={searchParams.token} />
}
