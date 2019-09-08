import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuotationItemMaterials from '../QuotationItemMaterials';

configure({ adapter: new Adapter() });

describe('Quotation item tests', () => {
	it('should render without crash', () => {
		const item = {
			name: 'mock name',
			qtd: 1,
			unitPrice: {
				amount: 1,
				currency: 'R$',
			},
			index: 0,
		};
		const component = shallow(<QuotationItemMaterials {...item} />);
		expect(component).toMatchSnapshot();
	});
});
