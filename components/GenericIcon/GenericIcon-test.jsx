/*eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GenericIcon from './GenericIcon';

describe('Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GenericIcon icon="icon"
                                   onClick={() => {}}
                                   iconClass="icon-class" />);
  });
  describe('GenericIcon', () => {
    it('should render a generic icon component', () => {
      expect(wrapper.find('.generic-icon-component')).to.have.length(1);
      expect(wrapper.find('.icon-class')).to.have.length(1);
    });
    it('should accept a callback function that is triggered on click', () => {
       const mockOnClick = sinon.spy();
       wrapper.setProps({ onClick: mockOnClick });
       wrapper.find('.generic-icon-component').simulate('click');
       expect(mockOnClick.calledOnce).to.be.true;
    });
  });
});
