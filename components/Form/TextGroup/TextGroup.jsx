import React from 'react';
import PropTypes from 'prop-types';

const TextGroup = ({ label, text }) => (
  <div className="lc-text-group">
    <label className="lc-text-group__label" htmlFor>{label}</label>
    <div className="lc-text-group__text">{text}</div>
  </div>
);

TextGroup.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
};

export default TextGroup;
