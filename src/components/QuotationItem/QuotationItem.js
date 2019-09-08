import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuotationItemMaterials from '../QuotationItemMaterials';
import quotationItemsContext from '../../contexts/quotationItemsContext';
import { moneyRender } from '../../libs/money';
import './QuotationItem.scss';

const styles = {
	cardContent: {
		paddingTop: '0',
	},
	cardActions: {
		justifyContent: 'space-between',
	},
};

const regExp = /^\d*$/;

function CardHeaderAction(partLoading, removeItem, index) {
	if (partLoading) {
		return <CircularProgress />;
	}

	return (
		<IconButton
			onClick={() => removeItem(index)}
		>
			<DeleteIcon />
		</IconButton>
	);
}

function QuotationItem({qtd, name, index, unit_price, material_type_id}) {
	const [itemQtd, setItemQtd] = useState(qtd);

	const {
		materials,
		removeItem,
		partLoading,
		handlePartOptionsChange,
	} = useContext(quotationItemsContext);

	/** Handles the qtd input changes
	 * @params {object} event Event with "target" key
	 */
	function handleQtdChange(event) {
		const newQtd = event.target.value;
		
		if (regExp.test(newQtd)) {
			if (!newQtd) {
				setItemQtd(0);
			} else {
				setItemQtd(parseInt(newQtd, 10));
			}
		}
	}

	/** Commits the QTD change
	 * This happens when:
	 * - blur on qtd input
	 * - 'Enter' key pressed when focus on qtd input
	 */
	function handleCommitQtdChange() {
		if (!!itemQtd && itemQtd !== qtd) {
			handlePartOptionsChange(index, material_type_id, itemQtd);
		}
	}

	/** Handles key press when focus on qtd input
	 * @params {object} event Event object with "key" key
	 */
	function handleInputKeyPress(event) {
		if (event.key === 'Enter') {
			handleCommitQtdChange();
		}
	}

	return (
		<Card className="quotation-item">
			<CardHeader
				title={name}
				action={CardHeaderAction(partLoading, removeItem, index)}
			/>
			<CardContent style={styles.cardContent}>
				<QuotationItemMaterials
					materials={materials}
					material_type_id={material_type_id}
					itemIndex={index}
					qtd={qtd}
				/>
			</CardContent>
			<CardActions style={styles.cardActions}>
				<div>
					<span
						className="quotation-item__qtd-input-label"
					>
						QTD:
					</span>
					<Input
						className="quotation-item__qtd-input"
						value={itemQtd}
						onChange={handleQtdChange}
						type="number"
						onKeyPress={handleInputKeyPress}
						onBlur={handleCommitQtdChange}
					/>
				</div>
				<div>
					Preço pela unidade R$ {moneyRender(unit_price)}
				</div>
			</CardActions>
		</Card>
	);
}

QuotationItem.propTypes = {
	qtd: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	material_type_id: PropTypes.string.isRequired,
	unit_price: PropTypes.number.isRequired,
};

export default QuotationItem;
