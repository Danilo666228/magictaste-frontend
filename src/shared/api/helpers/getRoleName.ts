import { RoleName } from '../types'

export const getRoleName = (role: RoleName): string => {
	const roles = {
		REGULAR: 'Пользователь',
		ADMIN: 'Администратор',
		SUPER_ADMIN: 'Главный администратор',
		SUPPORT: 'Служба поддержки',
		MANAGER: 'Менеджер'
	} as const

	if (role in roles) {
		return roles[role]
	} else {
		return 'Неизвестная роль'
	}
}
