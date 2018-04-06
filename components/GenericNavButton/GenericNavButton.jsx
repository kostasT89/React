import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './GenericNavButton.scss';

const GenericNavButton = ({
  route,
  text,
  className,
  isDisabled = false,
}) => (
  <Link to={route}>
    <button className={`lc-nav-button lc-button ${className}`}
            disabled={isDisabled}
            type="button"><div>{text}</div></button>
  </Link>
);

GenericNavButton.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default GenericNavButton;
