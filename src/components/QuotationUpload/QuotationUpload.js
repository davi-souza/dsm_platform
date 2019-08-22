import React, { useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { uploadFile } from '../../libs/fetch/upload';
import './QuotationUpload.scss';


function QuotationUpload() {
	const [loading, setLoading] = useState(false);
	const inputEl = useRef(null);

	async function handleChange(event) {
		setLoading(true);

		const res = await uploadFile(event.target.files[0]);

		console.log(res);

		setLoading(false);
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
				disabled={loading}
			>
				Adicionar Arquivo
			</Button>
			{loading && <LinearProgress id="quotation-upload-loading" />}
		</Box>
	);
}

export default QuotationUpload;
