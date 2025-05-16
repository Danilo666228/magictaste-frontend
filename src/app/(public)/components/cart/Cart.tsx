import { MoveRight, Trash2 } from 'lucide-react'
import { useFormatter } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { Button, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Typography } from '@/components/ui/common'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { useOrderStore } from '@/store/useOrderStore'

import { CartItem } from './CartItem'
import { ROUTE } from '@/config/route.config'

interface CartProps {
	children: ReactNode
}

export function Cart({ children }: CartProps) {
	const formatted = useFormatter()
	const router = useRouter()
	const { profile } = useProfile()
	const { setItems, setDiscount } = useOrderStore()
	const { cart, handleClearCart } = useCart()

	const isEmpty = !cart?.data.items.length

	const totalPrice = cart?.data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
	const bonusPercentage = profile?.data.accountLoyalty.loyaltyLevel.bonusPercentage ?? 0
	const discount = totalPrice ? totalPrice * (bonusPercentage / 100) : 0
	const totalWithDiscount = totalPrice ? totalPrice - discount : 0

	const handleOrderItems = () => {
		if (!cart?.data.items) return
		setDiscount(discount)

		setItems(
			cart.data.items.map(item => ({
				id: item.product.id,
				quantity: item.quantity,
				price: item.product.price,
				productTitle: item.product.title,
				productImageUrl: item.product.imageUrl,
				productDescription: item.product.description,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
				product: item.product
			}))
		)

		router.push(ROUTE.checkout)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent side='right' size={'xl'} className='grid grid-rows-[auto_1fr_auto]'>
				<SheetHeader className='mt-5 flex-row items-center justify-between max-sm:flex-col'>
					<div>
						<SheetTitle className='text-2xl max-sm:text-xl'>Моя Корзина</SheetTitle>
						<SheetDescription>{isEmpty ? 'Корзина пуста' : `${cart.data.totalItems} товаров в корзине`}</SheetDescription>
					</div>

					{!isEmpty && (
						<Button onClick={handleClearCart}>
							Очистить корзину
							<Trash2 />
						</Button>
					)}
				</SheetHeader>

				<ul className='overflow-y-auto px-4'>
					{isEmpty ? (
						<Typography tag='h1' className='mt-20 text-center opacity-70'>
							Добавьте товары в корзину
						</Typography>
					) : (
						<div className='space-y-4'>
							{cart.data.items.map(item => (
								<li
									key={item.product.id}
									className='relative rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md dark:bg-card/80 dark:hover:bg-card/95'>
									<CartItem item={item} />
								</li>
							))}
						</div>
					)}
				</ul>

				<SheetFooter>
					<div className='w-full space-y-4'>
						<div className='flex items-center justify-between font-bold'>
							<Typography>Сумма заказа</Typography>
							<Typography>
								{formatted.number(totalPrice ?? 0, {
									style: 'currency',
									currency: 'RUB'
								})}
							</Typography>
						</div>
						{bonusPercentage > 0 && (
							<div className='flex items-center justify-between text-green-600'>
								<Typography>Скидка ({bonusPercentage}%)</Typography>
								<Typography>
									-
									{formatted.number(discount, {
										style: 'currency',
										currency: 'RUB'
									})}
								</Typography>
							</div>
						)}
						<div className='flex items-center justify-between font-bold'>
							<Typography>Итого</Typography>
							<Typography>
								{formatted.number(totalWithDiscount, {
									style: 'currency',
									currency: 'RUB'
								})}
							</Typography>
						</div>

						<Button onClick={handleOrderItems} disabled={isEmpty} className='active:scale-98 group w-full transition-transform'>
							<Typography>Оформить заказ</Typography>
							<MoveRight className='ml-2 transition-transform duration-500 group-hover:translate-x-2' />
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
