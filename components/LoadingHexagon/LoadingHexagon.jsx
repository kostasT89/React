import React from 'react';
import PropTypes from 'prop-types';
// Local Deps:
import { EMPTY_STRING } from '../../config/properties';

const LoadingHexagon = ({ text = EMPTY_STRING }) => (
  <div className="lc-loading-hexagon">
    <div className="preloader loading">
      <span className="slice" />
      <span className="slice" />
      <span className="slice" />
      <span className="slice" />
      <span className="slice" />
      <span className="slice" />
    </div>
    <div className="lc-loading-hexagon__text">
      {text}
    </div>
  </div>
);

LoadingHexagon.propTypes = {
  text: PropTypes.string
};

export default LoadingHexagon;
