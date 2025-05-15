'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Textarea
} from '@/components/ui/common'
import { TagsSelector } from '@/components/ui/common/TagsSelector'
import { useModal } from '@/components/ui/elements/modal/Default/ModalContext'

import { CreateProductSchema, createProductSchema } from '@/schemas/product/createProduct'

import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'
import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'
import { useCreateProductMutation } from '@/shared/api/hooks/products/useCreateProductMutation'

import { useUpdateProductMutation } from '@/shared/api/hooks/products/useUpdateProductMutation'
import { Product } from '@/shared/api/types'

interface ProductFormProps {
	mode: 'create' | 'edit'
	initialData?: Product
}

export function ProductForm({ mode, initialData }: ProductFormProps) {
	const queryClient = useQueryClient()
	const { closeModal } = useModal()

	const { data: categories } = useGetCategoryQuery()
	const { data: ingredients } = useGetIngredientsQuery()
	const { mutateAsync: createProduct } = useCreateProductMutation({
		options: {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['getProducts'] })
				closeModal()
			}
		}
	})
	const { mutateAsync: updateProduct } = useUpdateProductMutation({
		options: {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['getProducts'] })
				closeModal()
			}
		}
	})

	const form = useForm<CreateProductSchema>({
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			title: initialData?.title || '',
			description: initialData?.description || '',
			price: initialData?.price?.toString() || '',
			weight: initialData?.weight?.toString() || '',
			categoryId: initialData?.category?.id || '',
			onSale: initialData?.onSale || false,
			ingredients: initialData?.ingredients.map(ingredient => ingredient.id) || []
		}
	})

	const handleSubmit = (data: CreateProductSchema) => {
		const params = {
			title: data.title,
			price: Number(data.price),
			categoryId: data.categoryId,
			ingredients: data.ingredients.map(ingredient => ({ ingredientId: ingredient })),
			weight: Number(data.weight),
			description: data.description || '',
			onSale: data.onSale ?? true
		}

		if (mode === 'create') {
			createProduct({ params })
		} else {
			updateProduct({
				params,
				config: { params: { productId: initialData?.id } }
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название продукта</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ingredients"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ингредиенты</FormLabel>
							<FormControl>
								<TagsSelector
									modal
									tags={
										ingredients?.data.ingredients?.map(ingredient => ({
											id: ingredient.id,
											label: ingredient.title
										})) || []
									}
									selectedTags={
										field.value.map(id => ({
											id,
											label: ingredients?.data?.ingredients.find(ingredient => ingredient.id === id)?.title || ''
										})) || []
									}
									onChange={tags => field.onChange(tags.map(tag => tag.id))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цена</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="weight"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Вес (г)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="categoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Категория</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Выберите категорию" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories?.data.categories.map(category => (
										<SelectItem key={category.id} value={category.id}>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="onSale"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-4">
							<FormLabel className="text-base">В продаже</FormLabel>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{mode === 'create' ? 'Создать' : 'Обновить'}
				</Button>
			</form>
		</Form>
	)
}
