import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HeaderComponent from './HeaderComponent';
import BaseConfigComponent from '../BaseConfig';
import FooterComponent from './FooterComponent';
import { renderFinishing } from '../../libs/format/finishing';
import { renderScrew } from '../../libs/format/screw';
import './QuotationItem.scss';

function QuotationItem({index, item}) {
	const {
		material_type,
		heat_treatment,
		superficial_treatment,
		tolerance,
		finishing,
		screw,
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
						label="Menor tolerância"
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
						label="Roscas"
						value={renderScrew(screw)}
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
