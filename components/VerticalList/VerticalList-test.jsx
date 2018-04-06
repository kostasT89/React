/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import VerticalList from './VerticalList';

describe('Components', () => {
  describe('VerticalList', () => {
    const stringArray = ['Hi', 'there', 'home skillet'];

    it('should render a VerticalList component', () => {
      const wrapper = shallow(<VerticalList items={stringArray} />);
      expect(wrapper.find('.lc-vertical-list')).to.have.length(1);
    });

    it('should have props for items and showBrackets boolean', () => {
      const wrapper = shallow(<VerticalList items={stringArray} />);
      expect(wrapper.props().items).to.be.defined;
      expect(wrapper.props().showBrackets).to.be.defined;
    });

    it('should have an ordered-list', () => {
      const wrapper = mount(<VerticalList items={stringArray} />);
      expect(wrapper.find('ol')).to.have.length(1);
      expect(wrapper.find('.lc-vertical-list__ol')).to.have.length(1);
    });

    it('should render a list item for each string in an array', () => {
      const wrapper = mount(<VerticalList items={stringArray} />);
      expect(wrapper.find('li')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__li')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__content')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__icon')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__text')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__bracket')).to.have.length(2);
    });

    it('should not render brackets if specified', () => {
      const wrapper = mount(<VerticalList items={stringArray} showBrackets={false} />);
      expect(wrapper.find('li')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__li')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__content')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__icon')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__text')).to.have.length(3);
      expect(wrapper.find('.lc-vertical-list__bracket')).to.have.length(0);
    });
  });
});
