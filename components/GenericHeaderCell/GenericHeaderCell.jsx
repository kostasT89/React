import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import { sortTypes } from '../../config/properties';

import './GenericHeaderCell.scss';

const icons = {
  up: 'chevron-down',
  down: 'chevron-up'
};

export default class GenericHeaderCell extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    header: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    mapping: PropTypes.string,
    isSortable: PropTypes.bool
  };

  static defaultProps = {
    isSortable: true
  };

  static _reverseSortDirection(sortDir) {
    return sortDir === sortTypes.desc ? sortTypes.asc : sortTypes.desc;
  }

  constructor(props) {
    super(props);
    this.state = { sortDir: sortTypes.asc };
  }

  _onClick() {
    const { onClick, mapping } = this.props;
    const { sortDir } = this.state;
    const newSortDirection = GenericHeaderCell._reverseSortDirection(sortDir);
    if (onClick) onClick(mapping, newSortDirection);
    this.setState({ sortDir: newSortDirection });
  }

  render() {
    const {
      header,
      isActive,
      isSortable
    } = this.props;
    const isSelected = isActive || false;
    const activeClass = isSelected ? 'lc-generic-header__content--active' : '';
    const sortIcon = this.state.sortDir === sortTypes.desc ? icons.down : icons.up;
    const headerCellConfig = isSortable && { onClick: ::this._onClick };
    return (
      <div className={`lc-generic-header-cell ${isSortable && 'lc-generic-header-cell--isClickable'}`}
           {...headerCellConfig}>
        <div className={`content-wrapper lc-generic-header-cell__content ${activeClass}`}>
          {`${startCase(header)}`}
        </div>
        { header && isSortable && <span className="lc-generic-header-cell__icon">
          <i className={`fa fa-${sortIcon}`} aria-hidden="true" />
          </span> }
      </div>
    );
  }
}
