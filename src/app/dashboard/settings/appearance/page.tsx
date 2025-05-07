import { Heading } from "@/components/ui/common";
import { AppearanceSettings } from "./(components)/AppearanceSettings";

export default function AppearanceSettingsPage() {
	return (
		<div>
			<Heading title='Внешний вид' description='Изменение внешнего вида' />
			<AppearanceSettings />
		</div>
	)
}
