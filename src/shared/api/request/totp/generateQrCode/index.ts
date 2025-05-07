import { api } from '@/shared/api/instance'

export type GenerateQrCodeRequestConfig = RequestConfig

export type GenerateQrCodeResponse = {
	qrCodeUrl: string
	secret: string
	remainingSeconds: number
}

export const generateQrCode = (requestConfig?: GenerateQrCodeRequestConfig) =>
	api.get<GenerateQrCodeResponse>('/totp/qr-code', requestConfig?.config)
