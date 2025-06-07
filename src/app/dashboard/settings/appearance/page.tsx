import { AppearanceSettings } from './(components)/AppearanceSettings'
import { Heading } from '@/components/ui/common'

export default function AppearanceSettingsPage() {
	return (
		<div>
			<Heading title='Внешний вид' description='Изменение внешнего вида' />
			<AppearanceSettings />
		</div>
	)
}
