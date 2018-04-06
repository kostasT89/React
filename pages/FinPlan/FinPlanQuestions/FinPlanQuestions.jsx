import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import cms from '../../../config/messages';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialQuestionsForm from '../../../components/FinPlanForms/FinancialQuestionsForm/FinancialQuestionsForm';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import {
        submitFinPlanQuestions,
        setEnableReinitialize
      } from '../../../actions/finPlan/finPlanQuestions';
import {
        updateFinPlanBreadcrumb,
      } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import {
        forwardToFinPlanPaymentPage,
      } from '../../../utils/navigationUtils';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

class FinPlanQuestions extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    finPlanId: PropTypes.any,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    isFetchingFinPlan: PropTypes.bool,
    dispatch: PropTypes.func,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { currentStep, previousStep, finPlanId } = this.props;
    // If FinPlan has already been fetched:
    if (finPlanId) {
      this._handleFirstVisit({ currentStep, previousStep, finPlanId });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      data: {
        clientAnswers,
        coClientAnswers
      }
    } = this.props;
    // Update breadcrumb:
    if (!this.props.data.enableReinitialize && nextProps.data.enableReinitialize) {
      dispatch(setEnableReinitialize(false));
    }
    if (this.props.data.enableReinitialize &&
      (!isEmpty(clientAnswers) || !isEmpty(coClientAnswers))) {
        dispatch(setEnableReinitialize(false));
    }
  }

  _handleFirstVisit({ currentStep, previousStep, finPlanId }) {
    const { dispatch } = this.props;
    // Update breadcrumb + create default other expenses:
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

  _onSubmit(formValues, formDispatch, formProps = {}) {
    const {
      finPlanId,
      currentStep
    } = this.props;
    const finPlanQuestionsId = get(this.props, 'finPlanFinancialQuestions.id');
    const initialValues = formProps.initialValues || {};
    const { majorIncomeEvents, majorExpenseEvents } = initialValues;

    formDispatch(submitFinPlanQuestions({
      responses: { ...formValues, majorIncomeEvents, majorExpenseEvents },
      finPlanId,
      finPlanQuestionsId
    }));
    formDispatch(updateFinPlanBreadcrumb({
      ...currentStep,
      isCompleted: true,
    }, finPlanId));
    if (currentStep.isCompleted) {
      forwardToFinPlanPaymentPage();
    }
  }

  render() {
    const {
      data,
      data: {
        enableReinitialize
      },
      dispatch,
      currentStep,
      furthestStep,
      isFetchingFinPlan,
      isFinPlanSubmitted
    } = this.props;

    const financialQuestionsFormProps = {
      dispatch,
      onSubmit: ::this._onSubmit,
      initialValues: data,
      enableReinitialize
    };

    return (
      <div className="lc-financial-questions lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-financial-questions__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          { !isFetchingFinPlan &&
            <FinancialPlanBreadcrumb currentStep={currentStep} furthestStep={furthestStep} />
          }
          <div className="lc-row row">
            <h1 className="lc-financial-questions__header lc-fin-plan__header">
              {cms['finPlanQuestions.header']}
            </h1>
            <div className="lc-column columns small-12 lc-column--no-padding">
              <FinancialQuestionsForm {...financialQuestionsFormProps} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const firstName = get(state, 'finPlan.finPlanPersonalDetails.firstName', '');
  const lastName = get(state, 'finPlan.finPlanPersonalDetails.lastName', '');
  const coClient = get(state, 'finPlan.finPlanPersonalDetails.coClient', {});

  let nameInfo = { clientName: `${firstName} ${lastName}` };

  if (!isEmpty(coClient) && coClient.firstName) {
    nameInfo = { ...nameInfo, coClientName: `${coClient.firstName} ${coClient.lastName}` };
  }

  return {
    data: state.finPlanQuestions,
    ...nameInfo,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanQuestions));
