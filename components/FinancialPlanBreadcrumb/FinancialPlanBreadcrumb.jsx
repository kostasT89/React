import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';
// Local Deps
import financialPlanSteps from '../../config/finPlan/financialPlanSteps';
import { determineWhetherBreadcrumbStepIsIncomplete } from '../../utils/finPlan/finPlanUtils';
// Styles
import './FinancialPlanBreadcrumb.scss';

const FinancialPlanBreadcrumb = ({ furthestStep, currentStep }) => (
  <div className="financial-plan-breadcrumb">
    {financialPlanSteps.map((step, idx) => (
      <div key={idx}
           className={cx('breadcrumb-step', currentStep && {
             'breadcrumb-step--active': idx === currentStep.index,
             'breadcrumb-step--incompleted': currentStep && determineWhetherBreadcrumbStepIsIncomplete(idx, currentStep, furthestStep)
           })}>
        <div className="spacer-content-wrapper">
          {/* <!--SPACER--> */}
          <div className={cx('breadcrumb-spacer',
            currentStep && { 'in-progress': idx <= currentStep.index })} />
          {/* <!--BREADCRUMB CONTENT--> */}
          <Link to={step.route}
                className="breadcrumb-content-wrapper">
            <div className="breadcrumb-content-container">
              <div className="breadcrumb-text">
                {step.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

FinancialPlanBreadcrumb.propTypes = {
  furthestStep: PropTypes.object,
  currentStep: PropTypes.object
};

export default FinancialPlanBreadcrumb;
