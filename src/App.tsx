import { useEffect, useState } from 'react'
import { Container } from './components/Container'
import { EmployeeProps, EmployeeTable } from './components/EmployeeTable'
import { Header } from './components/Header'
import { Search } from './components/Search'

function App() {
	const [data, setData] = useState<EmployeeProps[] | []>([])

	useEffect(() => {
		fetch('http://localhost:3000/employees')
			.then(res => res.json())
			.then(res => setData(res))
	}, [])

	return (
		<>
			<Header />
			<main className='py-6 lg:py-8'>
				<Container>
					<div className='mb-5 justify-between items-center sm:flex sm:mb-8'>
						<h1 className='font-medium text-xl text-black mb-6 leading-6 sm:mb-0'>Funcionários</h1>
						<Search />
					</div>
					<EmployeeTable employees={data} />
				</Container>
			</main>
		</>
	)
}

export default App

