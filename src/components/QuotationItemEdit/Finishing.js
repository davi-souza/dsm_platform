import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { renderFinishing } from '../../libs/format/finishing';

const possibleFinishings = [
	'STANDARD',
	'RECTIFIED',
	'POLISHED',
];

function Finishing({finishing, setFinishing}) {
	function handleFinishingClick(newFinishing) {
		return function (e) {
			setFinishing(newFinishing);
		}
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Acabamento
						</Typography>
					</Grid>
					{possibleFinishings.map(f => (
						<Grid item xs={12} sm={4} md={3} key={'possible-finishings-' + f}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleFinishingClick(f)}
								variant={
									f === finishing || (!finishing && f === 'STANDARD') ?
									"outlined"
									:
									"text"
								}
							>
								{renderFinishing(f)}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

Finishing.propTypes = {
	finishing: PropTypes.string,
	setFinishing: PropTypes.func.isRequired,
};

export default Finishing;
