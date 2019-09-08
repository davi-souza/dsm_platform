export function getMaterialAndType(materials, material_type_id) {
	for (const material of materials) {
		for (const type of material.material_types) {
			if (type.id === material_type_id) {
				return {
					material: {
						index: materials.indexOf(material),
						id: material.id,
						name: material.name,
					},
					material_type: {
						...type,
						index: material.material_types.indexOf(type),
					},
				};
			}
		}
	}

	return {};
}
