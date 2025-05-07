import { api } from '@/shared/api/instance'
import { PaymentDetails } from '@/shared/api/types/payment'

export type GetPaymentLinkRequestConfig = RequestConfig

export const getPaymentLink = (requestConfig?: GetPaymentLinkRequestConfig) => api.get<PaymentDetails>('/orders/payment-link', requestConfig?.config)