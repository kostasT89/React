import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoginMessage from './LoginMessage';

describe('Components', () => {
  describe('LoginMessage', () => {
    it('should render a login message component', () => {
      const wrapper = shallow(<LoginMessage errorMessage=""
                                            successMessage=""
                                            loginAttempts={1}
                                            maxLoginAttempts={3} />);
        expect(wrapper.find('.login-message-component')).to.have.length(1);
    });
  });
});
