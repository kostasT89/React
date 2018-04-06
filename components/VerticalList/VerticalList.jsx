import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/*
* Need to import the following image here so that webpack knows to pass
* them through the image loader.
* The background image styling is handled in VerticalList.scss
*/
import circleImg from '../../assets/svg/circle.svg';

export default class VerticalList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    showBrackets: PropTypes.bool
  };

  static defaultProps = {
    showBrackets: true
  };

  static _generateBracket(extraClass) {
    return (
      <hr className={`lc-vertical-list__bracket ${extraClass}`} />
    );
  }

  _generateListItemContent(stepText, idx, array) {
    const bracket = (idx !== (array.length - 1)) &&
                    this.props.showBrackets &&
                    VerticalList._generateBracket();
    return (
      <div className="lc-vertical-list__content">
        <div className="lc-vertical-list__icon">
          <div className="lc-vertical-list-item-content">
            <div className="lc-vertical-list-item-counter"
                 style={{ backgroundImage: `url(${circleImg})` }}>
              {(idx + 1)}
            </div>
            <div className="lc-vertical-list__text">{stepText}</div>
          </div>
          {bracket}
        </div>
      </div>
    );
  }

  _generateListItem(item, idx, array) {
    const content = this._generateListItemContent(item, idx, array);

    return (
      <li className="lc-vertical-list__li"
          key={`li-key--${idx}`}>
        {content}
      </li>
    );
  }

  _generateList(itemsArray) {
    if (isEmpty(itemsArray)) { return null; }
    const list = itemsArray.map((item, idx, array) => (
      this._generateListItem(item, idx, array)
    ));
    return (
      <ol className="lc-vertical-list__ol">
        {list}
      </ol>
    );
  }

  render() {
    return (
      <div className="lc-vertical-list">
        {this._generateList(this.props.items)}
      </div>
    );
  }
}
