import React from 'react';
import PropTypes from 'prop-types';
import './GenericError.scss';

const GenericError = ({ message, className }) => (
  <div className={`generic-error-component ${className || ''}`}>
    {message}
  </div>
  );


GenericError.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default GenericError;
