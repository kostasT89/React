import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoginForm from './LoginForm';

describe('Components', () => {
  describe('LoginForm', () => {
    it('should render a LoginForm component', () => {
      const wrapper = shallow(<LoginForm data={{}}
                                         onSubmit={() => {}}
                                         dispatch={() => {}}
                                         onChange={() => {}}
                                         currentlySending={true || false}
                                         showPasswordResetForm={true || false} />);
        expect(wrapper.find('.lc-login-form')).to.have.length(1);
    });
  });
});
