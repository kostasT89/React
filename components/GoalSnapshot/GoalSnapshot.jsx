import React from 'react';
import PropTypes from 'prop-types';
import {
        PieChart,
        Pie,
        Cell
      } from 'recharts';
import clx from 'classnames';
import config from '../../config/goalSnapshot';
import { formatCurrency } from '../../utils/stringUtils';

const GoalSnapshot = ({
  data,
  message,
  amount,
  className = ''
}) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    isAnimationActive,
    fill,
    startAngle,
    endAngle,
    minAngle
  } = config;

  const pieProps = {
    data,
    dataKey: 'value',
    cx,
    cy,
    innerRadius,
    outerRadius,
    isAnimationActive,
    fill,
    startAngle,
    endAngle,
    minAngle
  };
  return (
    <div className={`lc-goal-snapshot ${className}`}>
      <div className="lc-goal-snapshot__content">
        <PieChart className="lc-goal-snapshot__pie-chart"
                  width={config.width}
                  height={config.height}>
          <Pie className="lc-goal-snapshot__pie" {...pieProps} >
            {
              data.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill} />
              ))
            }
          </Pie>
        </PieChart>
        <div className="lc-goal-snapshot__text-container">
          <div className={clx('lc-goal-snapshot__header', { 'lc-red-text': amount < 0 })}>
            {formatCurrency(amount)}
          </div>
          <div className="lc-goal-snapshot__text">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

GoalSnapshot.propTypes = {
  data: PropTypes.array.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default GoalSnapshot;
