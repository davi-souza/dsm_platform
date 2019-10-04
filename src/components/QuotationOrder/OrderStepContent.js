import React from 'react';
import ItemsList from './ItemsList';
import Delivery from './Delivery';
import Confirmation from './Confirmation';

const stepContents = [
	<ItemsList />,
	<Delivery />,
	<Confirmation />,
];

function OrderStepContent(activeStep) {
	if (activeStep < stepContents.length) {
		return stepContents[activeStep];
	}

	return null;
}

export default OrderStepContent;
