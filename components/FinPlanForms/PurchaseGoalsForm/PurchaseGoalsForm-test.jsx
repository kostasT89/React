import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import mockStore from 'redux-mock-store';

import PurchaseGoalsForm from './PurchaseGoalsForm';

describe('Forms', () => {
  describe('PurchaseGoalsForm', () => {
    const getState = {
      numberOfChildren: 1
    };
    const nullFunc = () => [];
    const store = mockStore(getState)();
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <PurchaseGoalsForm
            onSubmit={() => true}
            handleSubmit={nullFunc}
            invalid={nullFunc}
            submitting={nullFunc}
          />
        </Provider>
      );
    });

    it('should render a Purchase Goals Form component', () => {
      expect(wrapper.find('.lc-purchase-goals-form')).to.have.length(1);
    });
    it('should render 4 Rows of content', () => {
      expect(wrapper.find('.lc-purchase-goals-form__row')).to.have.length(4);
    });
    it('should only render the next and previous buttons', () => {
        expect(wrapper.find('button')).to.have.length(2);
    });
    it('should render all fields', () => {
      expect(wrapper.find('Field')).to.have.length(5);
    });
  });
});
