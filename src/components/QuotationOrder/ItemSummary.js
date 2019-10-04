import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { renderNumber } from '../../libs/format/number';
import { renderFinishing } from '../../libs/format/finishing';

function ItemSummary({item}) {
	const {
		material_type,
		heat_treatment,
		superficial_treatment,
		tolerance,
		finishing,
		screw_amount,
		unit_price,
		amount,
	} = item;

	return (
		<Grid
			container
			spacing={1}
			className="quotation-order__config-list"
		>
			<Grid item xs={12}>
				<Grid
					container
					justify="space-between"
					alignItems="center"
					className="quotation-order__item"
				>
					<Grid item className="quotation-order__item-name">
						{item.name}
					</Grid>
					<Grid item className="quotation-order__item-whole-price">
						{`R$ ${renderNumber(amount * unit_price)}`}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Material"
					value={material_type.name}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Tratamento térmico"
					value={heat_treatment ? heat_treatment.name : null}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Tratamento superficial"
					value={superficial_treatment ? superficial_treatment.name : null}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Mínima tolerância"
					value={tolerance ? tolerance : null}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Acabamento"
					value={renderFinishing(finishing)}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Roscas"
					value={screw_amount}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Quantidade"
					value={amount}
				/>
			</Grid>
			<Grid item xs={12}><Divider light /></Grid>
			<Grid item xs={12}>
				<RenderConfig
					label="Preço por unidade"
					value={`R$ ${renderNumber(unit_price)}`}
				/>
			</Grid>
		</Grid>
	);
}

function RenderConfig({label, value}) {
	return (
		<Grid container spacing={1} className="quotation-order-config">
			<Grid item className="quotation-order-config__label">{`${label}:`}</Grid>
			<Grid item className="quotation-order-config__value">{value || '—'}</Grid>
		</Grid>
	);
}

ItemSummary.propTypes = {
	item: PropTypes.object.isRequired,
};

export default ItemSummary;
