import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Logout from './Logout';

describe('Components', () => {
  describe('Logout', () => {
    it('should render a logout button', () => {
      const wrapper = shallow(<Logout />);
        expect(wrapper.find('.logout-component')).to.have.length(1);
    });
  });
});
