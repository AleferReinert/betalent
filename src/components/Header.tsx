import Logo from '../assets/icons/logo.svg?react'
import { Container } from './Container'

export function Header() {
	return (
		<header className='bg-white py-6 shadow-md'>
			<Container>
				<a href='/' title='Início'>
					<Logo width={71} height={14} />
				</a>
			</Container>
		</header>
	)
}
