import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
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

export function EmployeeTable({ employees }: EmployeeTableProps) {
	return employees.length ? (
		<div className='rounded-t overflow-hidden'>
			<table className='w-full text-white'>
				<thead className='uppercase bg-primary text-left'>
					<tr className='h-12 [&_th]:font-[500] [&_th]:pl-3'>
						<th>Foto</th>
						<th>Nome</th>
						<th>Cargo</th>
						<th>Data de admissão</th>
						<th>Telefone</th>
					</tr>
				</thead>
				<tbody>
					{employees.map(employee => {
						return (
							<tr key={employee.id} className='text-black border-t border-gray-00 h-12 [&_td]:pl-3 bg-white shadow-sm'>
								<td>
									<img src={employee.image} width={34} height={34} className='rounded-full' />
								</td>
								<td>{employee.name}</td>
								<td>{employee.job}</td>
								<td>{format(employee.admission_date, 'dd/MM/yyyy', { locale: ptBR })}</td>
								<td>{formatPhoneNumber(employee.phone)}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	) : (
		<p>Nenhum funcionário cadastrado.</p>
	)
}
