import { ComponentProps } from 'react'

interface PhoneInputProps extends ComponentProps<'input'> {}

export const PhoneInput = ({ ...props }: PhoneInputProps) => {

	



	return <input type='tel'  {...props} />
}
