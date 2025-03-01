import { ChangeEvent } from 'react'
import searchIcon from '../assets/icons/search.svg'
import { EmployeeProps } from './EmployeeTable'

interface SearchProps {
	query: string
	data: [] | EmployeeProps[]
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setFilteredDataByQuery: React.Dispatch<React.SetStateAction<[] | EmployeeProps[]>>
}

export function Search({ query, data, setQuery, setFilteredDataByQuery }: SearchProps) {
	// Filter by name, job and phone
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const isPhoneSearch = /^[\d+]/.test(value)
		const sanitizedValue = isPhoneSearch ? value.replace(/[\s\-()]/g, '') : value
		const filteredData = data.filter(
			employee =>
				employee.name.toLowerCase().includes(sanitizedValue.toLowerCase()) ||
				employee.job.toLowerCase().includes(sanitizedValue.toLowerCase()) ||
				employee.phone.replace(/[\s\-()]/g, '').includes(sanitizedValue)
		)
		setQuery(value)
		setFilteredDataByQuery(filteredData)
	}

	return (
		<div className='bg-white border border-gray-10 rounded px-4 h-12 grid grid-cols-[1fr_auto] sm:max-w-72'>
			<input
				type='text'
				placeholder='Pesquisar'
				value={query}
				className='text-gray-20 placeholder-gray-20 focus:outline-none translate-y-[1px]'
				onChange={e => handleSearch(e)}
			/>
			<button title='Pesquisar' className='cursor-pointer'>
				<img src={searchIcon} width={18} height={18} />
			</button>
		</div>
	)
}
