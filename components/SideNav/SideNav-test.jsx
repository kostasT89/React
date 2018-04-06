import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SideNav from './SideNav';

describe('Components', () => {
  describe('SideNav', () => {
    xit('should render a side nav', () => {
      const wrapper = shallow(<SideNav currentRoute="/route" />);
        expect(wrapper.find('.lc-side-nav-component')).to.have.length(1);
    });
  });
});
