import { RoleName } from '@/shared/api/types'

export function checkAccessRoles(userRoles: RoleName[], allowedRoles: RoleName[]): boolean {
	if (!userRoles) return false

	if (!userRoles.length || !allowedRoles.length) {
		return false
	}

	return userRoles.some(role => allowedRoles.includes(RoleName[role]))
}
