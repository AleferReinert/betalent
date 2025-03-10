import { useEffect, useState } from 'react'
import { Container } from './components/Container'
import { EmployeeProps, EmployeeTable } from './components/EmployeeTable'
import { Header } from './components/Header'
import { Search } from './components/Search'
import staticData from './data/staticData.json'

function App() {
	const [data, setData] = useState<EmployeeProps[] | []>([])
	const [query, setQuery] = useState('')
	const [filteredDataByQuery, setFilteredDataByQuery] = useState<EmployeeProps[] | []>(data)
	const [loading, setLoading] = useState(true)

	// Fetches data from API. If error occurs, loads static data.
	useEffect(() => {
		const controller = new AbortController()
		const timeout = setTimeout(() => controller.abort(), 5000)

		const fetchData = async () => {
			try {
				const endpoint = import.meta.env.VITE_API_URL + '/employees'
				const response = await fetch(endpoint, { signal: controller.signal })
				if (!response.ok) throw new Error('Erro ao obter dados da API')
				const result = await response.json()
				setData(result)
				setFilteredDataByQuery(result)
			} catch (error) {
				console.error(`Erro ao obter dados da API, carregando dados estáticos. \nErro: ${error}`)
				setData(staticData)
				setFilteredDataByQuery(staticData)
			} finally {
				clearTimeout(timeout)
				setLoading(false)
			}
		}

		fetchData()
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
					{loading ? (
						<div className='bg-gray-10 w-full rounded-t animate-pulse h-[484px]' title='Buscando dados'>
							<p className='p-4 text-gray-20'>Buscando dados...</p>
						</div>
					) : filteredDataByQuery.length === 0 ? (
						<p>Nenhum resultado encontrado para "{query}".</p>
					) : (
						<EmployeeTable employees={filteredDataByQuery} />
					)}
				</Container>
			</main>
		</>
	)
}

export default App

