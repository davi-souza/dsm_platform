import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QuotationItem from '../QuotationItem';
import QuotationContext from '../../contexts/QuotationContext';
import './QuotationItemList.scss';

const styles = {
	uploadIcon: {
		color: 'rgba(69, 90, 100, 0.1)',
		fontSize: '20rem',
	},
};

function QuotationItemList() {
	const {items} = React.useContext(QuotationContext);

	if (!items || items.length === 0) {
		return (
			<div className="quotation-item-list__empty">
				<CloudUploadIcon style={styles.uploadIcon} />
				<span>Faça upload do seu arquivo!</span>
			</div>
		);
	} else {
		return (
			<React.Fragment>
				{items.map((item, index) => (
					<QuotationItem
						key={'quotation-item-list__item-' + index}
						index={index}
						item={item}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default QuotationItemList;
