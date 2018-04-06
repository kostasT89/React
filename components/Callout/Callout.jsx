import React from 'react';
import PropTypes from 'prop-types';

const Callout = ({ title, message, onClick, calloutType }) => (
  <div className={
    `callout-component animated fadeInDown callout ${calloutType} text-center`}>
    <div className="callout-title">{title}</div>
    <div className="exit-callout fa fa-times"
         onClick={onClick} />
    <div className="callout-message">
      {message}
    </div>
  </div>);

Callout.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  calloutType: PropTypes.string.isRequired
};

export default Callout;
