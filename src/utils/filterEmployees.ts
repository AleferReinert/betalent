import { EmployeeProps } from '../components/EmployeeTable'

export const filterEmployees = (employees: EmployeeProps[], query: string) => {
	const isPhoneSearch = /^[\d+]/.test(query)
	const sanitizedValue = isPhoneSearch ? query.replace(/[\s\-()]/g, '') : query.toLowerCase()

	return employees.filter(
		employee =>
			employee.name.toLowerCase().includes(sanitizedValue) ||
			employee.job.toLowerCase().includes(sanitizedValue) ||
			employee.phone.replace(/[\s\-()]/g, '').includes(sanitizedValue)
	)
}
