import React from 'react';
import PropTypes from 'prop-types';
// Local Deps
import { roundPercentageNumber } from '../../utils/mathUtils';

const ProgressBar = ({ progressPercent, meterContent, remainingContent }) => {
  const progressPct = roundPercentageNumber(progressPercent);
  return (
    <div className="lc-progress-bar progress"
         role="progressbar"
         tabIndex="0"
         aria-valuemin="0"
         aria-valuetext={`${progressPct} percent`}
         aria-valuemax="100">
      <span className="lc-progress-bar__meter progress-meter"
            style={{ width: `${progressPct}%` }} >
        <p className="lc-progress-bar__meter-text progress-meter-text lc-progress-bar__meter-text--fixed">{meterContent}</p>
      </span>
      <div className="lc-progress-bar__remaining-container">
        <p className="lc-progress-bar__remaining-text">
          {remainingContent}
        </p>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  meterContent: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array
  ]),
  remainingContent: PropTypes.any,
  progressPercent: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ])
};

export default ProgressBar;
