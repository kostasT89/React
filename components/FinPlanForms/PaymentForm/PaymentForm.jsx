// Global Deps
import React, { PropTypes, Component } from 'react';
import {
  Field,
  Form,
  reduxForm,
  formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
        Elements,
        StripeProvider
      } from 'react-stripe-elements';
import { formatMoney } from 'accounting';

// Local Deps
import {
  required,
} from '../../../utils/formValidationUtils';
import {
        stripePk,
        currencyPrecision
      } from '../../../config/properties';
import { getStartOfNextMonth } from '../../../utils/dateUtils';
import { forwardToFinPlanSuccess } from '../../../utils/navigationUtils';
import Routes from '../../../constants/Routes';
import cms from '../../../../app/config/messages';
import { lookupMessage } from '../../../utils/cmsUtils';
import amex from '../../../assets/png/creditCardIcons/amex.png';
import discover from '../../../assets/png/creditCardIcons/discover.png';
import mastercard from '../../../assets/png/creditCardIcons/mastercard.png';
import visa from '../../../assets/png/creditCardIcons/visa.png';
import {
  submitFinPlanPaymentForm,
  showCardError,
} from '../../../actions/finPlan/finPlanPayment';
import {
  updateFinPlanPaymentSuccess
} from '../../../actions/global/finPlan/finPlanPayment';
import { submitFinPlan } from '../../../actions/finPlan/finPlan';
import {
  finPlanTypes,
} from '../../../config/formFieldOptions';

// Components
import GenericButton from '../../GenericButton/GenericButton';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';
import InputGroup from '../../Form/InputGroup/InputGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import StripeCheckoutForm from './StripeForm';
import './PaymentForm.scss';
// CONST
const keyBase = 'finPlanPayment';
const precision = { precision: currencyPrecision };

class PaymentForm extends Component {

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static propTypes = {
    nameOnCard: PropTypes.any,
    dispatch: PropTypes.func,
    planType: PropTypes.any,
    finPlanId: PropTypes.any,
    submitting: PropTypes.any,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    invalid: PropTypes.any,
    stripePlanPaymentName: PropTypes.any,
    stripePlanPaymentAmount: PropTypes.any,
    userHasStripeSubscription: PropTypes.bool,
    cardData: PropTypes.object,
    isFinPlanSubmitted: PropTypes.bool
  }

  _generateStripeForm(formProps) {
    return (
      <div>
        <label className="lc-payment-form__card-element-label"
               htmlFor="card-element">
          Card Number
        </label>
        <div id="card-element">
          <StripeProvider apiKey={stripePk}>
            <Elements>
              <StripeCheckoutForm
                onRef={ref => (this.child = ref)}
                {...formProps}
              />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    );
  }

  _onSubmit(e) {
    const {
     nameOnCard,
     planType,
     dispatch,
     finPlanId,
    } = this.props;
    dispatch(showCardError(false));
    this.child.handleSubmit(e)
    .then(({
     token
    }) => {
     dispatch(submitFinPlanPaymentForm({
       token,
       name: nameOnCard,
       plan: planType,
       finPlanId,
     }));
     dispatch(submitFinPlan());
     forwardToFinPlanSuccess();
    })
    .catch((err) => {
      dispatch(showCardError(err));
    });
 }

  _onNext() {
    const {
     cardData,
     dispatch
    } = this.props;
    if (!isEmpty(cardData)) {
      dispatch(updateFinPlanPaymentSuccess());
      forwardToFinPlanSuccess();
    }
  }

