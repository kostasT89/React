import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SignupForm from './SignupForm';

describe('Components', () => {
  describe('SignupForm', () => {
    it('should render a Signup Form component', () => {
      const wrapper = shallow(<SignupForm data={{}}
                                         onSubmit={() => {}}
                                         dispatch={() => {}}
                                         currentlySending={true || false}
                                         showPasswordResetForm={true || false} />);
        expect(wrapper.find('.lc-signup-form')).to.have.length(1);
    });
  });
});
