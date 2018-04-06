import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import mockStore from 'redux-mock-store';

import PersonalDetailsForm from './PersonalDetailsInfoForm';

describe('Forms', () => {
  describe('PersonalDetailsForm', () => {
    const nullFunc = () => [];
    const store = mockStore({})();
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <PersonalDetailsForm
            onSubmit={() => true}
            handleSubmit={nullFunc}
            invalid={nullFunc}
            submitting={nullFunc}
            firstName="LeChristopher"
            lastName="Blackwell"
            initialValues={{ gavePermissionToViewFinData: true }}
          />
        </Provider>
      );
    });

    it('should render a Personal Details Form component', () => {
      expect(wrapper.find('.lc-personal-details-info-form')).to.have.length(1);
    });
    it('should render 8 Rows of content', () => {
      expect(wrapper.find('.lc-personal-details-info-form__row')).to.have.length(8);
    });
    it('should only render the next and previous buttons', () => {
      expect(wrapper.find('button')).to.have.length(2);
    });
    it('should render all fields', () => {
      expect(wrapper.find('Field')).to.have.length(17);
    });
    it('should hide coClient fields to start', () => {
        expect(wrapper.find('.lc-column--hidden')).to.have.length(1);
    });
  });
});
