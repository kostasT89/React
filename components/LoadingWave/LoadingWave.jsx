import React from 'react';
import PropTypes from 'prop-types';

const LoadingWave = ({ optionalClassName }) =>
  (<div className={`sk-wave ${optionalClassName || ''}`}>
    <div className="sk-rect sk-rect1" />
    <div className="sk-rect sk-rect2" />
    <div className="sk-rect sk-rect3" />
    <div className="sk-rect sk-rect4" />
    <div className="sk-rect sk-rect5" />
  </div>);

LoadingWave.propTypes = {
  optionalClassName: PropTypes.string
};

export default LoadingWave;
