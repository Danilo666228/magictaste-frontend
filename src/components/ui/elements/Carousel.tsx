'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ComponentProps, ReactNode, createContext, useContext, useState } from 'react'
import React from 'react'

import { Button, Typography } from '../common'

import { cn } from '@/lib/utils'

interface CarouselContextProps {
	item: number
	totalItems: number
	canScrollNext: boolean
	canScrollPrev: boolean
	next: () => void
	previous: () => void
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = useContext(CarouselContext)

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />')
	}

	return context
}

const Carousel = ({ className, children }: ComponentProps<'div'>) => {
	const itemsArray = React.Children.toArray(children) as ReactNode[]
	const [item, setItem] = useState<number>(0)

	const totalItems = itemsArray.length

	const canScrollNext = item < totalItems - 2
	const canScrollPrev = item > 0

	const next = () => {
		if (canScrollNext) {
			setItem(prevItem => prevItem + 1)
		}
	}

	const previous = () => {
		if (canScrollPrev) {
			setItem(prevItem => prevItem - 1)
		}
	}
	return (
		<CarouselContext.Provider value={{ item, canScrollNext, canScrollPrev, next, previous, totalItems }}>
			<div className={cn('relative', className)}>{children}</div>
		</CarouselContext.Provider>
	)
}

const CarouselContent = ({ children }: ComponentProps<'div'>) => {
	const { item } = useCarousel()
	return (
		<div className='overflow-hidden rounded-lg'>
			<div className='flex' style={{ transform: `translateX(-${item * 100}%)` }}>
				{children}
			</div>
		</div>
	)
}
const CarouselItem = ({ children }: ComponentProps<'div'>) => {
	return <div className={cn('min-w-0 shrink-0 grow-0 basis-full transition-opacity duration-300 ease-in-out')}>{children}</div>
}

const CarouselNext = ({ className }: ComponentProps<typeof Button>) => {
	const { next, canScrollNext } = useCarousel()
	return (
		<Button onClick={next} disabled={!canScrollNext} className={cn('absolute right-0 top-[50%]', className)}>
			<ArrowRight />
		</Button>
	)
}
const CarouselPrevios = ({ className }: ComponentProps<typeof Button>) => {
	const { previous, canScrollPrev } = useCarousel()
	return (
		<Button onClick={previous} disabled={!canScrollPrev} className={cn('absolute left-0 top-[50%]', className)}>
			<ArrowLeft />
		</Button>
	)
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevios }
