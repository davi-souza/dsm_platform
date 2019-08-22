import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuotationUpload from '../QuotationUpload';

configure({ adapter: new Adapter() });

describe('Quotation upload tests', () => {
	it('should render without crash', () => {
		const component = shallow(<QuotationUpload />);
		expect(component).toMatchSnapshot();
	});
});
