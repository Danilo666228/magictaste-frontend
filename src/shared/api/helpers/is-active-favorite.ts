import { Account, Product } from '@/shared/api/types'

export const isActiveFavorite = (profile: Account | undefined, product: Product) =>
	profile?.favorites.some(favorite => favorite.product.id === product.id)
