import { Container } from './Container'

export function Header() {
	return (
		<header className='bg-white py-6 shadow-md'>
			<Container>
				<a href='/' title='Início'>
					<img src='/logo.svg' alt='BeTalent' width={71} height={14} />
				</a>
			</Container>
		</header>
	)
}
