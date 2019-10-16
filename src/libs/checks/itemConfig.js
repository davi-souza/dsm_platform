export function isAuxFileNeeded(item) {
	function hasFinishing(finishing) {
		return !!finishing && finishing !== 'STANDARD';
	}

	function hasTolerance(tolerance) {
		return !!tolerance && tolerance !== 'HIGH';
	}

	function hasScrew(screw) {
		return !!screw && screw.type !== 'NONE';
	}

	function hasKnurled(knurled) {
		return !!knurled && knurled !== 'NO';
	}

	function hasReport(report) {
		return !!report && report !== 'STANDARD';
	}

	return (!!item.heatTreatment || !!item.superficialTreatment ||
		hasFinishing(item.finishing) || hasTolerance(item.tolerance) ||
		hasScrew(item.screw) || !!item.marking || hasReport(item.report) ||
		hasKnurled(item.knurled)) &&
		item.auxiliaryFiles.length === 0;
}
