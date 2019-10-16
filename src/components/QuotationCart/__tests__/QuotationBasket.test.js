import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuotationBasket from '../QuotationBasket';

configure({ adapter: new Adapter() });

describe('Quotation basket tests', () => {
	it('should render without crash', () => {
		const component = shallow(<QuotationBasket />);
		expect(component).toMatchSnapshot();
	});
});
