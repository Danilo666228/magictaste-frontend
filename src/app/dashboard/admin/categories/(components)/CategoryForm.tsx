import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui/common'
import { useModal } from '@/components/ui/elements/modal/FormModal/FormModalContext'

import { CreateCategorySchema, createCategorySchema } from '@/schemas/category/createCategory'

import { useCreateCategoryMutation } from '@/shared/api/hooks/category/useCreateCategoryMutation'
import { useGetCategoryQuery } from '@/shared/api/hooks/category/useGetCategoryQuery'
import { useUpdateCategoryMutation } from '@/shared/api/hooks/category/useUpdateCategoryMutation'
import { Category } from '@/shared/api/types'

interface CategoryFormProps {
	mode: 'create' | 'edit'
	initialData?: Category
}

export function CategoryForm({ mode, initialData }: CategoryFormProps) {
	const { closeModal } = useModal()
	const { refetch } = useGetCategoryQuery()
	const createCategoryMutation = useCreateCategoryMutation({
		options: {
			onSuccess: () => {
				refetch()
				closeModal()
			}
		}
	})

	const updateCategoryMutation = useUpdateCategoryMutation({
		options: {
			onSuccess: () => {
				closeModal()
				refetch()
			}
		}
	})
	const form = useForm<CreateCategorySchema>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			title: initialData?.title || ''
		}
	})

	const handleSubmit = (data: CreateCategorySchema) => {
		if (mode === 'create') {
			createCategoryMutation.mutateAsync({ params: { title: data.title } })
		} else {
			updateCategoryMutation.mutateAsync({
				params: { title: data.title },
				config: { params: { categoryId: initialData?.id } }
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
							<FormLabel>Название категории</FormLabel>
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
