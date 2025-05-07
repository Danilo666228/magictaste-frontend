import { ChangeAccentColor } from './ChangeAccentColor'
import { ChangeAccentRadius } from './ChangeAccentRadius'
import { ChangeFontSettings } from './ChangeFontSettings'
import { ChangeThemeForm } from './ChangeThemeForm'

export function AppearanceSettings() {
	return (
		<div className='space-y-6'>
			<ChangeThemeForm />
			<ChangeAccentColor />
			<ChangeAccentRadius />
			<ChangeFontSettings />
		</div>
	)
}
