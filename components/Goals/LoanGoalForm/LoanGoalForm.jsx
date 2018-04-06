import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import cms from '../../../config/messages';
import attrs from '../../../config/goalAttributes';
import reduxForms from '../../../config/reduxForms';
import fieldMasks from '../../../constants/enums/fieldMasks';
import goalTypes from '../../../constants/enums/goalTypes';
import ActionStatus from '../../../constants/enums/actionStatus';
import Routes from '../../../constants/Routes';
// Components
import InputGroup from '../../../components/Form/InputGroup/InputGroup';
import RepaymentMethodFields from '../../../components/Goals/RepaymentMethodFields/RepaymentMethodFields';
import GenericButton from '../../../components/GenericButton/GenericButton';
// Utils:
import { required, dollarAmount } from '../../../utils/formValidationUtils';
import { populateGoalSelectionRoute } from '../../../utils/routeUtils';
import { determineRepaymentFieldErrors } from '../../../utils/goalUtils';

class LoanGoalForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    repaymentMethod: PropTypes.string.isRequired,
    onRepaymentMethodClick: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired, // Supplied by ReduxForm
    connectedValues: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    actionStatus: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    const {
      connectedValues,
      change,
      onMount
    } = this.props;
    if (isEmpty(connectedValues) && !isEmpty(nextProps.connectedValues)) {
      onMount(nextProps.connectedValues, change);
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
      submitting, // redux form
      repaymentMethod,
      onRepaymentMethodClick,
      change,
      connectedValues,
      onFieldChange,
      isSubmitting, // us
      actionStatus
    } = this.props;

    const {
      remainingTermInMonths,
      minimumPayment,
      desiredPaymentPerMonth,
      desiredTermInMonths
    } = connectedValues;

    const formIsDisabled = invalid || pristine || submitting || isSubmitting;

    // Determine repayment field errors
    const errors = determineRepaymentFieldErrors({
      minimumPayment,
      remainingTermInMonths,
      desiredPaymentPerMonth,
      desiredTermInMonths
    });

    return (
      <form className="lc-loan-goal-form" onSubmit={handleSubmit}>
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
                   subtext={cms['goals.loanGoal.field.nickname.subtext']}
                   subtext2={cms['goals.field.nickname.subtext2']}
                   validate={[required]} />
          </div>
          {/* <!--HEADING--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <h3 className="lc-loan-goal-form__h3">{cms['goals.currentPaymentStructure']}</h3>
          </div>
          {/* <!--Current Balance--> */}
          <div className="lc-column lc-column--right columns small-10 small-offset-1">
            <Field name={attrs.balanceAtGoalStart}
              component={InputGroup}
              className="lc-input-group--large-inline"
              type="number"
              mask={fieldMasks.currency}
              label={cms['goals.field.balanceAtGoalStartOfLoan.label']}
              validate={[required, dollarAmount]}
              onChangeCB={node => onFieldChange(node, change, connectedValues)}
              isDisabled />
          </div>
          {/* <!--Remaining Term--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <Field name={attrs.remainingTermInMonths}
              component={InputGroup}
              className="lc-input-group--large-inline lc-input-group--odd"
              type="number"
              mask={fieldMasks.months}
              label={cms['goals.field.remainingTermOfLoan.label']}
              onChangeCB={node => onFieldChange(node, change, connectedValues)}
              validate={[required]} />
          </div>
          {/* <!--Interest Rate--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <Field name={attrs.interestRate}
              component={InputGroup}
              className="lc-input-group--large-inline"
              type="number"
              mask={fieldMasks.decimalPercentage}
              subtext={cms['goals.field.interestRate.subtext']}
              label={cms['goals.field.interestRate.label']}
              onChangeCB={node => onFieldChange(node, change, connectedValues)}
              validate={[required]} />
          </div>
          {/* <!--DIVIDER--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <hr className="lc-hr--transparent" />
          </div>
          {/* <!--Minimum Payment--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <Field name={attrs.minimumPayment}
              component={InputGroup}
              className="lc-input-group--large-inline lc-input-group--odd"
              type="number"
              mask={fieldMasks.currency}
              subtext={cms['goals.field.minimumPayment.subtext']}
              label={cms['goals.field.minimumPayment.label']}
              onChangeCB={node => onFieldChange(node, change, connectedValues)}
              validate={[required]} />
          </div>
          {/* <!--Total Remaining Interest--> */}
          <div className="lc-column lc-column--left columns small-10 small-offset-1">
            <Field name={attrs.remainingTotalInterest}
                   component={InputGroup}
                   className={'lc-input-group--large-inline lc-input-group--odd ' +
                      'lc-input-group--red'}
                   type="text"
                   mask={fieldMasks.currency}
                   label={cms['goals.field.remainingInterest.label']}
                   validate={[required, dollarAmount]}
                   isDisabled />
          </div>
          {/* <!--REPAYMENT METHOD FIELDS--> */}
          <RepaymentMethodFields repaymentMethod={repaymentMethod}
                                 onRepaymentMethodClick={onRepaymentMethodClick}
                                 onFieldChange={onFieldChange}
                                 change={change}
                                 connectedValues={connectedValues}
                                 header={cms['goals.field.loanRepaymentSelection.label']}
                                 {...errors} />
          {/* <!--BUTTONS--> */}
          <div className="lc-column lc-column--buttons columns small-10 small-offset-1">
            {actionStatus !== ActionStatus.edit ?
              <Link to={populateGoalSelectionRoute(goalTypes.loan)} >
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
  }
}

const DecoratedForm = reduxForm({
  form: reduxForms.loanGoalForm
})(LoanGoalForm);


const selector = formValueSelector(reduxForms.loanGoalForm);
const ConnectedForm = connect((state) => {
  const connectedValues = selector(state,
    attrs.originalBalance,
    attrs.termInMonths,
    attrs.interestRate,
    attrs.minimumPayment,
    attrs.balanceAtGoalStart,
    attrs.remainingTermInMonths,
    attrs.desiredTermInMonths,
    attrs.desiredPaymentPerMonth
  );
  return { connectedValues };
})(DecoratedForm);

export default ConnectedForm;
