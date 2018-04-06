import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { required } from '../../../utils/formValidationUtils';

const Appointment = ({ text, isActive, id, value }) => {
  const activeClass = isActive ? 'lc-appointment--active' : '';
  const valueString = value.toString ? value.toString() : value;
  return (
    <div className={`lc-appointment ${activeClass}`} >
      <Field className="lc-appointment__input"
             type="radio"
             value={valueString}
             id={id}
             name="appointment"
             component="input"
             validate={required} />
      <label className="lc-appointment__label" htmlFor={id}>
        <span className="lc-appointment__text">
          {text}
        </span>
      </label>
    </div>
  );
};

Appointment.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  isActive: PropTypes.bool,
};

export default Appointment;
