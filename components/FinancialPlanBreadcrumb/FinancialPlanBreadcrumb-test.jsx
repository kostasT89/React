/*eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FinancialPlanBreadcrumb from './FinancialPlanBreadcrumb';

// TODO: Implement this

describe('Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FinancialPlanBreadcrumb />);
  });
  describe('FinancialPlanBreadcrumb', () => {
    xit('should render a breadcrumb component for the fin plan', () => {
      expect(wrapper.find('.callout-component')).to.have.length(1);
    });
  });
});
