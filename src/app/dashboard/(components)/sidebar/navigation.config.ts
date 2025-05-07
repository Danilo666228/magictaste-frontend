import { Apple, LucideIcon, MessageSquare, SquareChartGantt, User } from 'lucide-react'
import { BarChart3, Bell, BookOpenCheck, CircleUser, Heart, Settings, Truck, Users } from 'lucide-react'

import { NavigationItem } from './Navigation/types'
import { ROUTE } from '@/config/route.config'

export const navigationConfig: NavigationItem[] = [
	{
		title: 'Профиль',
		url: ROUTE.dashboard.profile,
		icon: CircleUser,
		isActive: true,
		roles: ['REGULAR']
	},
	{
		title: 'Избранное',
		url: ROUTE.dashboard.favorites,
		icon: Heart,
		isActive: true,
		roles: ['REGULAR']
	},
	{
		title: 'Заказы',
		url: ROUTE.dashboard.orders,
		icon: Truck,
		isActive: true,
		roles: ['REGULAR']
	},
	{
		title: 'Меню',
		url: ROUTE.menu(),
		icon: BookOpenCheck,
		isActive: true,
		roles: ['REGULAR']
	},
	{
		title: 'Уведомления',
		url: ROUTE.dashboard.notifications,
		icon: Bell,
		isActive: true,
		roles: ['REGULAR']
	},
	{
		title: 'Настройки',
		icon: Settings,
		isActive: true,
		roles: ['REGULAR'],
		items: [
			{
				title: 'Профиль',
				url: ROUTE.dashboard.settings.profile,
				roles: ['REGULAR']
			},
			{
				title: 'Аккаунт',
				url: ROUTE.dashboard.settings.account,
				roles: ['REGULAR']
			},
			{
				title: 'Сессии',
				url: ROUTE.dashboard.settings.session,
				roles: ['REGULAR']
			},
			{
				title: 'Уведомления',
				url: ROUTE.dashboard.settings.notification,
				roles: ['REGULAR']
			},
			{
				title: 'Внешний вид',
				url: ROUTE.dashboard.settings.appearance,
				roles: ['REGULAR']
			}
		]
	},
	{
		title: 'Статистика',
		url: ROUTE.dashboard.admin.overview,
		icon: BarChart3,
		isActive: false,
		roles: ['ADMIN', 'SUPER_ADMIN']
	},
	{
		title: 'Управление магазином',
		icon: SquareChartGantt,
		isActive: false,
		roles: ['ADMIN', 'SUPER_ADMIN'],
		items: [
			{
				title: 'Продукты',
				url: ROUTE.dashboard.admin.products,
				roles: ['ADMIN', 'SUPER_ADMIN']
			},
			{
				title: 'Категории',
				url: ROUTE.dashboard.admin.categories,
				roles: ['ADMIN', 'SUPER_ADMIN']
			},
			{
				title: 'Ингредиенты',
				url: ROUTE.dashboard.admin.ingredients,
				roles: ['ADMIN', 'SUPER_ADMIN']
			}
		]
	},
	// {
	// 	title: 'Аккаунты',
	// 	url: ROUTE.dashboard.admin.accounts,
	// 	icon: User,
	// 	isActive: true,
	// 	roles: ['ADMIN', 'SUPER_ADMIN']
	// },
	// {
	// 	title: 'Заказы',
	// 	url: ROUTE.dashboard.admin.orders,
	// 	icon: User,
	// 	isActive: true,
	// 	roles: ['ADMIN', 'SUPER_ADMIN']
	// },
	{
		title: 'Чаты',
		url: ROUTE.dashboard.admin.support,
		icon: MessageSquare,
		isActive: true,
		roles: ['SUPPORT']
	}
]
