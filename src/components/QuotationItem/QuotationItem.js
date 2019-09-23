import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HeaderComponent from './HeaderComponent';
import BaseConfigComponent from './BaseConfigComponent';
import FooterComponent from './FooterComponent';
import { renderFinishing } from '../../libs/format/finishing';
import './QuotationItem.scss';

function QuotationItem({index, item}) {
	const {
		material_type,
		heat_treatment,
		superficial_treatment,
		tolerance,
		finishing,
		screw_amount,
	} = item;

	return (
		<div className="quotation-item">
			<HeaderComponent
				index={index}
				item={item}
			/>
			<Divider light />
			<Grid
				container
				direction="row"
				justify="space-around"
				alignItems="center"
				spacing={2}
				className="quotation-item-config"
			>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Material"
						value={material_type.name}
					/>
				</Grid>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Tratamento térmico"
						value={
							heat_treatment ? heat_treatment.name : null
						}
					/>
				</Grid>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Tratamento superficial"
						value={
							superficial_treatment ? superficial_treatment.name : null
						}
					/>
				</Grid>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Tolerância"
						value={tolerance}
					/>
				</Grid>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Acabamento"
						value={renderFinishing(finishing)}
					/>
				</Grid>
				<Grid item xs={6} sm={4} md={2}>
					<BaseConfigComponent
						label="Número de roscas"
						value={screw_amount}
					/>
				</Grid>
			</Grid>
			<Divider light />
			<FooterComponent
				item={item}
			/>
		</div>
	);
}

QuotationItem.propTypes = {
	item: PropTypes.object.isRequired,
};

export default QuotationItem;
