import { ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
}
export function Container({ children }: ContainerProps) {
	return <div className='px-5 mx-auto max-w-[1000px]'>{children}</div>
}
