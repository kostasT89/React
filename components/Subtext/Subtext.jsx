/* eslint no-nested-ternary:0 */
import React from 'react';
import PropTypes from 'prop-types';
import './Subtext.scss';

const Subtext = ({ text, subtextClassName }) => (
  <div className={`subtext-component ${subtextClassName}`}>
    {text}
  </div>
);

Subtext.propTypes = {
  text: PropTypes.string.isRequired,
  subtextClassName: PropTypes.string.isRequired
};

export default Subtext;
