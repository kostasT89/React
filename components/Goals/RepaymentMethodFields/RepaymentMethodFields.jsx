import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputGroup from '../../../components/Form/InputGroup/InputGroup';

import cms from '../../../config/messages';
import attrs from '../../../config/goalAttributes';
import repaymentMethods from '../../../constants/enums/repaymentMethodTypes';
import fieldMasks from '../../../constants/enums/fieldMasks';
import { required, dollarAmount } from '../../../utils/formValidationUtils';
import { parseCurrency } from '../../../utils/parsingUtils';

const RepaymentMethodFields = ({
  repaymentMethod,
  onRepaymentMethodClick,
  onFieldChange,
  change,
  connectedValues,
  header,
  showTermError,
  showPaymentError
}) => {
  const option1Class = repaymentMethod === repaymentMethods.paymentAmount ? 'lc-button--primary' : '';
  const option2Class = repaymentMethod === repaymentMethods.timeToRepay ? 'lc-button--primary' : '';
  const hasValidPaymentAmount = !!parseCurrency(connectedValues.desiredPaymentPerMonth) && !showPaymentError; // eslint-disable-line max-len
  const hasValidTermAmount = !!parseFloat(connectedValues.desiredTermInMonths) && !showTermError;
  return (
    <div className="lc-goal-repayment-fields">
      {/* <!--REPAYMENT METHOD SELECTION--> */}
      <div className="lc-column lc-column--left columns small-10 small-offset-1">
        <h3 className="lc-investment-goal-form__h3">{header}</h3>
      </div>
      {/* <!--Repayment Selection Buttons--> */}
      <div className="lc-column lc-column--buttons columns small-10 small-offset-1">
        <button className={`lc-button--option ${option1Class}`} type="button" onClick={() => onRepaymentMethodClick(repaymentMethods.paymentAmount)}>
          {cms['goals.option.repaymentSelection.1']}
        </button>
        <button className={`lc-button--option ${option2Class}`} type="button" onClick={() => onRepaymentMethodClick(repaymentMethods.timeToRepay)}>
          {cms['goals.option.repaymentSelection.2']}
        </button>
      </div>
      <div className="lc-column lc-column--left columns small-10 small-offset-1">
        {/* <!--TIME TO REPAY FIELDS--> */}
        { (repaymentMethod === repaymentMethods.timeToRepay) &&
          <div>
            <Field name={attrs.desiredTermInMonths}
                   component={InputGroup}
                   className="lc-input-group--large-inline lc-input-group"
                   type="text"
                   mask={fieldMasks.months}
                   label={cms['goals.field.payoffTimeNeeded.label']}
                   validate={[required]}
                   onChangeCB={node => onFieldChange(node, change, connectedValues)} />
            { showTermError && <div className="lc-error">Desired term must be less than the original term.</div> }
            { hasValidTermAmount && <Field name={attrs.desiredPaymentPerMonth}
                   component={InputGroup}
                   className="lc-input-group--large-inline"
                   type="text"
                   mask={fieldMasks.currency}
                   label={cms['goals.field.paymentRequired.label']}
                   validate={[required, dollarAmount]}
                   isDisabled={true} /> }
          </div>
        }
        {/* <!--PAYMENT AMOUNT FIELDS--> */}
        { (repaymentMethod === repaymentMethods.paymentAmount) &&
          <div>
            <Field name={attrs.desiredPaymentPerMonth}
                   component={InputGroup}
                   className="lc-input-group--large-inline lc-input-group"
                   type="text"
                   mask={fieldMasks.currency}
                   label={cms['goals.field.desiredPayment.label']}
                   validate={[required]}
                   onChangeCB={node => onFieldChange(node, change, connectedValues)} />
            { showPaymentError && <div className="lc-error">Desired payment amount must be greater than the minimum payment.</div> }
            { hasValidPaymentAmount &&
              <Field name={attrs.desiredTermInMonths}
                   component={InputGroup}
                   className="lc-input-group--large-inline lc-input-group--odd"
                   type="text"
                   mask={fieldMasks.months}kds
                   label={cms['goals.field.payOffTerm.label']}
                   validate={[required]}
                   isDisabled={true} /> }
          </div>
        }
        {/* <!--INTEREST SAVED--> */}
        { (hasValidTermAmount && hasValidPaymentAmount) &&
          <div>
            <Field name={attrs.interestSaved}
                 component={InputGroup}
                 className={'lc-input-group--large-inline lc-input-group--odd ' +
                  'lc-input-group--no-bottom-margin lc-input-group--green ' +
                  'lc-input-group--bold'}
                 type="text"
                 mask={fieldMasks.currency}
                 label={cms['goals.field.interestSaved.label']}
                 validate={[required, dollarAmount]}
                 isDisabled={true} />
            {/* <!--DIVIDER--> */}
            <div className="lc-column lc-column--left columns small-12">
              <hr className="lc-hr" />
            </div>
            {/* <!--Adjusted Monthly Payment--> */}
            <div className="lc-column lc-column--left columns small-10 small-offset-1">
              <Field name={attrs.adjustedPaymentPerMonth}
                     component={InputGroup}
                     className="lc-input-group--large-inline lc-input-group--odd"
                     type="text"
                     mask={fieldMasks.currency}
                     label={cms['goals.field.increasedMonthlyPayment.label']}
                     isDisabled={true} />
            </div>
            {/* <!--Remaining Monthly PerEx--> */}
            <div className="lc-column lc-column--left columns small-10 small-offset-1">
              <Field name={attrs.remainingPerExPerMonth}
                     component={InputGroup}
                     className={'lc-input-group--large-inline lc-input-group--last ' +
                      'lc-input-group--bold'}
                     type="text"
                     mask={{
                       positive: fieldMasks.currency,
                       negative: fieldMasks.negativeCurrency
                     }}
                     label={cms['goals.field.remainingPerExPerMonth.label']}
                     subtext={cms['goals.field.remainingPerExPerMonth.subtext']}
                     isDisabled={true} />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

RepaymentMethodFields.propTypes = {
  repaymentMethod: PropTypes.string.isRequired,
  onRepaymentMethodClick: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  connectedValues: PropTypes.object.isRequired,
  header: PropTypes.string,
  showTermError: PropTypes.bool,
  showPaymentError: PropTypes.bool
};

export default RepaymentMethodFields;
