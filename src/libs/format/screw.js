export function renderScrew(raw) {
	if (!raw) {
		return raw;
	}

	const {type, amount} = raw;

	if (type === 'EXTERNAL') {
		return 'Rosca externa';
	}

	return `${amount} rosca(s) interna(s)`;
}
