import { Cart } from './cart'
import { DeliveryAddress } from './delivery-address'
import { Favorite } from './favorite'
import { Loyalty } from './loyalty'
import { Order } from './order'
import { ProductComment } from './product-comment'
import { Role } from './role'

export interface Account {
	id: string
	email: string
	userName: string
	picture: string | null
	createdAt: Date
	updatedAt: Date

	accountSettings: AccountSettings
	cart: Cart[]
	reviews: ProductComment[]
	deliveryAdresses: DeliveryAddress[]
	notifications: Notification[]
	favorites: Favorite[]
	roles: Role[]
	orders: Order[]
	accountLoyalty : Loyalty
	// receivedMessages: Message[]
	// sentMessages: Message[]
}

export interface AccountSettings {
	id: string
	accountId: string
	telegramId?: string
	isTwoFactorEmailEnabled: boolean
	isTwoFactorTotpEnabled: boolean
	totpSecret: string | null
	isVerifiedEmail: boolean
	siteNotification: boolean
	telegramNotification: boolean
}
