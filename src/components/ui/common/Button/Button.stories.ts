import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import '../../../../styles/globals.css'

import { Button } from './Button'

const meta = {
	title: 'Example/Button',
	component: Button,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {},
	args: { onClick: fn() }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Button',
	}
}

export const Secondary: Story = {
	args: {
		variant: 'secondary',
    children : 'Button'
	}
}


