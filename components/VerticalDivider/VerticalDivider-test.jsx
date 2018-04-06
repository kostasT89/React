import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import VerticalDivider from './VerticalDivider';

describe('Components', () => {
  describe('VerticalDivider', () => {
    it('should render a VerticalDivider component', () => {
      const wrapper = shallow(<VerticalDivider />);
        expect(wrapper.find('.vertical-divider-component')).to.have.length(1);
    });
  });
});
