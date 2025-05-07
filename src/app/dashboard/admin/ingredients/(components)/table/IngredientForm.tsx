import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui/common'


import { CreateIngredientSchema, createIngredientSchema } from '@/schemas/ingredient/createIngredient'

import { useCreateIngredientMutation } from '@/shared/api/hooks/ingredient/useCreateIngredientMutation'
import { useGetIngredientsQuery } from '@/shared/api/hooks/ingredient/useGetIngredientsQuery'
import { useUpdateIngredientMutation } from '@/shared/api/hooks/ingredient/useUpdateIngredientMutation'
import { Ingredient } from '@/shared/api/types'
import { useModal } from '@/components/ui/elements/modal/FormModal/FormModalContext'

interface IngredientFormProps {
	mode: 'create' | 'edit'
	initialData?: Ingredient
}

export function IngredientForm({ mode, initialData }: IngredientFormProps) {
	const { closeModal } = useModal()
	const { refetch } = useGetIngredientsQuery()
	const createIngredientMutation = useCreateIngredientMutation({
		options: {
			onSuccess: () => {
				refetch()
				closeModal()
			}
		}
	})
	const updateIngredientMutation = useUpdateIngredientMutation({
		options: {
			onSuccess: () => {
				refetch()
				closeModal()
			}
		}
	})

	const form = useForm<CreateIngredientSchema>({
		resolver: zodResolver(createIngredientSchema),
		defaultValues: initialData
	})

	const handleSubmit = (data: CreateIngredientSchema) => {
		if (mode === 'create') {
			createIngredientMutation.mutate({ params: { title: data.title } })
		} else {
			updateIngredientMutation.mutate({
				params: {
					title: data.title
				},
				config: { params: { ingredientId: initialData?.id } }
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название ингредиента</FormLabel>
							<FormControl>
								<Input type='text' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full'>
					{mode === 'create' ? 'Создать' : 'Обновить'}
				</Button>
			</form>
		</Form>
	)
}
