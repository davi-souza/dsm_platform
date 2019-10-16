import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuotationContext from '../../contexts/QuotationContext';


function QuotationUpload(props) {
	const [dragging, setDragging] = React.useState(false);
	const {
		setItemsLoading,
	} = React.useContext(QuotationContext);

	const {
		id,
		height,
		classes,
		error,
		handleUpload,
		addItems,
		messages,
	} = props;

	function handleAddItems(files) {
		setItemsLoading(true);

		const promises = [];

		for (let i = 0 ; i < files.length ; i++) {
			promises.push(handleUpload(files[i]));
		}

		Promise.all(promises)
			.then(responses => {
				addItems(
					responses
						.filter(res => !res.errors && res.data)
						.map(res => res.data)
				)
			})
			.catch(console.error)
			.finally(() => {
				setItemsLoading(false);
			});
	}

	function handleInputChange(event) {
		handleAddItems(event.target.files);
	}

	function handleDragEnter(event) {
		event.preventDefault();
		event.stopPropagation();

		if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
			setDragging(true);
		}
	}

	function handleDragLeave(event) {
		event.preventDefault();
		event.stopPropagation();

		setDragging(false);
	}

	function handleDragOver(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	function handleOnDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
			const files = [];

			for (let i = 0 ; i < event.dataTransfer.items.length ; i++) {
				if (event.dataTransfer.items[i].kind === "file") {
					files.push(event.dataTransfer.items[i].getAsFile());
				}
			}

			handleAddItems(files);
		}

		setDragging(false);
	}

	return (
		<div className={classes.wrapper}>
			<input
				className={classes.fileInput}
				id={id}
				multiple
				name="file"
				onChange={handleInputChange}
				type="file"
			/>
			<label
				className={classes.fileInputLabel}
				htmlFor={id}
			>
				<Grid
					className={
						classes.labelContainer +
							(dragging ? ' dragging' : '') +
							(error ? ' error': '')
					}
					alignItems="center"
					container
					justify="center"
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleOnDrop}
					style={{
						height,
						maxHeight: height,
						minHeight: height,
					}}
				>
					<Grid item xs={12}>
						<Grid
							alignItems="center"
							container
							direction="column"
							justify="center"
						>
							{messages.map((msg, msgIndex) => (
								<Grid
									item
									key={'upload-component-msg-key-'+ msgIndex}
									xs={12}
								>
									<Typography component="span" className={classes.inputMsg}>
										{msg}
									</Typography>
								</Grid>
							))}
							{
								error && (
									<Grid item xs={12}>
										<Typography component="span" className={classes.inputMsg}>
											É necessário pelo menos um arquivo
										</Typography>
									</Grid>
								)
							}
						</Grid>
					</Grid>
				</Grid>
			</label>
		</div>
	);
}

const styles = function(theme) {
	const {borders, error} = theme.palette;

	return {
		wrapper: {
			width: '100%',
			padding: '0.5rem 0',
		},
		fileInput: {
			width: 0.1,
			height: 0.1,
			opacity: 0,
			overflow: 'hidden',
			position: 'absolute',
			zIndex: -1,
		},
		fileInputLabel: {
			width: '100%',
		},
		labelContainer: {
			border: `2px dashed ${borders.primary}`,
			backgroundColor: '#f0f0f5',
			color: '#00000077',
			width: '100%',
			'&.dragging, &:active': {
				backgroundColor: '#dadada',
				'&.error': {
					backgroundColor: '#f5a90060',
				},
			},
			'&:hover': {
				cursor: 'pointer',
			},
			'&.error': {
				borderColor: `${error.main}88`,
				backgroundColor: `${error.lighter}88`,
				color: `${error.dark}88`,
			},
		},
		inputMsg: {
			fontSize: '0.9rem',
		},
	};
};

QuotationUpload.propTypes = {
	id: PropTypes.string.isRequired,
	height: PropTypes.string,
	error: PropTypes.bool,
	classes: PropTypes.object,
	addItems: PropTypes.func.isRequired,
	handleUpload: PropTypes.func.isRequired,
	messages: PropTypes.arrayOf(PropTypes.string),
};

QuotationUpload.defaultProps = {
	height: '12rem',
	error: false,
	messages: [
		'Arraste seus arquivos ou clique aqui',
		'Tipos suportados: STEP (.step e .stp)',
	],
};

export default withStyles(styles)(QuotationUpload);
