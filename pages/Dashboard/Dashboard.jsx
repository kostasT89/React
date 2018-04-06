// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
// Local Deps
import userAttributes from '../../config/userAttributes';
import { EMPTY_STRING } from '../../config/properties';
import cms from '../../config/messages';
import Routes from '../../constants/Routes';
// Components
import DashboardHOC from '../../hoc/DashboardHOC';
import Welcome from '../../components/Welcome/Welcome';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import ProgressBarGroup from '../../components/ProgressBarGroup/ProgressBarGroup';
import GoalCard from '../../components/GoalCard/GoalCard';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
// Utils
import SelectGoalAccount from '../../config/selectGoalAccount';

const Dashboard = ({
    enabledAccounts,
    user,
    hasFetchedAccounts,
    hasFetchedGoals,
    hasFetchedPredictedBills,
    hasFetchedBalances,
    goals,
    predictedBills,
    perExSummary,
    billSummary,
    goalSummary
  }) => {
    const name = get(user, userAttributes.firstName, EMPTY_STRING);
    const hasGoals = hasFetchedGoals && !isEmpty(goals);
    const isLoading = !hasFetchedAccounts || !hasFetchedGoals;
    const noGoalsFound = hasFetchedBalances && hasFetchedGoals && isEmpty(goals);
    const {
      pastFieldsets,
      upcomingFieldsets
    } = predictedBills;
    return (
      <div className="lc-dashboard lc-dashboard-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT COMPONENT --> */}
        <FinancialSnapshot />

        {/* <!--DASHBOARD CONTENT --> */}
        { isLoading && <LoadingHexagon /> }

        { (!isLoading && isEmpty(enabledAccounts)) && <Welcome userName={name} /> }

        { (!isLoading && !isEmpty(enabledAccounts)) &&
        <div className="lc-dashboard__content">
          <div className="lc-row row">

            {/* <!--PROGRESS BARS--> */}
            <div className="lc-column columns small-12">
              <div className="lc-dashboard__progress-bars-container">
                <ProgressBarGroup total={perExSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={perExSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={perExSummary.totalActualAmountThisMonth}
                  label={cms['dashboard.perExBar.title']} />
                <ProgressBarGroup total={billSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={billSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={billSummary.totalActualAmountThisMonth}
                  label={cms['dashboard.billsBar.title']} />
                <ProgressBarGroup total={goalSummary.totalAnticipatedMonthlyAmount}
                  labelAmount={goalSummary.totalAnticipatedMonthlyAmount}
                  meterAmount={goalSummary.totalActualAmountThisMonth}
                  label={cms['dashboard.goalsBar.title']} />
              </div>
            </div>

            {/* <!--BILLS DUE THIS MONTH--> */}
            <div className="lc-column lc-column--left columns small-6">
              <h3 className="lc-dashboard__header">
                {cms['dashboard.billsDue']}
              </h3>
              { (hasFetchedPredictedBills) &&
                <div className="lc-dashboard__bills-container">
                  <TransactionsList transactions={[...upcomingFieldsets, ...pastFieldsets]} />
                </div>
              }
              { (isEmpty(upcomingFieldsets) && isEmpty(pastFieldsets)) &&
                <div className="lc-dashboard__bills-message">
                  {cms['dashboard.predictedBills.messages']}
                </div>
              }
            </div>

            {/* <!--PLANNED GOALS--> */}
            <div className="lc-column lc-column--right columns small-6">
              <h3 className="lc-dashboard__header">
                {cms['dashboard.plannedGoals']}
              </h3>
              <div className="lc-dashboard__goals-container">
                {hasGoals && goals.map((goal, idx) => (
                  <Link key={idx}
                    to={{
                      pathname: SelectGoalAccount[goal.type].route,
                      query: {
                         goalId: goal.id
                      }
                    }} >
                    <GoalCard {...goal} />
                  </Link>
                ))}
                {noGoalsFound &&
                  <Link to={Routes.goalSelect}>
                    <GoalCard monthlyAmount={0}
                            actualAmount={0} />
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    );
  };

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  enabledAccounts: PropTypes.array.isRequired,
  goals: PropTypes.array.isRequired,
  predictedBills: PropTypes.object.isRequired,
  hasFetchedAccounts: PropTypes.bool.isRequired,
  hasFetchedGoals: PropTypes.bool.isRequired,
  hasFetchedPredictedBills: PropTypes.bool.isRequired,
  hasFetchedBalances: PropTypes.bool,
  perExSummary: PropTypes.object.isRequired,
  billSummary: PropTypes.object.isRequired,
  goalSummary: PropTypes.object.isRequired
};

export default DashboardHOC(Dashboard);
