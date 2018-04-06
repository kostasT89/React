import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
// Local Deps
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
import FinPlanSummaryPageType from '../../config/finPlanSummaryPageType';
// Components
import GenericButton from '../GenericButton/GenericButton';
// Styles
import './FinancialPlanSummaryNavMenu.scss';

const FinancialPlanSummaryNavMenu = ({ pageType }) => (

  <div className="lc-summary-header-container">
    <div className="lc-finplan-summary__menu">
      <Link
        className={`lc-finplan-summary__link 
          ${(pageType !== FinPlanSummaryPageType.additionalInfoPage) ?
            'lc-finplan-summary__link--shadow' : ''}`}
        to={(pageType !== FinPlanSummaryPageType.additionalInfoPage) ? Routes.finPlanSuccess : ''}>
        <GenericButton
          className={(pageType === FinPlanSummaryPageType.additionalInfoPage) ? 'lc-button--blue' : ''}
          text={cms['finPlan.summaryReview.additionalInfo']} />
      </Link>
      <Link
        className={`lc-finplan-summary__link 
          ${(pageType !== FinPlanSummaryPageType.finPlanDataPage) ?
            'lc-finplan-summary__link--shadow' : ''}`}
        to={(pageType !== FinPlanSummaryPageType.finPlanDataPage) ? Routes.finPlanDataOverview : ''}>
        <GenericButton
        className={(pageType === FinPlanSummaryPageType.finPlanDataPage) ? 'lc-button--blue' : ''}
          text={cms['finPlan.summaryReview.finPlanData']} />
      </Link>
    </div>
    <h1 className="lc-finplan-summary__header">
      { pageType === FinPlanSummaryPageType.additionalInfoPage ?
          cms['finPlan.summaryReview.additionalInfo'] :
          cms['finPlan.summaryReview.finPlanData'] }
    </h1>
  </div>
);

FinancialPlanSummaryNavMenu.propTypes = {
  pageType: PropTypes.string.isRequired
};

export default FinancialPlanSummaryNavMenu;
