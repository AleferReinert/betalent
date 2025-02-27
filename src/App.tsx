import { useEffect, useState } from 'react'
import { Container } from './components/Container'
import { EmployeeProps, EmployeeTable } from './components/EmployeeTable'
import { Header } from './components/Header'
import { Search } from './components/Search'

function App() {
	const [data, setData] = useState<EmployeeProps[] | []>([])
	const [query, setQuery] = useState('')
	const [filteredDataByQuery, setFilteredDataByQuery] = useState<EmployeeProps[] | []>(data)

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/employees`)
			.then(res => res.json())
			.then(res => {
				setData(res)
				setFilteredDataByQuery(res)
			})
	}, [])

	return (
		<>
			<Header />
			<main className='py-6 lg:py-8'>
				<Container>
					<div className='mb-5 justify-between items-center sm:flex sm:mb-8'>
						<h1 className='font-medium text-xl text-black mb-6 leading-6 sm:mb-0'>Funcionários</h1>
						<Search query={query} setQuery={setQuery} data={data} setFilteredDataByQuery={setFilteredDataByQuery} />
					</div>
					<EmployeeTable employees={filteredDataByQuery} />
				</Container>
			</main>
		</>
	)
}

export default App

