import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import SearchIcon from '../assets/icons/search.svg?react'

interface SearchProps {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
}

export function Search({ query, setQuery }: SearchProps) {
	const [localQuery, setLocalQuery] = useState(query)
	const [debouncedQuery] = useDebounceValue(localQuery, 500)

	useEffect(() => {
		setQuery(debouncedQuery)
	}, [debouncedQuery, setQuery])

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
