export function renderTolerance(raw) {
	switch (raw) {
		case 'MEDIUM':
			return `Entre ${String.fromCharCode(177)}0.09mm e ${String.fromCharCode(177)}0.14mm`;
		case 'LOW':
			return `Entre ${String.fromCharCode(177)}0.03mm e ${String.fromCharCode(177)}0.08mm`;
		case 'VERY_LOW':
			return `Menor que ${String.fromCharCode(177)}0.03mm`;
		default:
			return `Maior que ${String.fromCharCode(177)}0.14mm`;
	}
}
