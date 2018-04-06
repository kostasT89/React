import React from 'react';
import PropTypes from 'prop-types';
import './LookupButton.scss';

const data = 'data';

const LookupButton = ({ onClick, lookupKey, optionalClassName }) =>
  (<div className={`lookup-button-component inline fa fa-ellipsis-h ${optionalClassName || ''}`} // eslint-disable-line jsx-a11y/no-static-element-interactions
        onClick={() => { onClick(data, lookupKey); }} />);

LookupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  lookupKey: PropTypes.string.isRequired,
  optionalClassName: PropTypes.string,
};

export default LookupButton;
