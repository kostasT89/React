/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Welcome from './Welcome';

describe('Components', () => {
  describe('Welcome', () => {
    it('should render a Welcome component', () => {
      const wrapper = shallow(<Welcome userName="" />);
      expect(wrapper.find('.lc-welcome')).to.have.length(1);
    });

    it('should have a <VerticalList/>', () => {
      const wrapper = mount(<Welcome userName="" />);
      expect(wrapper.find('.lc-vertical-list')).to.have.length(1);
      expect(wrapper.find('VerticalList')).to.have.length(1);
    });

    it('should have the necessary text components', () => {
      const wrapper = mount(<Welcome userName="" />);
      expect(wrapper.find('.lc-welcome__header')).to.have.length(1);
      expect(wrapper.find('.lc-welcome__subtext')).to.have.length(1);
      expect(wrapper.find('.lc-welcome__list-title')).to.have.length(1);
      expect(wrapper.find('.lc-welcome__text')).to.have.length(1);
    });

    it('should have a containg row', () => {
      const wrapper = mount(<Welcome userName="" />);
      expect(wrapper.find('.lc-row')).to.have.length(1);
    });

    it('should have a connect button', () => {
      const wrapper = mount(<Welcome userName="" />);
      expect(wrapper.find('button.lc-welcome__button')).to.have.length(1);
    });
  });
});
