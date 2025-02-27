export const formatPhoneNumber = (phone: string): string => {
	if (!phone || phone.length < 12) return phone

	const countryCode = phone.slice(0, 2)
	const areaCode = phone.slice(2, 4)
	const firstPart = phone.slice(4, 9)
	const secondPart = phone.slice(9, 13)

	return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`
}
