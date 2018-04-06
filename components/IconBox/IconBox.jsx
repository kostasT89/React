import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import assets referenced in IconBox.scss:
import '../../assets/svg/oval.svg';

const IconBox = ({ button, text, image, optionalClassName }) => (
  <div className={`lc-icon-box ${optionalClassName || ''}`}>
    <div className="lc-icon-box__content">
      <img className="lc-icon-box__image" src={image} role="presentation" />
    </div>
    {button && <Link to={button.route} className="lc-icon-box__link">
      <button className="lc-icon-box__button">
        {button.text}
      </button>
    </Link>}
    {text && <div className="lc-icon-box__text">
      {text}
    </div>}
  </div>
);

IconBox.propTypes = {
  button: PropTypes.shape({
    text: PropTypes.string,
    route: PropTypes.string
  }),
  text: PropTypes.string,
  image: PropTypes.string,
  optionalClassName: PropTypes.string
};

export default IconBox;
