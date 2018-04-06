import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import cms from '../../config/messages';
import {
          CURRENCY_ZERO,
          NUMBER_ZERO
        } from '../../config/properties';
import { formatCurrency } from '../../utils/stringUtils';

// Constants
const AMOUNT = cms['progressBarGroup.amountText'];
const REMAINING = cms['progressBarGroup.remainderAmount'];

export default class ProgressBarGroup extends Component {

  static propTypes = {
    total: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    meterAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    labelAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    label: PropTypes.string,
    remainderText: PropTypes.string,
    className: PropTypes.string,
    amountTextChange: PropTypes.string
  };

  static _generateProgressBarLabel(label, amount = CURRENCY_ZERO) {
    const formattedAmount = formatCurrency(amount);
    return (
      <div className="lc-progress-bar-group__label">
        <span className="lc-progress-bar-group__label-text">{`${label}:`}</span>
        <span className="lc-progress-bar-group__label-amount">{`${formattedAmount}`}</span>
      </div>
    );
  }

  static _generateProgressBar(
    total = NUMBER_ZERO,
    meterAmount = NUMBER_ZERO,
    remainderText = REMAINING,
    amountTextChange
  ) {
    const progress = meterAmount > NUMBER_ZERO ? meterAmount : NUMBER_ZERO;
    const formattedMeterAmount = formatCurrency(meterAmount);
    const remainingAmount = (total - progress) > formatCurrency(NUMBER_ZERO)
      ? formatCurrency((total - progress)) : formatCurrency(NUMBER_ZERO);
    const progressPercent = (progress / total) * 100;

    // Content arrays allow us to pass in some html as a prop:
    const meterContent = [
      <span key="meter-key">{`${amountTextChange || AMOUNT}:`}</span>,
      `${formattedMeterAmount}`
    ];
    const remainingContent = [
      <span key="content-key">{`${remainderText}:`}</span>,
      `${formatCurrency(remainingAmount)}`
    ];

    return (
      <ProgressBar meterContent={meterContent}
                   remainingContent={remainingContent}
                   progressPercent={progressPercent} />
    );
  }

  render() {
    const {
      total,
      meterAmount,
      labelAmount,
      label,
      remainderText,
      className = '',
      amountTextChange
    } = this.props;

    const {
      _generateProgressBar,
      _generateProgressBarLabel
    } = ProgressBarGroup;

    return (
      <div className={`lc-progress-bar-group ${className}`}>
        {_generateProgressBarLabel(label, labelAmount)}
        {_generateProgressBar(total, meterAmount, remainderText, amountTextChange)}
      </div>
    );
  }
}
