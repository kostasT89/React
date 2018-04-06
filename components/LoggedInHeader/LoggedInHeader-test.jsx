import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoggedInHeader from './LoggedInHeader';

describe('Components', () => {
  describe('LoggedInHeader', () => {
    it('should render a header', () => {
      const wrapper = shallow(<LoggedInHeader />);
        expect(wrapper.find('.logged-in-header-component')).to.have.length(1);
    });
  });
});
