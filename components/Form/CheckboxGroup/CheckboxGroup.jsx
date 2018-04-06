import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
// { id, label, checked, onClick, onChange }
const CheckboxGroup = ({
  name,
  label,
  onClick,
  value,
}) => (
  <div className="lc-checkbox-group pretty primary"
       onClick={() => onClick()}>
    <Field className="lc-checkbox-group__input"
       name={name}
       component="input"
       type="checkbox"
       defaultChecked={value}
       id={name} />
    <label className="lc-checkbox-group__label" htmlFor={name}>
      <i className="lc-checkbox-group__icon fa fa-check" />
      <span className="lc-checkbox-group__text">{label}</span>
    </label>
  </div>
);

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.bool.isRequired
};

export default CheckboxGroup;
