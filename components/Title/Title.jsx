/* eslint no-nested-ternary:0 */
import React from 'react';
import PropTypes from 'prop-types';
import './Title.scss';

const Title = ({ title, titleClassName }) => (
  <div className={`title-component ${titleClassName}`}>
    {title}
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string.isRequired
};

export default Title;
