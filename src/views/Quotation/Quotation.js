import React from 'react';
import Container from '@material-ui/core/Container';
import QuotationItemList from '../../components/QuotationItemList';
import AppContext from '../../contexts/AppContext';
import QuotationContext from '../../contexts/QuotationContext';
import { getMaterials } from '../../libs/fetch/material';
import { changePartConfig } from '../../libs/fetch/part';
import './Quotation.scss';

function Quotation() {
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

					handleOpenSnackbar('Peça atualizada com sucesso!');
				} else if (error) {
					handleOpenSnackbar(error.message);
				}
			})
			.finally(() => {
				setItemsLoading(false);
			});
	}

	function removeItem(index) {
		const newItems = items.filter((_, i) => i !== index);

		setItems(newItems);
	}

	return (
		<QuotationContext.Provider value={{
			items,
			itemsLoading,
			savePartConfigChanges,
			removeItem,
			materials,
		}}>
			<Container maxWidth="lg">
				<QuotationItemList />
			</Container>
		</QuotationContext.Provider>
	);
}

const mockItems = [
	{
		id: 'b723951f-9776-4fb9-896d-a61f369423e0',
		name: 'mock.step',
		material_type: {
			id: 'cfc560d7-b2e1-47d8-921c-1c4a5720205d',
			name: 'Alumínio 5083 / 5082',
		},
		heat_treatment: null,
		superficial_treatment: {
			id: '22b26118-c992-4d14-94e5-4ff1a942637d',
			name: 'Anodização',
		},
		tolerance: null,
		finishing: null,
		screw_amount: 0,
		amount: 1,
		unit_price: 6315,
	},
];

export default Quotation;
