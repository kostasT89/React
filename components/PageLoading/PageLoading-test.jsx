import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import PageLoading from './PageLoading';

describe('Components', () => {
  describe('PageLoading', () => {
    it('should render a page loading animation', () => {
      const wrapper = shallow(<PageLoading />);
        expect(wrapper.find('.page-loading-component')).to.have.length(1);
    });
  });
});
