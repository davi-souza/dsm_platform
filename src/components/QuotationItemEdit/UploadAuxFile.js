import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import QuotationUpload from '../QuotationUpload';
import QuotationContext from '../../contexts/QuotationContext';
import { uploadAuxiliaryFile } from '../../libs/fetch/upload';

function UploadAuxFile(props) {
	const {addAuxFiles} = React.useContext(QuotationContext);
	const {
		classes,
		needAuxFile,
		auxiliaryFiles,
		itemIndex,
		partId,
	} = props;

	return (
		<Grid container>
			<Grid item xs={12}>
				<QuotationUpload
					error={needAuxFile}
					messages={[
						'Selecione ou arraste seus desenhos 2D',
						'Tipos suportados: PDF (.pdf)'
					]}
					handleUpload={uploadAuxiliaryFile(partId)}
					addItems={addAuxFiles(itemIndex)}
					id={partId + '-upload-aux-files'}
					height="6rem"
				/>
			</Grid>
			<Grid item xs={12} className={classes.auxFilesList}>
				<Grid container>
					{auxiliaryFiles.map(file => (
						<Grid className={classes.auxFile} item xs={12} key={file.id}>
							<Typography variant="body2" component="span">
								{file.name}
							</Typography>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

const height = 'calc(100vh - 15rem - 178px - 7.5rem)';

const styles = {
	auxFilesList: {
		maxHeight: height,
		minHeight: height,
		height,
		overflowY: 'auto',
	},
	auxFile: {
		'&:not(:last-child)': {
			paddingBottom: '0.5rem',
		},
	},
};

UploadAuxFile.propTypes = {
	classes: PropTypes.object,
	needAuxFile: PropTypes.bool.isRequired,
	auxiliaryFiles: PropTypes.array.isRequired,
	itemIndex: PropTypes.number.isRequired,
	partId: PropTypes.string.isRequired,
};

export default withStyles(styles)(UploadAuxFile);
