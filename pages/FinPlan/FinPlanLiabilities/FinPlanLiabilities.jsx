// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// Local Deps
import cms from '../../../config/messages';
import { lookupFinPlanLiabilities } from '../../../utils/cmsUtils';
// Actions
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
// HOC
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import LiabilitiesForm from '../../../components/FinPlanForms/LiabilitiesForm/LiabilitiesForm';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

import './FinPlanLiabilities.scss';

class FinPlanLiabilities extends Component { // eslint-disable-line

  static propTypes = {
    data: PropTypes.object.isRequired,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    previousStep: PropTypes.object,
    isFetchingFinPlan: PropTypes.bool,
    finPlanId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      currentStep,
      previousStep,
      finPlanId
    } = this.props;
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

  render() {
    const {
      data: {
        accounts,
        liabilities,
        showAccounts,
      },
      finPlanId,
      currentStep,
      furthestStep,
      isFetchingFinPlan,
      isFinPlanSubmitted
    } = this.props;

    const liabilitiesProps = {
      accounts,
      finPlanId,
      liabilities,
      showAccounts,
    };

    return (
      <div className="lc-liabilities-page lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-liabilities-page__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          { !isFetchingFinPlan &&
            <FinancialPlanBreadcrumb currentStep={currentStep}
              furthestStep={furthestStep} />
          }
          <div className="lc-row row">
            {/* <!--HEADER--> */}
            <h1 className="lc-liabilities-page__header lc-fin-plan__header">
              {cms['finPlanLiabilities.header']}
            </h1>
            {/* <!--SUBTITLE--> */}
            <div className="lc-liabilities-page__text lc-fin-plan__subtitle">
              {lookupFinPlanLiabilities('subtitle')}
            </div>
            <div className="lc-column columns small-12 lc-column--no-padding">
              {isFetchingFinPlan ?
                <LoadingHexagon />
                :
                <LiabilitiesForm {...liabilitiesProps} />
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
    data: state.finPlanLiabilities,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanLiabilities));
