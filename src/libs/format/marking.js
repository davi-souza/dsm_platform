export function renderMarking(raw) {
	switch (raw) {
		case 'TIPED':
			return 'Tipada';
		case 'ELETRIC_PNEUMATIC_PEN':
			return 'Caneca elétrica/pneumática';
		case 'LOW_RELIEF_MACHINING':
			return 'Usinagem em baixo relevo';
		case 'LASER':
			return 'LASER';
		case 'ELECTROCHEMISTRY':
			return 'Eletroquímica';
		default:
			return null;
	}
}

