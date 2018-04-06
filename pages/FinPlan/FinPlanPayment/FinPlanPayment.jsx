import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// Local Deps
import cms from '../../../config/messages';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import PaymentForm from '../../../components/FinPlanForms/PaymentForm/PaymentForm';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';

class FinPlanPayment extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    isFetchingFinPlan: PropTypes.bool,
    finPlanId: PropTypes.number,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  static _generateForm(formProps) {
    return (
      <PaymentForm {...formProps} />
    );
  }

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      currentStep,
      previousStep,
      finPlanId
    } = this.props;
    // Update breadcrumb:
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
        isCompleted: true
      }, finPlanId));
    }
  }

  _onSubmit() {
    const {
      data,
    } = this.props;
    return data;
  }

  render() {
    const {
      data: {
        isLoading,
        stripePlanPaymentName,
        stripePlanPaymentAmount,
        user,
        userHasStripeSubscription,
        cardData
      },
      currentStep,
      furthestStep,
      isFetchingFinPlan,
      isFinPlanSubmitted
    } = this.props;
    const { _generateForm } = FinPlanPayment;

    return (
      <div className="lc-fin-plan-payment-page lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-fin-plan-payment-page__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          { !isFetchingFinPlan &&
            <FinancialPlanBreadcrumb currentStep={currentStep}
              furthestStep={furthestStep} />
          }
          <div className="lc-row small-10">
            <div className="lc-column columns small-12 lc-column--no-padding">
              <h1 className="lc-fin-plan-payment-page__header lc-fin-plan__header">
                {cms['finPlanPayment.header']}
              </h1>
              { !userHasStripeSubscription &&
                <p className="lc-fin-plan-payment-page__blurb">
                  {cms['finPlanPayment.blurb1']}
                  <br />
                  <br />
                  {cms['finPlanPayment.blurb2']}
                </p>
              }
            </div>
          </div>
          <div className="lc-row row">
            <div className="lc-column columns small-12 lc-column--no-padding">
              { isLoading ?
                <LoadingHexagon />
                  :
                _generateForm({
                  onSubmit: ::this._onSubmit,
                  user,
                  userHasStripeSubscription,
                  stripePlanPaymentName,
                  stripePlanPaymentAmount,
                  cardData,
                  isFinPlanSubmitted
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.finPlanPayment,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanPayment));
