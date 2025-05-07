
import { Heading } from "@/components/ui/common";
import { SessionList } from "./(components)/SessionList";

export default function SessionSettingsPage() {
	return (
		<>
			<Heading title='Сессии' description='Управление сессиями' />
			<SessionList />
		</>
	)
}
