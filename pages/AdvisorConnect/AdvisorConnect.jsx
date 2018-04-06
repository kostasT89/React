import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import Calendar from '../../components/Calendar/Calendar';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';

import appointmentTypes from '../../constants/enums/appointmentTypes';
import durationTypes from '../../constants/enums/durationTypes';
import Routes from '../../constants/Routes';
import { enableOutsideDays,
         keepOpenOnDateSelect,
         numberOfMonths } from '../../config/calendar';
import cms from '../../config/messages';
import { dbDateFormat } from '../../config/properties';
import { getFirstOfMonth,
         getLastOfMonth,
         createUtcMoment } from '../../utils/dateUtils';
import { getAppointments } from '../../actions/global/appointments';
import { submitAppointmentsForm } from '../../actions/advisorConnect';

class AdvisorConnect extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  static _filterAppointments(appointments, date) {
    return filter(appointments, (appt) => {
      const {
        dateStart,
        isBooked,
        isVisible,
        isDisabled
      } = appt;
      const apptDate = createUtcMoment(dateStart, dbDateFormat);
      const isOnSelectedDay = date.isSame(apptDate, durationTypes.day);
      return isOnSelectedDay && !isBooked && isVisible && !isDisabled;
    });
  }

  static _generateForm({
    id,
    date,
    phone,
    lastName,
    onSubmit,
    firstName,
    appointments,
    }) {
    const initialValues = {
      id,
      phone,
      lastName,
      firstName,
    };

    return (
      <AppointmentForm date={date}
                       onSubmit={onSubmit}
                       appointments={appointments}
                       initialValues={initialValues} />
    );
  }

  static _onSubmitAppointmentForm(formValues, formDispatch) {
    const { appointment, firstName, lastName, phone, id } = formValues;
    const user = { id, firstName, lastName, phone };
    formDispatch(submitAppointmentsForm({ appointmentId: appointment, user }));
    browserHistory.push(Routes.advisorConnectSuccess);
  }

  static _waitForFormProps({
    id,
    date,
    phone,
    lastName,
    firstName,
    appointments
  }) {
    if (!isEmpty(appointments) && date) {
      const filteredAppointments = AdvisorConnect._filterAppointments(appointments, date);
      return AdvisorConnect._generateForm({
        id,
        date,
        phone,
        lastName,
        onSubmit: AdvisorConnect._onSubmitAppointmentForm,
        firstName,
        appointments: filteredAppointments
      });
    }
    return '';
  }

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const today = moment();
    const firstOfMonth = getFirstOfMonth(today);
    const lastOfMonth = getLastOfMonth(today).add(1, durationTypes.day);
    dispatch(getAppointments({
      dateStart: firstOfMonth,
      dateEnd: lastOfMonth,
      type: appointmentTypes.advisorCall
    }));
  }

  _getInitialState() {
    const { appointments } = this.props.data;
    return {
      appointments,
      date: moment(),
      focused: true
    };
  }

  _onDateChange(newDate) {
    this.setState({ date: newDate });
  }

  _onFocusChange({ focused }) {
    this.setState({ focused });
  }

  _configureCalendar({ date, focused }) {
    return {
      id: 'date_input',
      enableOutsideDays,
      date,
      focused,
      numberOfMonths,
      keepOpenOnDateSelect,
      onDateChange: ::this._onDateChange,
      onFocusChange: ::this._onFocusChange
    };
  }

  _generateCalendar({ date, focused }) {
    const calendarProps = this._configureCalendar({ date, focused });
    return (
      <Calendar {...calendarProps} />
    );
  }

  render() {
    const {
      data: {
        user: {
          id,
          phone,
          lastName,
          firstName
        },
        appointments
      }
    } = this.props;
    const { date, focused } = this.state;
    return (
      <div className="lc-advisor-connect">
        <FinancialSnapshot />
        <div className="lc-advisor-connect__content">
          <div className="lc-row row">
            <h1 className="lc-advisor-connect__header">
              {cms['advisorConnect.header']}
            </h1>
            <div className="lc-advisor-connect__sub-header">
              {cms['advisorConnect.subHeader']}
            </div>
            <div className="lc-column lc-column--left columns small-6">
              { this._generateCalendar({ date, focused }) }
            </div>
            <div className="lc-column small-12">
              { AdvisorConnect._waitForFormProps({
                id,
                date,
                phone,
                lastName,
                firstName,
                appointments })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.advisorConnect };
}

export default connect(mapStateToProps)(AdvisorConnect);
