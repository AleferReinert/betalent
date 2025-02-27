import { ChangeEvent } from 'react'
import { EmployeeProps } from './EmployeeTable'

interface SearchProps {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	data: [] | EmployeeProps[]
	setFilteredDataByQuery: React.Dispatch<React.SetStateAction<[] | EmployeeProps[]>>
}
export function Search({ query, setQuery, data, setFilteredDataByQuery }: SearchProps) {
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
		<div className='bg-white border border-gray-10 rounded px-4 h-12 grid grid-cols-[1fr_auto] max-w-72 group group-focus-within:border-gray-20'>
			<input
				type='text'
				placeholder='Pesquisar'
				value={query}
				className='text-gray-20 placeholder-gray-20 focus:outline-none'
				onChange={e => handleSearch(e)}
			/>
			<button title='Pesquisar' className='cursor-pointer'>
				<svg
					className='fill-gray-10'
					width='18'
					height='18'
					viewBox='0 0 18 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z' />
				</svg>
			</button>
		</div>
	)
}