  render() {
    const {
      invalid,
      submitting,
      nameOnCard,
      planType,
      handleSubmit,
      onSubmit,
      userHasStripeSubscription,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      cardData,
      isFinPlanSubmitted
    } = this.props;
    const {
      _cms,
    } = PaymentForm;

    const updatedCardData = (!isEmpty(cardData)
      && !isEmpty(cardData.data)
      ? cardData.data[0]
      : { brand: '', exp_year: '', exp_month: '', last4: '' });

    return (
      <Form
        className="lc-payment-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Payment FORM */}
        { !userHasStripeSubscription ?
          <div>
            <div className="lc-row row">
              <div className="lc-column small-10 small-offset-1">
                <h1 className="lc-payment-form__plan">
                  {_cms('formGroup1.label')}
                </h1>
                <div className="lc-column small-10 small-offset-1">
                  <RadioGroup
                  optionalLabelClassname="lc-payment-form__radio-group-opt-class"
                  name="planType"
                  fields={finPlanTypes}
                  validate={[required]} />
                </div>
              </div>
              <div className="lc-column small-5 small-offset-1">
                <h1 className="lc-payment-form__plan">
                  {_cms('formGroup2.label')}
                </h1>
              </div>
              <div className="lc-column small-12">
                <div className="lc-column small-5 small-offset-1">
                  <div className="lc-payment-form__card-icon">
                    <img alt="creditCard" src={visa} />
                    <img className="lc-payment-form__card-icon-img" alt="creditCard" src={mastercard} />
                    <img className="lc-payment-form__card-icon-img" alt="creditCard" src={amex} />
                    <img className="lc-payment-form__card-icon-img" alt="creditCard" src={discover} />
                  </div>
                </div>
                <div className="lc-column small-10 small-offset-1">
                  <div className="lc-payment-form__field lc-column small-6">
                    <Field
                    name="nameOnCard"
                    component={InputGroup}
                    label={_cms('field.card-holder-name.label')}
                    placeholder={_cms('field.card-holder-name.placeholder')}
                    validate={[required]} />
                  </div>
                </div>
                <div className="lc-column small-10 small-offset-1">
                  <div className="lc-column small-9">
                    <div className="lc-payment-form__form lc-column small-9">
                      {this._generateStripeForm({
                      nameOnCard,
                      planType,
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      :
      // If user has finPlan and stripe subscription - show card info
          <div className="lc-payment-form__display-payment lc-column small-12">
            <div className="lc-column small-6">
              <div className="lc-payment-form__form-label lc-column small-6">
                {cms['settings.planSelection.label']}:
              </div>
              <div className="lc-payment-form__content lc-column small-6">
                {stripePlanPaymentName}
              </div>
            </div>
            <div className="lc-column small-6">
              <div className="lc-payment-form__form-label lc-column small-6">
                {cms['settings.paymentMethod.label']}:
              </div>
              <div className="lc-payment-form__content lc-column small-6">
                {cms['finPlanPayment.nextChargeDateMessage'](
                  updatedCardData.brand,
                  updatedCardData.last4,
                  updatedCardData.exp_month,
                  updatedCardData.exp_year
                )}
              </div>
            </div>
            <div className="lc-payment-form__message lc-columns small-12">
              {cms['settings.payment.message'](
                getStartOfNextMonth(),
                formatMoney(stripePlanPaymentAmount, precision))
              }
            </div>
          </div>
      }
        {/* <!--FORM CONTROLS--> */}
        <div className="lc-fin-plan__buttons">
          <GenericNavButton
            className="lc-button--left lc-button--white"
            text={cms['button.previous']}
            route={Routes.finPlanQuestions}
          />
          {!isFinPlanSubmitted &&
            <span>
              { userHasStripeSubscription ?
                <GenericButton
                  className="lc-button--right lc-button--blue"
                  text={cms['button.next']}
                  isDisabled={false}
                  onClick={::this._onNext}
                />
                :
                <GenericButton
                  className="lc-button--right lc-button--blue"
                  // text={cms['button.next']}
                  text="SUBMIT"
                  isDisabled={invalid || submitting}
                  onClick={::this._onSubmit}
                />
              }
            </span>
          }
        </div>
      </Form>
    );
  }
}

const decoratedForm = reduxForm({
  form: 'paymentForm'
})(PaymentForm);
const selector = formValueSelector('paymentForm');
const connectedForm = connect(
  (state) => {
    const nameOnCard = selector(state, 'nameOnCard');
    const planType = selector(state, 'planType');
    return {
      nameOnCard,
      planType,
      finPlanId: state.finPlan.id,
    };
  }
)(decoratedForm);
export default connectedForm;
