// Global Deps:
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import startCase from 'lodash/startCase';
// Local Deps:
import { NUMBER_ZERO, EMPTY_STRING } from '../../config/properties';
import cms from '../../config/messages';
import { formatCurrency } from '../../utils/stringUtils';
// Components:
import FontAwesomeIcon from '../../components/FontAwesomeIcon/FontAwesomeIcon';

const GoalCard = ({
  monthlyAmount,
  actualAmount,
  type,
  nickname
}) => {
  const formattedType = type ? startCase(type) : EMPTY_STRING;
  const formattedNickname = startCase(nickname);
  const amountSavedThisMonth = actualAmount - monthlyAmount;
  return (
    <div className={cx(
      `lc-goal-card lc-goal-card--${type}`, {
        'lc-goal-card--green': amountSavedThisMonth > NUMBER_ZERO,
        'lc-goal-card--red': amountSavedThisMonth < NUMBER_ZERO
      })}>
      <div className="lc-column lc-column--left columns small-6">
        <div className="lc-goal-card__text--currency">
          {formatCurrency(monthlyAmount)}
        </div>
        <div className="lc-goal-card__text lc-goal-card__text--small">
          {cms['goalCard.monthlyAmount']}
        </div>
      </div>
      <div className="lc-column lc-column--right columns small-6">
        <div className="lc-goal-card__text">
          {cms['goalCard.actualAmount']()}
        </div>
        <div className="lc-goal-card__text--currency lc-goal-card__text--small">
          <FontAwesomeIcon icon="arrow-up" />
          <FontAwesomeIcon icon="arrow-down" />
          {formatCurrency(Math.abs(amountSavedThisMonth))}
        </div>
      </div>
      <div className="lc-column columns small-12">
        <div className="lc-goal-card__footer">
          {cms['goalCard.footer.text'](formattedType, formattedNickname)}
        </div>
      </div>
    </div>
  );
};

GoalCard.propTypes = {
  monthlyAmount: PropTypes.number.isRequired,
  actualAmount: PropTypes.number.isRequired,
  type: PropTypes.string,
  nickname: PropTypes.string
};

export default GoalCard;
