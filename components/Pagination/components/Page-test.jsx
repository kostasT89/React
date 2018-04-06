/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Page from './Page';

describe('Components', () => {
  describe('Page', () => {
    const props = {
      onClick: () => {},
      pageNumber: 1
    };

    it('renders an li', () => {
      const wrapper = shallow(<Page {...props} />);
      expect(wrapper.find('li')).to.have.length(1);
    });

    it('sets the active class if the page is active', () => {
      const wrapper = mount(<Page {...props} isActive={true} />);
      expect(wrapper.prop('isActive')).to.be.true;
      expect(wrapper.find('li').hasClass('lc-page--active')).to.be.true;
    });

    it('sets the disabled class if the page is disabled', () => {
      const wrapper = mount(<Page {...props} isDisabled={true} />);
      expect(wrapper.prop('isDisabled')).to.be.true;
      expect(wrapper.find('li').hasClass('lc-page--disabled')).to.be.true;
    });

    it('is not disabled by default', () => {
      const wrapper = mount(<Page {...props} />);
      expect(wrapper.prop('isDisabled')).to.be.false;
      expect(wrapper.find('li').hasClass('lc-page--disabled')).to.be.false;
    });

    it('renders an element as a child if passed an one', () => {
      const child = <strong>1</strong>;
      const wrapper = mount(<Page {...props} pageText={child} />);
      expect(wrapper.html()).to.contain('<strong>1</strong>');
    });
  });
});
