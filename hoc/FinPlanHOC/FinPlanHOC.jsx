// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
// Local Deps:
import {
        analyzeSteps,
        checkIfStepIsAllowed
      } from '../../utils/finPlan/finPlanUtils';

import {
        getStripeSubscriptionInfo,
        getStripePaymentInfo
      } from '../../actions/settings';
import {
        updateFinPlanBreadcrumb,
        getFinPlanBreadcrumbs
      } from '../../actions/global/finPlan/finPlanBreadcrumbs';
import Routes from '../../constants/Routes';

function FinPlanHOC(WrappedComponent) {
  class FinPlanHOCWrappedComponent extends Component {

    static propTypes = {
      id: PropTypes.number,
      breadcrumbToUpdate: PropTypes.object,
      user: PropTypes.object,
      hasFinPlan: PropTypes.bool,
      isFetchingFinPlan: PropTypes.bool,
      completedAt: PropTypes.string,
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.object,
      finPlanPersonalDetails: PropTypes.object,
      finPlanGoals: PropTypes.array,
      finPlanIncome: PropTypes.array,
      finPlanInsurance: PropTypes.array,
      finPlanAssets: PropTypes.array,
      finPlanLiabilities: PropTypes.array,
      finPlanOtherExpenses: PropTypes.array,
      finPlanFinancialQuestions: PropTypes.object,
      finPlanBreadcrumbs: PropTypes.array,
      cardData: PropTypes.object,
      userHasStripeSubscription: PropTypes.bool,
      finPlanSaveSuccess: PropTypes.bool,
      isTaxReturnFormActive: PropTypes.bool,
      finPlanTaxReturns: PropTypes.object
    }

    componentDidMount() {
      const { id, dispatch } = this.props;
      if (id) {
        /*
        * NOTE: This is here for every subsequent call of the Fin Plan flow.
        * It allows the app to stay up-to-date with breadcrumb updates
        * without having to re-fetch ALL finPlanData (expensive call).
        */
        dispatch(getFinPlanBreadcrumbs(id));
      }
    }

    componentWillReceiveProps(nextProps) {
      const {
        id,
        location,
        dispatch,
        hasFinPlan,
        breadcrumbToUpdate
      } = this.props;

      if (nextProps.hasFinPlan && !hasFinPlan) {
        checkIfStepIsAllowed(nextProps.finPlanBreadcrumbs, location);
      }
      if (nextProps.breadcrumbToUpdate && nextProps.breadcrumbToUpdate !== breadcrumbToUpdate) {
        dispatch(updateFinPlanBreadcrumb(nextProps.breadcrumbToUpdate, id));
      }
      // Fetch out to get stripe subscription info if it exists
      if (location.pathname === Routes.finPlanPayment) {
        dispatch(getStripeSubscriptionInfo());
        dispatch(getStripePaymentInfo());
      }
    }

    render() {
      const {
        id,
        user,
        completedAt,
        hasFinPlan,
        isFetchingFinPlan,
        finPlanBreadcrumbs,
        finPlanPersonalDetails,
        finPlanGoals,
        finPlanIncome,
        finPlanInsurance,
        finPlanAssets,
        finPlanLiabilities,
        finPlanOtherExpenses,
        finPlanFinancialQuestions,
        finPlanTaxReturns,
        location,
        userHasStripeSubscription,
        cardData,
        isTaxReturnFormActive,
        finPlanSaveSuccess,
      } = this.props;

      const finPlanCoClient =
        finPlanPersonalDetails && finPlanPersonalDetails.coClient
        ? finPlanPersonalDetails.coClient : {};
      const updatedIsTaxReturnFormActive =
        isEmpty(finPlanTaxReturns) ? isTaxReturnFormActive : true;

      const {
        currentStep,
        previousStep,
        furthestStep
      } = analyzeSteps(finPlanBreadcrumbs, location);
      const massagedProps = {
        user,
        finPlanId: id,
        previousStep,
        currentStep,
        furthestStep,
        hasFinPlan,
        isFetchingFinPlan,
        finPlanCompletedAt: completedAt,
        finPlanBreadcrumbs,
        finPlanPersonalDetails,
        finPlanGoals,
        finPlanIncome,
        finPlanInsurance,
        finPlanAssets,
        finPlanLiabilities,
        finPlanOtherExpenses,
        finPlanFinancialQuestions,
        finPlanTaxReturns,
        location,
        userHasStripeSubscription,
        cardData,
        isTaxReturnFormActive: updatedIsTaxReturnFormActive,
        finPlanSaveSuccess,
        finPlanCoClient
      };
      return (<WrappedComponent {...massagedProps} />);
    }
  }

  const mapStateToProps = state => state.finPlan;

  return connect(mapStateToProps)(FinPlanHOCWrappedComponent);
}

export default FinPlanHOC;
