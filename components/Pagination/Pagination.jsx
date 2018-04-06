import React, { Component } from 'react';
import PropTypes from 'prop-types';
import paginator from 'paginator';
import range from 'ramda/src/range';

import {
  defaultPaginationPage,
  defaultPageRangeDisplayed,
  defaultPaginationCount
} from '../../config/properties';
import Page from './components/Page';

export default class Pagination extends Component {
  static propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    showDisabled: PropTypes.bool,
    prevPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    nextPageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    innerClass: PropTypes.string,
    activeClass: PropTypes.string,
  }

  static defaultProps = {
    itemsCountPerPage: defaultPaginationCount,
    pageRangeDisplayed: defaultPageRangeDisplayed,
    activePage: defaultPaginationPage,
    prevPageText: 'Prev',
    nextPageText: 'Next',
    innerClass: 'pagination',
    showDisabled: false
  }

  buildPages() {
    let pages = [];
    const {
        itemsCountPerPage,
        pageRangeDisplayed,
        activePage,
        prevPageText,
        nextPageText,
        totalItemsCount,
        onChange,
        activeClass,
        showDisabled
    } = this.props;

    const paginationInfo = new paginator(itemsCountPerPage, pageRangeDisplayed)
        .build(totalItemsCount, activePage);

    if (paginationInfo.first_page !== paginationInfo.last_page) {
      pages = range(paginationInfo.first_page, paginationInfo.last_page + 1).map((page, idx) => (
        <Page
          className={`lc-page--${idx}`}
          isActive={page === activePage}
          key={idx}
          pageNumber={page}
          pageText={page}
          onClick={onChange}
          activeClass={activeClass}
        />
      ));
    }

    if (showDisabled || paginationInfo.has_previous_page) {
      pages.unshift(
        <Page
          className="lc-page--prev"
          key={`prev${paginationInfo.previous_page}`}
          pageNumber={paginationInfo.previous_page}
          onClick={onChange}
          pageText={prevPageText}
          isDisabled={!paginationInfo.has_previous_page}
        />
      );
    }

    if (showDisabled || paginationInfo.has_next_page) {
      pages.push(
        <Page
          className="lc-page--next"
          key={`next${paginationInfo.next_page}`}
          pageNumber={paginationInfo.next_page}
          onClick={onChange}
          pageText={nextPageText}
          isDisabled={!paginationInfo.has_next_page}
        />
      );
    }

    return pages;
  }

  render() {
    const pages = this.buildPages();
    return (
      <div className="lc-pagination">
        <ul className={`lc-pagination__list ${this.props.innerClass}`}>{pages}</ul>
      </div>
    );
  }
}
