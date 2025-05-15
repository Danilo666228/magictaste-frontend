export const ROUTE = {
	notfound: '/not-found',
	home: '/',
	checkout: '/checkout',
	thanks: '/checkout/thanks',
	about: '/about',
	auth: {
		signIn: '/auth/sign-in',
		signUp: '/auth/sign-up',
		newPassword: '/auth/new-password',
		passwordRecovery: '/auth/password-recovery'
	},
	product: (productId: string) => `/product/${productId}`,
	menu: (categoryId?: string) => (categoryId ? `/menu/${categoryId}` : '/menu'),
	dashboard: {
		favorites: '/dashboard/favorites',
		notifications: '/dashboard/notifications',
		orders: '/dashboard/orders',
		profile: '/dashboard/profile',
		settings: {
			profile: '/dashboard/settings/profile',
			account: '/dashboard/settings/account',
			session: '/dashboard/settings/session',
			notification: '/dashboard/settings/notification',
			appearance: '/dashboard/settings/appearance'
		},
		support: '/dashboard/support',
		admin: {
			overview: '/dashboard/admin/overview',
			products: '/dashboard/admin/products',
			categories: '/dashboard/admin/categories',
			ingredients: '/dashboard/admin/ingredients',
			support: '/dashboard/admin/support',
			accounts: '/dashboard/admin/accounts',
			orders: '/dashboard/admin/orders'
		}
	}
}




