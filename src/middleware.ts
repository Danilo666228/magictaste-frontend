import { type NextRequest, NextResponse } from 'next/server'

import { ROUTE } from './config/route.config'
import { API_URL } from './lib/constants/url.constants'
import { Account, RoleName } from './shared/api/types'

export default async function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request

	let userRoles: RoleName[] = []

	const token = cookies.get('auth')?.value

	try {
		if (token) {
			const response = await fetch(API_URL + '/profile', { headers: { Cookie: `auth=${token}` } })

			const data = (await response.json()) as Account

			userRoles = data.roles.map(role => role.name)
		}
	} catch (error) {
		console.log(error)
	}

	const isAdminRole = userRoles.includes('ADMIN') || userRoles.includes('SUPER_ADMIN')
	const isManager = userRoles.includes('MANAGER')

	const isSupportRoute = nextUrl.pathname.startsWith('/dashboard/support')
	const isAdminRoute = nextUrl.pathname.startsWith('/dashboard/admin')
	const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
	const isSignInRoute = nextUrl.pathname.startsWith('/auth')

	if (isDashboardRoute && !token) {
		return NextResponse.redirect(new URL(ROUTE.auth.signIn, request.url))
	}

	if (!isAdminRole && !isManager && nextUrl.pathname.endsWith('/overview')) {
		return NextResponse.redirect(new URL(ROUTE.notfound, request.url))
	}

	if (isSignInRoute && token) {
		return NextResponse.redirect(new URL(ROUTE.dashboard.profile, request.url))
	}

	if (isSupportRoute && !userRoles.some(role => role === 'SUPPORT')) {
		return NextResponse.redirect(new URL(ROUTE.dashboard.profile, request.url))
	}

	if (isAdminRoute && !isAdminRole && !isManager) {
		return NextResponse.redirect(new URL(ROUTE.dashboard.profile, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*', '/dashboard/admin:path*']
}
