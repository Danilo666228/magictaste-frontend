import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
	isAuth: boolean
	setAuth: (isAuth: boolean) => void
}

const initialState: AuthStore = {
	isAuth: false,
	setAuth: (isAuth: boolean) => {}
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			...initialState,
			setAuth: (isAuth: boolean) => set({ isAuth })
		}),
		{ name: 'authorized' }
	)
)
