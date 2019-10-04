import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import QuotationContext from '../../contexts/QuotationContext';
import { uploadFile } from '../../libs/fetch/upload';
import './QuotationUpload.scss';


function QuotationUpload({classes}) {
	const inputEl = React.useRef(null);
	const {
		itemsLoading,
		setItemsLoading,
		addItem,
	} = React.useContext(QuotationContext);

	async function handleChange(event) {
		setItemsLoading(true);

		try {
			const {data} = await uploadFile(event.target.files[0]);

			addItem({
				...data.part,
			});
		} catch (err) {
		} finally {
			setItemsLoading(false);
		}
	}

	function openFileInput() {
		inputEl.current.click();
	}

	return (
		<Box
			component="div"
			id="quotation-upload-wrapper"
		>
			<input
				type="file"
				name="file"
				id="quotation-upload-input"
				ref={inputEl}
				onChange={handleChange}
			/>
			<Button
				color="primary"
				className={classes.uploadButton}
				disabled={itemsLoading}
				fullWidth
				onClick={openFileInput}
				variant="text"
			>
				Adicionar Arquivo
			</Button>
		</Box>
	);
}

const styles = {
	uploadButton: {
		fontSize: '1.25rem',
		height: '5rem',
	},
};

QuotationUpload.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(QuotationUpload);
