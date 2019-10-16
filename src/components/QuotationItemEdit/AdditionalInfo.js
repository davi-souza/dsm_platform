import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function AdditionalInfo(props) {
	const {
		additionalInfo,
		setAdditionalInfo,
	} = props;

	function handleChange(event) {
		setAdditionalInfo(event.target.value);
	}

	return (
		<TextField
			fullWidth
			label="Informações adicionais"
			multiline={true}
			onChange={handleChange}
			rows={7}
			value={
				additionalInfo || ''
			}
		/>
	);
}

AdditionalInfo.propTypes = {
	additionalInfo: PropTypes.string,
	setAdditionalInfo: PropTypes.func.isRequired,
};

export default AdditionalInfo;
