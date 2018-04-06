import React from 'react';
import PropTypes from 'prop-types';

const GenericIcon = ({ icon, onClick, iconClass }) => (
  <div className={`generic-icon-component ${iconClass}`}
               onClick={onClick}>
    <img src={icon} role="presentation" />
  </div>
);

GenericIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  iconClass: PropTypes.string.isRequired
};

export default GenericIcon;
