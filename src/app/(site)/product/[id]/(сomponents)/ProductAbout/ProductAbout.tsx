import { Container, Heading, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/components/ui/common'

import { Product } from '@/shared/api/types'

import { ProductComments } from './product-comment/ProductComments'

interface ProductAboutProps {
	product: Product
}

export function ProductAbout({ product }: ProductAboutProps) {
	
	return (
		<Tabs defaultValue='review' >
			<TabsList defaultValue='review' className='flex w-fit gap-5'>
				<TabsTrigger value='review'>Отзывы</TabsTrigger>
				<TabsTrigger value='description'>Описание</TabsTrigger>
			</TabsList>
			<Container className='my-4 p-2'>
				<TabsContent value='review'>
					<ProductComments product={product} />
				</TabsContent>
				<TabsContent value='description'>
					<Heading title='Описание' description='Описание продукта' />
					<Typography>{product.description}</Typography>
				</TabsContent>
			</Container>
		</Tabs>
	)
}
