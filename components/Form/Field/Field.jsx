import React from 'react';
import PropTypes from 'prop-types';
import './Field.scss';

const renderIcon = (icon) => {
  if (!icon) { return; }
  return (
    <i className={`lc-field__icon fa ${icon}`} />
  );
};

const renderInput = (
  type,
  name,
  className,
  isRequired,
  isFocused,
  isDisabled = false,
  value,
  placeholder,
  onChange,
) => {
  const inputType = type || 'text';
  const inputRequired = isRequired || false;
  const inputFocused = isFocused || false;
  const inputClass = className || '';

  return (
    <input type={inputType}
           name={name}
           className={`lc-field__input ${inputClass}`}
           required={inputRequired}
           autoFocus={inputFocused}
           value={value}
           placeholder={placeholder}
           onChange={onChange}
           disabled={isDisabled} />
  );
};

const Field = ({
  icon,
  type,
  name,
  className,
  isRequired,
  isFocused,
  isDisabled,
  value,
  placeholder,
  onChange
}) => (
  <div className="lc-field">
    {renderIcon(icon)}
    {renderInput(
      type,
      name,
      className,
      isRequired,
      isFocused,
      isDisabled,
      value,
      placeholder,
      onChange)}
  </div>
);

Field.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  isFocused: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Field;
