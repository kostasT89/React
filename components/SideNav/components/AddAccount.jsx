import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class AddAccount extends Component {

  static _generateContent(text) {
    return (
      <div className="add-account-component">
        <div className="add-account-title">{text}</div>
        <div className="add-account-wrapper">+</div>
      </div>
    );
  }

  render() {
    const { text, linkTo, handleClick } = this.props;
    const { _generateContent } = AddAccount;

    return (
      linkTo ?
        <Link to={linkTo}>
          { _generateContent(text) }
        </Link>
      :
        <a onClick={handleClick}>
          { _generateContent(text) }
        </a>
    );
  }
}

AddAccount.propTypes = {
  linkTo: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default AddAccount;
