/*eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Callout from './Callout';

describe('Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Callout title="The Title"
                               message="The Message"
                               calloutType="success-callout"
                               onClick={() => {}} />);
  });
  describe('Callout', () => {
    it('should render a callout component', () => {
        expect(wrapper.find('.callout-component')).to.have.length(1);
    });
    it('should render the correct title and message', () => {
      expect(wrapper.find('.callout-title').text()).to.equal('The Title');
      expect(wrapper.find('.callout-message').text()).to.equal('The Message');
    });
    it('should accept a callback function that is triggered on click', (done) => {
       const mockOnClick = sinon.spy();
       wrapper.setProps({ onClick: mockOnClick });
       wrapper.find('.exit-callout').simulate('click');
       expect(mockOnClick.calledOnce).to.be.true;
       done();
    });
  });
});
