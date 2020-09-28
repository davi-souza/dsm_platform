import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import QuotationUpload from '../../components/QuotationUpload';
import QuotationItemList from '../../components/QuotationItemList';
import QuotationCart from '../../components/QuotationCart';
import AppContext from '../../contexts/AppContext';
import QuotationContext from '../../contexts/QuotationContext';
import { uploadFile } from '../../libs/fetch/upload';
import { getMaterials } from '../../libs/fetch/material';
import { changePartConfig } from '../../libs/fetch/part';
import './Quotation.scss';

function Quotation({classes}) {
	const [items, setItems] = React.useState(mockItems);
	const [itemsLoading, setItemsLoading] = React.useState(false);
	const [materials, setMaterials] = React.useState([]);
	const {handleOpenSnackbar} = React.useContext(AppContext);

	React.useEffect(() => {
		getMaterials().then(({data, error}) => {
			if (!error) {
				setMaterials(data);
			}
		});
	}, []);

	function savePartConfigChanges(input) {
		setItemsLoading(true);

		changePartConfig(input)
			.then(({data, error}) => {
				if (data) {
					const newItems = items.map(item => {
						if (item.id === input.part_id) {
							return data;
						}

						return item;
					});

					setItems(newItems);

					handleOpenSnackbar('Atualização com sucesso');
				} else if (error) {
					handleOpenSnackbar(error.message);
				}
			})
			.finally(() => {
				setItemsLoading(false);
			});
	}

	function addItems(newItems) {
		setItems([...items, ...newItems]);
	}

	function removeItem(index) {
		const newItems = items.filter((_, i) => i !== index);

		setItems(newItems);
	}

	function addAuxFiles(itemIndex) {
		return function (newFiles) {
			const newItems = items.map((item, i) => {
				if (i === itemIndex) {
					item.auxiliary_files = [...item.auxiliary_files, ...newFiles];
				}

				return item;
			});

			setItems(newItems);
		};
	}

	return (
		<QuotationContext.Provider value={{
			items,
			itemsLoading,
			addAuxFiles,
			setItemsLoading,
			savePartConfigChanges,
			removeItem,
			materials,
		}}>
			<AppBar />
			<QuotationCart />
			<Container maxWidth="lg">
				<Grid container className={classes.gridContainer}>
					<Grid item xs={12}>
						<QuotationItemList />
					</Grid>
					<Grid item xs={12}>
						<QuotationUpload
							addItems={addItems}
							handleUpload={uploadFile}
							id="upload-part-files"
						/>
					</Grid>
				</Grid>
			</Container>
		</QuotationContext.Provider>
	);
}

const mockItems = Array(1).fill(JSON.parse('{"id":"186e8788-b353-4331-aabf-0d6c6c28a069","name":"test.stp","dimensions":"26.00mm x 26.00mm x 85.00mm","auxiliary_files":[],"material_type":{"id":"60808daf-4376-46e8-b22b-c82c4c1c00ca","name":"Alumínio 6351 T6"},"heat_treatment":null,"superficial_treatment":null,"tolerance":null,"finishing":null,"screw":null,"marking":null,"knurled":null,"report":null,"amount":1,"unit_price":17840}'));

const styles = {
	gridContainer: {
		position: 'relative',
	},
	basketGrid: {
		marginBottom: '1rem',
		position: 'sticky',
		top: '0',
	},
};

Quotation.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(Quotation);
