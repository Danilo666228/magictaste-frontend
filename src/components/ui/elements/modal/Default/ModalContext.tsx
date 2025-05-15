import { createContext, useContext } from 'react'

interface ModalContextValue {
	closeModal: () => void
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export function useModal() {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider13')
	}

	return context
}