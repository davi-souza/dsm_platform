import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import QuotationItemEdit from '../QuotationItemEdit';
import QuotationContext from '../../contexts/QuotationContext';

function HeaderComponent({index, item}) {
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
				className="quotation-item-header"
			>
				<Grid item className="quotation-item-header__part-name">
					{item.name}
				</Grid>
				<Grid className="quotation-item-value">
					<IconButton
						disabled={itemsLoading}
						color="primary"
						onClick={handleOpenEdit}
						title="Editar peça"
					>
						<EditIcon />
					</IconButton>
					<IconButton
						disabled={itemsLoading}
						color="primary"
						onClick={handleRemoveItem}
						title="Remover peça"
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
			<QuotationItemEdit
				item={item}
				open={editDialogOpen}
				onCancel={handleCloseEdit}
			/>
		</React.Fragment>
	);
}

HeaderComponent.propTypes = {
	item: PropTypes.object.isRequired,
};

export default HeaderComponent;
