import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';


describe('<Header />', () => {
  it('It should render without error', () => {
    const component = shallow(<Header />);
    console.log(component);
    const wrapper = component.find('.app-brand');
    console.log(wrapper);
    expect(wrapper.length).toBe(1);
  })
})
