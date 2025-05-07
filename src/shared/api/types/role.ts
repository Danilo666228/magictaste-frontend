export const RoleName = {
	REGULAR : "REGULAR",
	ADMIN: 'ADMIN',
	MANAGER: 'MANAGER',
	SUPER_ADMIN : 'SUPER_ADMIN',
	SUPPORT : 'SUPPORT'
} as const

export type RoleName = (typeof RoleName)[keyof typeof RoleName]

export interface Role {
	id: number
	name: RoleName
}
