import { ChangeEvent } from 'react'
import SearchIcon from '../assets/icons/search.svg?react'
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
		<div className='group bg-white border border-gray-10 rounded pl-4 h-12 grid grid-cols-[1fr_auto] sm:w-72 transition focus-within:border-gray-20'>
			<input
				type='text'
				placeholder='Pesquisar'
				value={query}
				className='text-gray-20 placeholder-gray-20 focus:outline-none translate-y-[1px]'
				onChange={e => handleSearch(e)}
			/>
			<button title='Pesquisar' className='cursor-pointer px-4'>
				<SearchIcon className='transition fill-gray-10 group-focus-within:fill-gray-20' />
			</button>
		</div>
	)
}
