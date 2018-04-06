import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatStringForDisplay } from '../../utils/stringUtils';

export default class DataSummary extends Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      type: PropTypes.string,
      inputDateFormat: PropTypes.string,
      outputDateFormat: PropTypes.string
    })).isRequired
  };

  static _generateColumns(columnData) {
    return columnData.map((col, idx) => {
      if (!col.value && col.value !== 0) { return ''; }
      // Format Value
      const value = formatStringForDisplay({
        value: col.value,
        type: col.type,
        inputDateFormat: col.inputDateFormat,
        outputDateFormat: col.outputDateFormat
      });
      /*
      * If value can be cast to a number, then it can have three states:
      *   greater than zero
      *   less than zero
      *   equal to zero
      * We assume equal to zero is the default styled state and providerName
      * classes for the other two states.
      */
      let isGreaterThanZero = false;
      let isLessThanZero = false;
      if (Number(col.value)) {
        isGreaterThanZero = col.value > 0;
        isLessThanZero = col.value < 0;
      }

      return (
        <div className={'lc-data-summary__col lc-column'}
             key={idx}>
          <div className="lc-data-summary__col-text">
            {col.text}
          </div>
          <div className={`lc-data-summary__col-value
            ${isGreaterThanZero && 'lc-data-summary__col-value--greater-than-zero'}
            ${isLessThanZero && 'lc-data-summary__col-value--less-than-zero'}`}>
            {value}
          </div>
        </div>
      );
    });
  }

  render() {
    const { _generateColumns } = DataSummary;
    const { data } = this.props;
    return (
      <div className="lc-data-summary">
        <div className="lc-data-summary__container lc-row row">
          { _generateColumns(data) }
        </div>
      </div>
    );
  }
}
