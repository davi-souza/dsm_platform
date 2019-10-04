export function renderDeliveryOption(raw) {
	const days = raw.split('_')[1];

	return `${days} dias úteis`;
}
