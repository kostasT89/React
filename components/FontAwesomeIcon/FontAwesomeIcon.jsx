import React from 'react';
import PropTypes from 'prop-types';

const FontAwesomeIcon = ({ icon, onClick = () => {}, optionalClassName }) => (
  <i onClick={onClick}
     className={`lc-fa-icon fa fa-${icon} ${optionalClassName}`} />
);

FontAwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  optionalClassName: PropTypes.string,
};

FontAwesomeIcon.defaultProps = {
  optionalClassName: ''
};

export default FontAwesomeIcon;
