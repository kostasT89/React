/* eslint-disable no-unused-expressions */

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Pagination from './Pagination';

describe('Components', () => {
  describe('Pagination', () => {
  const props = {
    pageRangeDisplayed: 5,
    totalItemsCount: 20,
    showDisabled: true,
    onClick: () => {},
    onChange: () => {}
  };

    it('renders a UL tag', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('ul')).to.have.length(1);
    });

    it('renders the appropriate amount of Pages', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('Page')).to.have.length(2);
    });

    it('renders the next page link', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('.lc-page--next').node.innerText).to.eql(wrapper.prop('nextPageText'));
    });

    it('renders the prev page link if there is one', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('.lc-page--prev').node.innerText).to.eql(wrapper.prop('prevPageText'));
    });

    it('renders class in UL tag', () => {
      const wrapper = mount(<Pagination {...props} innerClass="pagination list-inline center-block text-center" />);
      expect(wrapper.find('ul').hasClass('pagination')).to.be.true;
      expect(wrapper.find('ul').hasClass('list-inline')).to.be.true;
      expect(wrapper.find('ul').hasClass('center-block')).to.be.true;
      expect(wrapper.find('ul').hasClass('text-center')).to.be.true;
    });
  });
});
