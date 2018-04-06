import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';
// Local Deps
import cms from '../../../config/messages';
import attrs from '../../../config/goalAttributes';
import reduxForms from '../../../config/reduxForms';
import goalTypes from '../../../constants/enums/goalTypes';
import fieldMasks from '../../../constants/enums/fieldMasks';
import ActionStatus from '../../../constants/enums/actionStatus';
import Routes from '../../../constants/Routes';
// Components
import InputGroup from '../../../components/Form/InputGroup/InputGroup';
import GenericButton from '../../../components/GenericButton/GenericButton';
// Utils
import { required } from '../../../utils/formValidationUtils';
import { populateGoalSelectionRoute } from '../../../utils/routeUtils';

const SavingsGoalForm = ({
  handleSubmit,
  pristine,
  invalid,
  submitting,
  change,
  connectedValues,
  onFieldChange,
  isSubmitting,
  actionStatus
}) => {
  const formIsDisabled = invalid || pristine || submitting || isSubmitting;
  return (
    <form className="lc-savings-goal-form" onSubmit={handleSubmit}>
      {/* <!--FIELDS--> */}
      <div className="row">
        {/* <!--Nickname--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.nickname}
                 component={InputGroup}
                 type="text"
                 className="lc-input-group--first"
                 label={cms['goals.field.nickname.label']}
                 placeholder={cms['goals.field.nickname.label']}
                 subtext={cms['goals.savingsGoal.field.nickname.subtext']}
                 subtext2={cms['goals.field.nickname.subtext2']}
                 validate={[required]} />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <hr className="lc-hr--transparent-narrow" />
        </div>
        {/* <!--Current Balance--> */}
        <div className="lc-column lc-column--right columns small-10 small-offset-1">
          <Field name={attrs.balanceAtGoalStart}
                 component={InputGroup}
                 className="lc-input-group--large-inline"
                 type="number"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.balanceAtGoalStart.label']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 validate={[required]}
                 isDisabled />
        </div>
        {/* <!--Interest Rate--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.interestRate}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--odd"
                 type="number"
                 mask={fieldMasks.decimalPercentage}
                 subtext={cms['goals.field.interestRate.subtext']}
                 label={cms['goals.field.interestRate.label']}
                 validate={[required]}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)} />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <hr className="lc-hr--transparent" />
        </div>
        {/* <!--Amount Needed To Meet Goal--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.goalAmount}
                 component={InputGroup}
                 className="lc-input-group--large-inline"
                 type="number"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.amountNeeded.label']}
                 validate={[required]}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)} />
        </div>
        {/* <!--Time Until Funds Are Needed--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1 lc-column--margin-bottom">
          <Field name={attrs.desiredTermInMonths}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--odd"
                 type="text"
                 mask={fieldMasks.months}
                 label={cms['goals.field.timeNeeded.label']}
                 validate={[required]}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)} />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column columns small-12">
          <hr className="lc-hr" />
        </div>
        {/* <!--Monthly Savings Required--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1 ">
          <Field name={attrs.desiredPaymentPerMonth}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--bold"
                 type="text"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.paymentPerMonth.label']}
                 isDisabled />
        </div>
        {/* <!--Remaining Monthly PerEx--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1 ">
          <Field name={attrs.remainingPerExPerMonth}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--bold lc-input-group--last"
                 type="text"
                 mask={{
                   positive: fieldMasks.currency,
                   negative: fieldMasks.negativeCurrency
                 }}
                 label={cms['goals.field.remainingPerExPerMonth.label']}
                 subtext={cms['goals.field.remainingPerExPerMonth.subtext']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 isDisabled />
        </div>
        {/* <!--BUTTONS--> */}
        <div className="lc-column lc-column--buttons columns small-10 small-offset-1">
          {actionStatus !== ActionStatus.edit ?
            <Link to={populateGoalSelectionRoute(goalTypes.savings)} >
              <GenericButton text={cms['button.previous']} />
            </Link>
            :
            <Link to={Routes.dashboard} >
              <GenericButton text={cms['button.cancel']} />
            </Link>
          }
          <GenericButton className="lc-button--blue lc-button--right"
                         text={cms['goals.button.submit']}
                         isDisabled={formIsDisabled}
                         type="submit" />
        </div>
      </div>
    </form>
  );
};

SavingsGoalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired, // redux form
  connectedValues: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired, // us
  actionStatus: PropTypes.string
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const DecoratedForm = reduxForm({
  form: reduxForms.savingsGoalForm  // a unique identifier for this form
})(SavingsGoalForm);

// Decorate with connect to read form values
const selector = formValueSelector(reduxForms.savingsGoalForm);
const ConnectedForm = connect((state) => {
  const connectedValues = selector(state,
    attrs.interestRate,
    attrs.balanceAtGoalStart,
    attrs.goalAmount,
    attrs.desiredTermInMonths
  );
  return { connectedValues };
})(DecoratedForm);

export default ConnectedForm;
