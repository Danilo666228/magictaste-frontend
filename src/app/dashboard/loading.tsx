import { Loader2 } from 'lucide-react'

export default function Loading() {
	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='flex flex-col items-center space-y-8'>
				<div className='flex space-x-2'>
					{[0, 1, 2].map(index => (
						<div
							key={index}
							className={`size-10 animate-bounce rounded-full`}
							style={{
								animationDelay: `${index * 200}ms`,
								animationDuration: '1.5s'
							}}
						/>
					))}
				</div>

				<div className='animate-pulse text-center'>
					<h2 className='mb-2 text-2xl font-bold text-gray-800'>Загружаем страницу...</h2>
					<p className='text-sm text-gray-600 opacity-80'>Пожалуйста, подождите</p>
				</div>

				<div className='relative'>
					<Loader2 className='animate-spin text-primary' size={56} />
				</div>
			</div>
		</div>
	)
}
