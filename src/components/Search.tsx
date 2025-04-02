import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import SearchIcon from '../assets/icons/search.svg?react'
import { filterEmployees } from '../utils/filterEmployees'
import { EmployeeProps } from './EmployeeTable'

interface SearchProps {
	query: string
	data: [] | EmployeeProps[]
	setQuery: React.Dispatch<React.SetStateAction<string>>
	setFilteredDataByQuery: React.Dispatch<React.SetStateAction<[] | EmployeeProps[]>>
}

export function Search({ query, data, setQuery, setFilteredDataByQuery }: SearchProps) {
	const [localQuery, setLocalQuery] = useState(query)
	const [debouncedQuery] = useDebounceValue(localQuery, 500)

	useEffect(() => {
		const filtered = filterEmployees(data, debouncedQuery)
		setQuery(debouncedQuery)
		setFilteredDataByQuery(filtered)
	}, [debouncedQuery, data, setQuery, setFilteredDataByQuery])

	return (
		<div className='group bg-white border border-gray-10 rounded pl-4 h-12 grid grid-cols-[1fr_auto] sm:w-72 transition focus-within:border-gray-20'>
			<input
				type='text'
				placeholder='Pesquisar'
				value={localQuery}
				className='text-gray-30 placeholder-gray-30 focus:outline-none translate-y-[1px]'
				onChange={e => setLocalQuery(e.target.value)}
			/>
			<button title='Pesquisar' className='cursor-pointer px-4'>
				<SearchIcon className='transition fill-gray-10 group-focus-within:fill-gray-20' />
			</button>
		</div>
	)
}
