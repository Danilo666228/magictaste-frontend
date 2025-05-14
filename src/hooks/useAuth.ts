import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/useAuthStore'

import { useLogoutMutation } from '@/shared/api/hooks/auth/useLogoutMutation'

import { ROUTE } from '@/config/route.config'

export function useAuth() {
	const router = useRouter()
	const { mutate: logout } = useLogoutMutation({
		options: {
			onSuccess: () => router.push(ROUTE.auth.signIn)
		}
	})
	const isAuth = useAuthStore(c => c.isAuth)
	const setIsAuth = useAuthStore(c => c.setAuth)


	const authorized = () => setIsAuth(true)
	const unauthorized = () => setIsAuth(false)

	const handleLogout = () => {
		logout({})
		unauthorized()
	}

	return { isAuth, authorized, unauthorized, handleLogout }
}
