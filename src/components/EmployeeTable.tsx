import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import React, { useState } from 'react'
import ArrowDownIcon from '../assets/icons/arrowDown.svg?react'
import { formatPhoneNumber } from '../utils/fomatPhoneNumber'

export interface EmployeeProps {
	id: string
	name: string
	job: string
	admission_date: string
	phone: string
	image: string
}

interface EmployeeTableProps {
	employees: EmployeeProps[]
}

interface InfoDetailProps {
	title: string
	value: string
}
function InfoDetail({ title, value }: InfoDetailProps) {
	return (
		<p className='flex justify-between border-b border-dashed border-gray-10 leading-5'>
			<strong className='font-medium'>{title}</strong>
			<span>{value}</span>
		</p>
	)
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
	const [visibleDetails, setVisibleDetails] = useState<{ [key: string]: boolean }>({})
	const hiddenOnMobile = 'hidden sm:table-cell'
	const hiddenOnDesktop = 'sm:hidden'

	const toggleDetails = (id: string) => {
		setVisibleDetails(prev => ({
			...prev,
			[id]: !prev[id]
		}))
	}

	return employees.length ? (
		<div className='rounded-t overflow-hidden'>
			<table className='w-full text-white'>
				<thead className='uppercase bg-primary text-left'>
					<tr className='h-12 [&_th]:font-[500] [&_th]:pl-3 translate-y-[1px]'>
						<th className='w-[34px]'>Foto</th>
						<th>Nome</th>
						<th className={hiddenOnMobile}>Cargo</th>
						<th className={hiddenOnMobile}>Data de admissão</th>
						<th className={hiddenOnMobile}>Telefone</th>
						<th className={hiddenOnDesktop}>
							<div className='bg-white rounded-full size-2 mx-auto' title='Exibir detalhes'></div>
						</th>
					</tr>
				</thead>
				<tbody>
					{employees.map(employee => {
						const formattedAdmissionDate = format(parseISO(employee.admission_date), 'dd/MM/yyyy', { locale: ptBR })
						const formattedPhone = formatPhoneNumber(employee.phone)

						return (
							<React.Fragment key={employee.id}>
								<tr className='text-black border-t border-gray-00 h-12 [&_td]:pl-3 bg-white shadow-sm translate-y-[1px]'>
									<td className='w-[34px]'>
										<img src={employee.image} width={34} height={34} alt='Foto de perfil' className='rounded-full' />
									</td>
									<td>{employee.name}</td>
									<td className={hiddenOnMobile}>{employee.job}</td>
									<td className={hiddenOnMobile}>{formattedAdmissionDate}</td>
									<td className={hiddenOnMobile}>{formattedPhone}</td>
									<td className={hiddenOnDesktop}>
										<button
											className={`${visibleDetails[employee.id] ? 'rotate-180' : ''} block mx-auto cursor-pointer`}
											title='Exibir detalhes'
											onClick={() => toggleDetails(employee.id)}
										>
											<ArrowDownIcon width={20} height={11} />
										</button>
									</td>
								</tr>
								<tr className='translate-y-[-1px]'>
									<td colSpan={6}>
										<div
											className={`${
												visibleDetails[employee.id] ? 'max-h-40' : 'max-h-0'
											} transition-all overflow-hidden`}
										>
											<div className='space-y-3 px-3 py-7 bg-white text-black'>
												<InfoDetail title='Cargo' value={employee.job} />
												<InfoDetail title='Data de admissão' value={formattedAdmissionDate} />
												<InfoDetail title='Telefone' value={formattedPhone} />
											</div>
										</div>
									</td>
								</tr>
							</React.Fragment>
						)
					})}
				</tbody>
			</table>
		</div>
	) : (
		<p>Nenhum funcionário cadastrado.</p>
	)
}
