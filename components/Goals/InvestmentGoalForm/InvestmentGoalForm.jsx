import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';
// Local Deps
import goalTypes from '../../../constants/enums/goalTypes';
import cms from '../../../config/messages';
import attrs from '../../../config/goalAttributes';
import ActionStatus from '../../../constants/enums/actionStatus';
import Routes from '../../../constants/Routes';
import reduxForms from '../../../config/reduxForms';
import { projectedRRPercentages } from '../../../config/formFieldOptions';
import fieldMasks from '../../../constants/enums/fieldMasks';
// Components
import InputGroup from '../../../components/Form/InputGroup/InputGroup';
import SelectGroup from '../../../components/Form/SelectGroup/SelectGroup';
import GenericButton from '../../../components/GenericButton/GenericButton';
// Utils
import { required } from '../../../utils/formValidationUtils';
import { populateGoalSelectionRoute } from '../../../utils/routeUtils';

const InvestmentGoalForm = ({
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
    <form className="lc-investment-goal-form" onSubmit={handleSubmit}>
      {/* <!--FIELDS--> */}
      {/* <!--Nickname--> */}
      <div className="row">
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.nickname}
                 component={InputGroup}
                 type="text"
                 className="lc-input-group--first"
                 label={cms['goals.field.nickname.label']}
                 placeholder={cms['goals.field.nickname.label']}
                 subtext={cms['goals.investmentGoal.field.nickname.subtext']}
                 subtext2={cms['goals.field.nickname.subtext2']}
                 validate={[required]} />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column lc-column--left columns small-12">
          <hr className="lc-hr--transparent-narrow" />
        </div>
        {/* <!--Current Balance--> */}
        <div className="lc-column lc-column--right columns small-10 small-offset-1">
          <Field name={attrs.balanceAtGoalStart}
                 component={InputGroup}
                 className="lc-input-group--large-inline"
                 type="number"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.balanceAtGoalStartOfInvestmentAccount.label']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 validate={[required]}
                 isDisabled />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column lc-column--left columns small-12">
          <hr className="lc-hr--transparent" />
        </div>
        {/* <!--Goal Amount--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.goalAmount}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--odd"
                 type="number"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.totalToSave.label']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 validate={[required]} />
        </div>
        {/* <!--Projected Rate of Return--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.projectedRR}
                 component={SelectGroup}
                 className="lc-select-group--large-inline"
                 options={projectedRRPercentages}
                 label={cms['goals.field.projectedRR.label']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 validate={[required]} />
        </div>
        {/* <!--Time Until Funds Are Needed--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1 lc-column--margin-bottom">
          <Field name={attrs.desiredTermInYears}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--odd"
                 type="text"
                 mask={fieldMasks.years}
                 label={cms['goals.field.timeUntilNeeded.label']}
                 onChangeCB={node => onFieldChange(node, change, connectedValues)}
                 validate={[required]} />
        </div>
        {/* <!--DIVIDER--> */}
        <div className="lc-column columns small-12">
          <hr className="lc-hr" />
        </div>
        {/* <!--Monthly Savings Required--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
          <Field name={attrs.desiredPaymentPerMonth}
                 component={InputGroup}
                 className="lc-input-group--large-inline lc-input-group--bold lc-input-group--odd"
                 type="text"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.paymentPerMonth.label']}
                 isDisabled />
        </div>
        {/* <!--Remaining Monthly PerEx--> */}
        <div className="lc-column lc-column--left columns small-10 small-offset-1">
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
            <Link to={populateGoalSelectionRoute(goalTypes.investment)} >
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

InvestmentGoalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired, // redux form
  connectedValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired, // supplied by ReduxForm
  isSubmitting: PropTypes.bool.isRequired, // us
  actionStatus: PropTypes.string
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const DecoratedForm = reduxForm({
  form: reduxForms.investmentGoalForm  // a unique identifier for this form
})(InvestmentGoalForm);

// Decorate with connect to read form values
const selector = formValueSelector(reduxForms.investmentGoalForm);
const ConnectedForm = connect((state) => {
  const connectedValues = selector(state,
    attrs.balanceAtGoalStart,
    attrs.goalAmount,
    attrs.projectedRR,
    attrs.desiredTermInYears
  );
  return { connectedValues };
})(DecoratedForm);

export default ConnectedForm;
