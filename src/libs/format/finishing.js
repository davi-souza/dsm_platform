/**
 * The "Finishing" config of the part comes as a ENUM
 * It is necessary to translate/format it so the user
 * can read the value
 *
 * Possible values for finishing:
 * - STANDARD -> Padrão - 3.2 Ra
 * - RECTIFIED -> Retificado - 1.6 Ra
 * - POLISHED -> Polido - 0.8 Ra
 * @param {string} raw	Finishing enum
 * @return {string}		Finishing translated/formatted
 */
export function renderFinishing(raw) {
	switch (raw) {
		case 'RECTIFIED':
			return 'Retificado - 1.6 Ra';
		case 'POLISHED':
			return 'Polido - 0.8 Ra';
		default:
			return 'Padrão - 3.2 Ra';
	};
}
