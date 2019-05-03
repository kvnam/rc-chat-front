import React from 'react';
import enzyme from 'enzyme';
import Header from './Header';


describe('<Header />', () => {
  it('It should render without error', () => {
    const component = enzyme.shallow<typeof Header>(<Header />).dive();
    
    const wrapper = component.find(".rc-appbar");
    expect(wrapper.length).toBe(1);
  })
})
