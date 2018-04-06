/*eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FontAwesomeIcon from './FontAwesomeIcon';

describe('Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FontAwesomeIcon icon="icon" />);
  });
  describe('FontAwesomeIcon', () => {
    it('should render a generic icon component', () => {
      expect(wrapper.find('.lc-fa-icon')).to.have.length(1);
      expect(wrapper.find('.fa-icon')).to.have.length(1);
      expect(wrapper.find('i')).to.have.length(1);
    });
    it('should accept a callback function that is triggered on click', () => {
       const mockOnClick = sinon.spy();
       wrapper.setProps({ onClick: mockOnClick });
       wrapper.find('.generic-icon-component').simulate('click');
       expect(mockOnClick.calledOnce).to.be.true;
    });
  });
});
