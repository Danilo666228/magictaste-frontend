import { RoleName } from '../types'

// export const getRoleName = (role: RoleName) => {
// 	switch (role) {
// 		case 'REGULAR':
// 			return 'Пользователь'
// 		case 'ADMIN':
// 			return 'Администратор'
// 		case 'MANAGER':
// 			return 'Менеджер'
// 		case 'SUPER_ADMIN':
// 			return 'Супер администратор'
// 		case 'SUPPORT':
// 			return 'Служба поддержки'
// 		default:
// 			return undefined
// 	}
// }

export const getRoleName = (role : RoleName) : string => {
	const roles = {
		REGULAR : 'Пользователь',
		ADMIN : 'Администратор',
		SUPER_ADMIN : 'Главный администратор',
		SUPPORT : 'Служба поддержки',
		MANAGER : 'Менеджер'
	} as const

	if(role in roles) {
		return roles[role]
	}else {
		return 'Неизвестная роль'
	}
}