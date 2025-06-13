import { Loader2 } from 'lucide-react'

export default function Loading() {
	return (
		<div className='flex h-[calc(100vh-200px)] items-center justify-center'>
			<div className='flex flex-col items-center space-y-8'>
				<div className='flex space-x-2'>
					{[0, 1, 2].map(index => (
						<div key={index} className={`size-10 animate-bounce rounded-full`} />
					))}
				</div>

				<div className='animate-pulse text-center'>
					<h2 className='mb-2 text-2xl font-bold'>Загружаем страницу...</h2>
					<p className='text-sm opacity-80'>Пожалуйста, подождите</p>
				</div>

				<div className='relative'>
					<Loader2 className='animate-spin text-primary' size={56} />
				</div>
			</div>
		</div>
	)
}
