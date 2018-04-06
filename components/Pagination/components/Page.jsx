import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Page extends Component {
    static propTypes = {
      pageText: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element,
          PropTypes.number
      ]),
      pageNumber: PropTypes.number.isRequired,
      onClick: PropTypes.func.isRequired,
      isActive: PropTypes.bool.isRequired,
      isDisabled: PropTypes.bool,
      className: PropTypes.string
    }

    static defaultProps = {
      disabledClass: 'disabled',
      isActive: false,
      isDisabled: false
    }

    handleClick(e) {
      const { isDisabled, pageNumber, onClick } = this.props;
      e.preventDefault();
      if (isDisabled) return;
      onClick(pageNumber);
    }

    render() {
      const {
        pageText,
        isActive,
        isDisabled,
        className
      } = this.props;

      const stateCss = cx({
        'lc-page--active': isActive,
        'lc-page--disabled': isDisabled
      });

      return (
        <li className={`lc-page ${className} ${stateCss}`}
            onClick={::this.handleClick}>
          { pageText }
        </li>
      );
    }
}
