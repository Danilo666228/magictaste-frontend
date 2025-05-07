export interface Session {
	cookie: Cookie
	createdAt: string
	accountId: string
	metadata: Metadata
	id: string
}

export interface Cookie {
	originalMaxAge: number
	expires: string
	secure: boolean
	httpOnly: boolean
	domain: string
	path: string
	sameSite: string
}

export interface Metadata {
	location: Location
	device: Device
	ip: string
}

export interface Location {
	country: string
	city: string
	latidute: number
	longitude: number
}

export interface Device {
	browser: string
	os?: string
	type?: string
}
