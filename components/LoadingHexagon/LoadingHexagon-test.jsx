import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoadingHexagon from './LoadingHexagon';

describe('Components', () => {
  describe('LoadingHexagon', () => {
    it('should render a loading hexagon component', () => {
      const wrapper = shallow(<LoadingHexagon />);
        expect(wrapper.find('.preloader')).to.have.length(1);
    });
  });
});
