/* eslint-disable no-unused-expressions */

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import mockStore from 'redux-mock-store';

import EducationGoalsForm from './EducationGoalsForm';

describe('Components', () => {
  describe('EducationGoalsForm', () => {
    const getState = {
      hasCoClient: false,
      numberOfChildren: 1
    };
    const nullFunc = () => [];
    const store = mockStore(getState)();
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <EducationGoalsForm
            onSubmit={() => true}
            handleSubmit={nullFunc}
            invalid={nullFunc}
            submitting={nullFunc}
          />
        </Provider>
      );
    });

    it('should render an Education Form component', () => {
      expect(wrapper.find('.lc-education-goals-form')).to.have.length(1);
    });
  });
});
