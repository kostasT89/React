/*eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GenericButton from './GenericButton';

describe('Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GenericButton title="Click Me"
                                     buttonClass="success-button"
                                     onClick={() => {}} />);
  });
  describe('GenericButton', () => {
    it('should render a generic button component', () => {
        expect(wrapper.find('.generic-button-component')).to.have.length(1);
    });
    it('be able to be styled via props', () => {
        const button = wrapper.find('.success-button');
        expect(button).to.have.length(1);
        expect(button.text()).to.equal('Click Me');
    });
    it('should take an optional iconLeft property that creates a icon on the button', () => {
      wrapper.setProps({ iconLeft: 'checkbox' });
      expect(wrapper.find('.button-icon')).to.have.length(1);
    });
    it('should accept a callback function that is triggered on click', () => {
       const mockOnClick = sinon.spy();
       wrapper.setProps({ onClick: mockOnClick });
       wrapper.find('.generic-button-component').simulate('click');
       expect(mockOnClick.calledOnce).to.be.true;
    });
  });
});
