import { RoundedRadius } from '../ConfigContext'

export const radiusValues: Record<RoundedRadius, number> = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	'2xl': 20,
	'3xl': 24,
	full: 26
}

export const getRadiusValue = (radius: RoundedRadius): number => {
	return radiusValues[radius] || 8
}

export const getRadiusName = (value: number): RoundedRadius => {
	const entries = Object.entries(radiusValues) as [RoundedRadius, number][]
	const closest = entries.reduce((prev, curr) => {
		return Math.abs(curr[1] - value) < Math.abs(prev[1] - value) ? curr : prev
	})
	return closest[0]
}
