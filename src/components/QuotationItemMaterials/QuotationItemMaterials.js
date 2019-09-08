import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import quotationItemsContext from '../../contexts/quotationItemsContext';
import { getMaterialAndType } from '../../libs/material';
import './QuotationItemMaterials.scss';

const styles = {
	matButton: {
		fontSize: '0.75rem',
	},
}

function renderSelectedMaterialType(material_type) {
	if (!material_type) {
		return (
			<React.Fragment>
				<div className="quotation-item-materials__selected-label">
					Selecione um material
				</div>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<div className="quotation-item-materials__selected-label">
				Material selecionado
			</div>
			<div className="quotation-item-materials__selected-value">
				{material_type.name}
			</div>
		</React.Fragment>
	);
}

function QuotationItemMaterials({materials, material_type_id, itemIndex, qtd}) {
	const [material, setMaterial] = useState(null);
	const [material_type, setMaterialType] = useState(null);
	const {partLoading, handlePartOptionsChange} = useContext(quotationItemsContext);

	useEffect(() => {
		const res = getMaterialAndType(materials, material_type_id);

		setMaterial(res.material);

		setMaterialType(res.material_type);
	}, [materials, material_type_id]);

	if (!material) {
		return null;
	}

	function handleMaterialClick({id, name, index}) {
		setMaterial({id, name, index});		
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<span className="quotation-item-materials__material">
					{renderSelectedMaterialType(material_type)}
				</span>
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<span className="quotation-item-materials__mat-label">
							{materials.length >= 1 && 'Materiais'}
						</span>
					</Grid>
					{materials.map((mat, matIndex) => (
						<Grid
							item
							xs={6}
							key={'quotation-item-materials-mat-' + matIndex}
						>
							<Button
								style={styles.matButton}
								variant={mat.id === material.id ? 'outlined' : 'text'}
								fullWidth
								onClick={() => handleMaterialClick({...mat, index: matIndex})}
								disabled={partLoading}
							>
								{mat.name}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<span className="quotation-item-materials__mat-label">
							{materials.length >= 1 && 'Tipos de material'}
						</span>
					</Grid>
					{materials.length >= 1 && materials[material.index].material_types.map((type, typeIndex) => (
						<Grid
							item
							xs={12}
							key={'quotation-item-materials-type-'+typeIndex}
						>
							<Button
								style={styles.matButton}
								variant={type.id === material_type.id ? 'outlined' : 'text'}
								fullWidth
								onClick={() => handlePartOptionsChange(itemIndex, type.id, qtd)}
								disabled={partLoading}
							>
								{type.name}
							</Button>	
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

QuotationItemMaterials.propTypes = {
	itemIndex: PropTypes.number.isRequired,
	qtd: PropTypes.number.isRequired,
	materials: PropTypes.arrayOf(PropTypes.exact({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		material_types: PropTypes.arrayOf(PropTypes.exact({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})),
	})).isRequired,
};

export default QuotationItemMaterials;
