/* eslint react/no-children-prop:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SideNavElement from './SideNavElement';

describe('Components', () => {
  describe('SideNavElement', () => {
    it('should render a side nav element', () => {
      const wrapper = shallow(
        <SideNavElement icon="icon"
                        title="title"
                        navClass="navClass"
                        addAccount={() => ''}
                        subNavElements={[]} />
      );
      expect(wrapper.find('.side-nav-element-component')).to.have.length(1);
    });
  });
});
