/**
 * Almost all numbers are going to be multiplied by 100
 * This function corrects it to render to the user
 * @param {number} raw	Number multiplied by 100
 * @return {number}		Correct number to render
 */
export function renderMoney(raw) {
	const formatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	const number = (parseInt(raw, 10)/100).toFixed(2);

	return formatter.format(number);
}
