import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Footer from './Footer';


describe('Components', () => {
  describe('Footer', () => {
    it('should render a footer', () => {
      const wrapper = shallow(<Footer />);
        expect(wrapper.find('.lc-footer')).to.have.length(1);
    });
  });
});
