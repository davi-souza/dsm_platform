import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import QuotationItemEdit from '../QuotationItemEdit';
import QuotationContext from '../../contexts/QuotationContext';

function HeaderComponent({classes, index, item}) {
	const [editDialogOpen, setEditDialogOpen] = React.useState(false);
	const {
		itemsLoading,
		removeItem,
	} = React.useContext(QuotationContext);

	function handleOpenEdit() {
		setEditDialogOpen(true);
	}

	function handleCloseEdit() {
		setEditDialogOpen(false);
	}

	function handleRemoveItem() {
		if (window.confirm('Remover peça?')) {
			removeItem(index);
		}
	}

	return (
		<React.Fragment>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.headerContainer}
			>
				<Grid item className={classes.itemName}>
					{item.name}
				</Grid>
				<Grid item>
					<Grid container spacing={1}>
						<Grid item>
							<Button
								color="inherit"
								disabled={itemsLoading}
								onClick={handleOpenEdit}
								size="small"
							>
								<EditIcon
									className={classes.buttonIcon}
									size="small"
								/>
								Editar
							</Button>
						</Grid>
						<Grid item>
							<Button
								color="inherit"
								disabled={itemsLoading}
								onClick={handleRemoveItem}
								size="small"
							>
								<DeleteIcon
									className={classes.buttonIcon}
									size="smal"
								/>
								Remover
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<QuotationItemEdit
				item={item}
				itemIndex={index}
				open={editDialogOpen}
				onCancel={handleCloseEdit}
			/>
		</React.Fragment>
	);
}

function styles({palette}) {
	return {
		headerContainer: {
			padding: '0.5rem 1rem',
			color: palette.primary.darkText,
		},
		itemName: {
			fontSize: '1.2rem',
			fontWeight: 'bold',
		},
		buttonIcon: {
			fontSize: '1.2rem',
			marginRight: '0.3rem',
		},
	};
};

HeaderComponent.propTypes = {
	classes: PropTypes.object,
	item: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderComponent);
