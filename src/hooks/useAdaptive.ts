import React from 'react'

const MOBILE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024
const TABLET_BREAKPOINT = 768

export function useAdaptive() {
	const isBrowser = typeof window !== 'undefined'

	const [isMobile, setIsMobile] = React.useState(false)
	const [isDesktop, setIsDesktop] = React.useState(true)
	const [isTablet, setIsTablet] = React.useState(false)

	React.useEffect(() => {
		if (!isBrowser) return

		const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
		const desktopQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
		const tabletQuery = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`)

		const onChange = () => {
			setIsMobile(mobileQuery.matches)
			setIsDesktop(desktopQuery.matches)
			setIsTablet(tabletQuery.matches)
		}

		onChange()

		mobileQuery.addEventListener('change', onChange)
		desktopQuery.addEventListener('change', onChange)
		tabletQuery.addEventListener('change', onChange)

		return () => {
			mobileQuery.removeEventListener('change', onChange)
			desktopQuery.removeEventListener('change', onChange)
			tabletQuery.removeEventListener('change', onChange)
		}
	}, [isBrowser])

	return { isMobile, isDesktop, isTablet }
}
