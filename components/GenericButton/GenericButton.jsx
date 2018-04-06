import React from 'react';
import PropTypes from 'prop-types';
import './GenericButton.scss';

const GenericButton = ({
  text,
  type = 'button',
  isDisabled = false,
  onClick = undefined,
  className = ''
}) => (
  <button className={`lc-generic-button lc-button ${className}`}
          onClick={onClick}
          disabled={isDisabled}
          type={type}>
    {text}
  </button>
);

GenericButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default GenericButton;
