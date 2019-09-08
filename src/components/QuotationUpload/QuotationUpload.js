import React, { useContext, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import quotationItemsContext from '../../contexts/quotationItemsContext';
import { uploadFile } from '../../libs/fetch/upload';
import './QuotationUpload.scss';


function QuotationUpload() {
	const inputEl = useRef(null);
	const {
		uploading,
		setUploading,
		addItem
	} = useContext(quotationItemsContext);

	async function handleChange(event) {
		setUploading(true);

		try {
			const res = await uploadFile(event.target.files[0]);

			addItem({
				...res.part,
			});
		} catch (err) {
		} finally {
			setUploading(false);
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
				fullWidth
				onClick={openFileInput}
				disabled={uploading}
			>
				Adicionar Arquivo
			</Button>
		</Box>
	);
}

export default QuotationUpload;
