import { useEffect, useState } from 'react'

/**
 * Хук для отслеживания гидрации zustand persist store.
 * @param persistStore - объект persist из вашего zustand store (например, useOrderStore.persist)
 * @returns hydrated: boolean
 */
export function useZustandHydration(persistStore: any) {
	const [hydrated, setHydrated] = useState(() => {
		return persistStore?.hasHydrated ? persistStore.hasHydrated() : false
	})

	useEffect(() => {
		if (!persistStore?.onFinishHydration) return
		const unsub = persistStore.onFinishHydration(() => setHydrated(true))
		if (persistStore.hasHydrated && persistStore.hasHydrated()) setHydrated(true)
		return unsub
	}, [persistStore])

	return hydrated
}
