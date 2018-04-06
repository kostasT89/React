import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router';
// Local Deps
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import AppointmentGroup from '../../components/AppointmentGroup/AppointmentGroup';
import InputGroup from '../../components/Form/InputGroup/InputGroup';
import GenericButton from '../../components/GenericButton/GenericButton';

import { monthWordAndDayFormat,
         defaultWeekdayFormat } from '../../config/properties';
import { formatMoment } from '../../utils/dateUtils';
import { required, phone, maxLength25 } from '../../utils/formValidationUtils';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
import fieldMasks from '../../constants/enums/fieldMasks';

const AppointmentForm = ({
  handleSubmit,
  onSubmit,
  pristine,
  invalid,
  submitting,
  date,
  appointments }) => (
    <Form className="lc-appointment-form" onSubmit={handleSubmit(onSubmit)}>
      {/* <!--APPOINTMENTS GROUP--> */}
      <div className="lc-column lc-column--right columns small-6">
        <h2 className="lc-column__header">
          { formatMoment(date, defaultWeekdayFormat) }
        </h2>
        <h3 className="lc-column__subheader">
          { formatMoment(date, monthWordAndDayFormat)}
        </h3>
        { isEmpty(appointments) ?
          <LoadingHexagon /> :
          <AppointmentGroup appointments={appointments} /> }
      </div>
      {/* <!--FIELDS--> */}
      <div className="lc-column columns small-12">
        {/* <!--First Name--> */}
        <div className="lc-column columns small-12 lc-appointment-form__input-group">
          <div className="lc-column lc-column--left columns medium-6">
            <Field name="firstName"
                   component={InputGroup}
                   type="text"
                   label={cms['advisorConnect.field.firstName.label']}
                   placeholder={cms['advisorConnect.field.firstName.placeholder']}
                   validate={[required, maxLength25]} />
          </div>
          {/* <!--Last Name--> */}
          <div className="lc-column lc-column--right input-field columns medium-6">
            <Field name="lastName"
                   component={InputGroup}
                   type="text"
                   label={cms['advisorConnect.field.lastName.label']}
                   placeholder={cms['advisorConnect.field.lastName.placeholder']}
                   validate={[required, maxLength25]} />
          </div>
          {/* <!--Phone--> */}
          <div className="lc-column lc-column--left columns small-12 medium-6">
            <Field name="phone"
                   component={InputGroup}
                   type="tel"
                   mask={fieldMasks.usPhone}
                   label={cms['advisorConnect.field.phone.label']}
                   placeholder={cms['advisorConnect.field.phone.placeholder']}
                   validate={[required, phone]} />
          </div>
        </div>
        {/* <!--BUTTONS--> */}
        <div className="lc-column columns small-12 lc-appointment-form__input-group">
          <div className="lc-column lc-column--left input-field columns medium-6 lc-button-container">
            <Link to={Routes.dashboard}>
              <GenericButton className="lc-appointment-form__button"
                text={cms['advisorConnect.dashboard']} />
            </Link>
          </div>
          <div className="lc-column lc-column--right input-field columns medium-6 lc-button-container">
            <GenericButton className="lc-appointment-form__button lc-appointment-form__button--submit"
              text={cms['advisorConnect.submit']}
              type="submit"
              isDisabled={invalid || pristine || submitting} />
          </div>
        </div>
      </div>
    </Form>
);

AppointmentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  appointments: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired
};

export default reduxForm({ form: 'appointmentForm' })(AppointmentForm);
