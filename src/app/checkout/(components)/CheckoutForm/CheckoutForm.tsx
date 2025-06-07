'use client'

import { CheckCircle, Circle, CreditCard, Loader, MapPin, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button, Form } from '@/components/ui/common'

import { OrderStep, useOrderStore } from '@/store/useOrderStore'

import { cn, useUnmount } from '@/shared/hooks'
import { ROUTE } from '@/shared/utils/constants/route'

import { useCheckoutForm } from '../../(hooks)/useCheckoutForm'

import { AboutUserField } from './AboutUserField'
import { DeliveryField } from './DeliveryField'
import { PaymentField } from './PaymentField'

const steps = [
	{ id: 'user', title: 'Личные данные', icon: User, description: 'Ваша информация' },
	{ id: 'delivery', title: 'Доставка', icon: MapPin, description: 'Способ и адрес' },
	{ id: 'payment', title: 'Оплата', icon: CreditCard, description: 'Способ оплаты' }
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

	const getStepStatus = (stepId: string) => {
		const currentIndex = steps.findIndex(step => step.id === currentStep)
		const stepIndex = steps.findIndex(step => step.id === stepId)

		if (stepIndex < currentIndex) return 'completed'
		if (stepIndex === currentIndex) return 'current'
		return 'upcoming'
	}

	return (
		<div className='space-y-8'>
			<div className='relative'>
				<div className='flex justify-between'>
					{steps.map((step, index) => {
						const status = getStepStatus(step.id)

						return (
							<div key={step.id} className='relative flex flex-1 flex-col items-center'>
								{index < steps.length - 1 && (
									<div className='absolute left-1/2 top-6 z-0 h-0.5 w-full'>
										<div
											className={`h-full transition-colors duration-300 ${
												status === 'completed' ? 'bg-primary' : 'bg-border'
											}`}></div>
									</div>
								)}

								<div
									className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
										status === 'completed'
											? 'border-primary bg-primary text-primary-foreground shadow-lg'
											: status === 'current'
												? 'scale-110 border-primary bg-background text-primary shadow-md'
												: 'border-border bg-background text-muted-foreground'
									}`}>
									{status === 'completed' ? (
										<CheckCircle size={20} />
									) : status === 'current' ? (
										<step.icon size={20} />
									) : (
										<Circle size={20} />
									)}
								</div>

								<div className='mt-3 text-center'>
									<span
										className={`text-sm font-medium transition-colors ${
											status === 'current' ? 'text-primary' : 'text-muted-foreground'
										}`}>
										{step.title}
									</span>
									<div
										className={`text-xs transition-colors ${
											status === 'current' ? 'text-primary/70' : 'text-muted-foreground/70'
										}`}>
										{step.description}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>

			<div className='rounded-2xl border-0 bg-background/60 p-8 shadow-xl backdrop-blur-sm'>
				<Form {...form}>
					<form onSubmit={handleSubmit} className='space-y-8'>
						<div className='min-h-[400px]'>
							{currentStep === 'user' && <AboutUserField form={form} />}
							{currentStep === 'delivery' && <DeliveryField form={form} />}
							{currentStep === 'payment' && <PaymentField form={form} />}
						</div>

						<div className='flex items-center justify-between border-t border-border/50 pt-6'>
							{currentStep === 'user' ? (
								<Button variant={'outline'} type='button' onClick={() => router.push(ROUTE.home)} className='group'>
									← Вернуться на главную
								</Button>
							) : (
								<Button variant={'outline'} type='button' onClick={handleBack} className='group'>
									← Назад
								</Button>
							)}

							<Button
								type='submit'
								disabled={isPending && currentStep === 'payment'}
								className={cn(
									'group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25',
									currentStep === 'payment' ? 'min-w-[200px]' : ''
								)}>
								<span className='relative flex items-center'>
									{isPending && currentStep === 'payment' ? (
										<>
											<Loader className='mr-2 h-4 w-4 animate-spin' />
											Оформление...
										</>
									) : currentStep === 'payment' ? (
										<>
											<CreditCard className='mr-2 h-4 w-4' />
											Оформить заказ
										</>
									) : (
										<>
											Продолжить
											<span className='ml-2 transition-transform group-hover:translate-x-1'>→</span>
										</>
									)}
								</span>
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
