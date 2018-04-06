import React from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

const Switch = ({
  handleToggle,
  value,
  name,
}) => (
  <div
    className="switch small lc-switch lc-generic__switch"
  >
    <input
      className="switch-input"
      type="checkbox"
      id={name}
      checked={value}
      onClick={handleToggle}
    />
    <label
      className="switch-paddle"
      htmlFor={name}
    >
      <span className="show-for-sr">{value}</span>
    </label>
  </div>
);

Switch.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
Switch.defaultProps = {
  value: false,
};

export default Switch;
