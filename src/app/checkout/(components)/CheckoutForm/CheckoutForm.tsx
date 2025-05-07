'use client'

import { CreditCard, Loader, MapPin, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button, Container, Form } from '@/components/ui/common'

import { OrderStep, useOrderStore } from '@/store/useOrderStore'

import { useUnmount } from '@/shared/hooks'

import { useCheckoutForm } from '../../(hooks)/useCheckoutForm'

import { AboutUserField } from './AboutUserField'
import { DeliveryField } from './DeliveryField'
import { PaymentField } from './PaymentField'
import { ROUTE } from '@/config/route.config'

const steps = [
	{ id: 'user', title: 'Личные данные', icon: User },
	{ id: 'delivery', title: 'Доставка', icon: MapPin },
	{ id: 'payment', title: 'Оплата', icon: CreditCard }
]

export function CheckoutForm() {
	const { form, onSubmit, isPending, formPersist } = useCheckoutForm()
	const router = useRouter()
	const { setCurrentStep, currentStep, nextStep, items, resetOrder } = useOrderStore()

	useUnmount(() => {
		formPersist.clear()
		resetOrder()
	})

	const handleBack = () => {
		const steps: OrderStep[] = ['user', 'delivery', 'payment']
		const currentIndex = steps.indexOf(currentStep)

		if (currentIndex > 0) {
			setCurrentStep(steps[currentIndex - 1])
		} else {
			router.push(ROUTE.home)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (currentStep !== 'payment') {
			const isValid = await form.trigger(
				currentStep === 'user' ? ['firstName', 'lastName', 'email', 'phone'] : ['deliveryType', 'deliveryAddress']
			)

			if (isValid) {
				nextStep()
			}
			return
		}

		form.handleSubmit(onSubmit)(e)
	}

	return (
		<Container className='rounded-lg border p-6 shadow-sm'>
			<div className='mb-8'>
				<div className='flex justify-between'>
					{steps.map((step, index) => (
						<div key={step.id} className='flex flex-1 cursor-pointer flex-col items-center'>
							<div
								className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
									currentStep === step.id ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500'
								}`}>
								<step.icon size={20} />
							</div>
							<span className={`mt-2 text-sm ${currentStep === step.id ? 'font-medium text-primary' : 'text-gray-500'}`}>
								{step.title}
							</span>
							{index < steps.length - 1 && <div className='absolute left-0 top-5 -z-10 h-[2px] w-full'></div>}
						</div>
					))}
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit} className='flex w-full flex-col gap-5'>
					{currentStep === 'user' && <AboutUserField form={form} />}
					{currentStep === 'delivery' && <DeliveryField form={form} />}
					{currentStep === 'payment' && <PaymentField form={form} />}

					<Container className='mt-6 flex justify-between'>
						{currentStep === 'user' ? (
							<Button variant={'outline'} type='button' onClick={() => router.push(ROUTE.home)}>
								Вернуться на главную
							</Button>
						) : (
							<Button variant={'outline'} type='button' onClick={handleBack}>
								Назад
							</Button>
						)}

						<Button
							type='submit'
							disabled={isPending && currentStep === 'payment'}
							className={currentStep === 'payment' ? 'min-w-[180px]' : ''}>
							{isPending && currentStep === 'payment' ? (
								<>
									<Loader className='mr-2 animate-spin' />
									Оформление...
								</>
							) : currentStep === 'payment' ? (
								'Оформить заказ'
							) : (
								'Продолжить'
							)}
						</Button>
					</Container>
				</form>
			</Form>
		</Container>
	)
}
