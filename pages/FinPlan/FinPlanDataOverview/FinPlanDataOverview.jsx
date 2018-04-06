import React from 'react';
// Local Deps
import cms from '../../../config/messages';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

const FinPlanDataOverview = () => (
  <div className="lc-fin-plan-data-overview-page lc-fin-plan-page animated fadeIn">
    {/* <!--FINANCIAL SNAPSHOT--> */}
    <FinancialSnapshot />
    {/* <!--FORM--> */}
    <div className="lc-fin-plan-data-overview-page__content">
      {/* <!--NAV MENU -->  */}
      <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} />
      {/* <!--BREADCRUMB -->  */}
      <FinancialPlanBreadcrumb />
      <div className="lc-row row">
        <div className="lc-column columns small-10 small-offset-1 lc-fin-plan-data-description">
          {cms['finPlan.dataOverview.subDescription']}
        </div>
        <div className={'lc-column columns end small-10 small-offset-1 ' +
          'large-8 large-offset-2 lc-fin-plan-data-description'}>
          {cms['finPlan.dataOverview.keepInRemind']}
        </div>
      </div>
    </div>
  </div>
);

export default FinPlanDataOverview;
