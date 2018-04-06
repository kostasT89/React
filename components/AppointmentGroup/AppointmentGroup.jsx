import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Appointment from './Appointment/Appointment';

import { defaultTimeFormat } from '../../config/properties';
import { convertDateFromDbToLocalFormat } from '../../utils/dateUtils';

export default class AppointmentGroup extends Component {

  static propTypes = {
    appointments: PropTypes.array.isRequired,
    dateFormat: PropTypes.string
  };

  static defaultProps = {
    dateFormat: defaultTimeFormat
  };

  static _generateAppointments(appointments, dateFormat) {
   return appointments.map((appt, idx) => {
     const { dateStart, dateEnd, id } = appt;
     const start = convertDateFromDbToLocalFormat(dateStart, dateFormat);
     const end = convertDateFromDbToLocalFormat(dateEnd, dateFormat);
     const text = `${start} - ${end}`;
     const htmlId = `appointment${idx}`;
     return (<Appointment key={idx}
                          text={text}
                          id={htmlId}
                          value={id} />);
   });
  }


  render() {
    const { appointments, dateFormat } = this.props;
    return (
      <div className="lc-appointment-group">
        { AppointmentGroup._generateAppointments(appointments, dateFormat) }
      </div>
    );
  }
}
