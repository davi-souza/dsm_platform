/**
 * Almost all numbers are going to be multiplied by 100
 * This function corrects it to render to the user
 * @param {number} raw	Number multiplied by 100
 * @return {number}		Correct number to render
 */
export function renderNumber(raw) {
	return (parseInt(raw, 10)/100).toFixed(2);
}
