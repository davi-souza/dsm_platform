import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Quotation from '../Quotation';

configure({ adapter: new Adapter() });

describe('Quotation tests', () => {
	it('should render without crash', () => {
		const component = shallow(<Quotation />);
		expect(component).toMatchSnapshot();
	});
});
