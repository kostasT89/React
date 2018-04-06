import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import oval from '../../../assets/svg/oval.svg';
import graph from '../../../assets/svg/graph.svg';
// Components:
import cms from '../../../config/messages';
import GenericButton from '../../../components/GenericButton/GenericButton';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
// Actions:
import { createFinPlan } from '../../../actions/finPlan/finPlan';
// Utils:
import {
        forwardToDashboard,
        forwardToFinPlanPayment,
        forwardToFurthestFinPlanPage,
        forwardToFinPlanSuccess
      } from '../../../utils/navigationUtils';

class FinPlanIntro extends Component {

  componentDidMount() {
    const {
      finPlanBreadcrumbs,
      isFinPlanSubmitted
    } = this.props;
    /*
    * Check to see where the user last left fin plan, and forward to page
    * NOTE: this is duplicated in componentWillUpdate() to handle cases of first-load.
    * This if statement below is for subsequent visits to this page.
    */
    if (!isEmpty(finPlanBreadcrumbs)) {
      if (isFinPlanSubmitted) {
        forwardToFinPlanSuccess();
      }
      else {
        forwardToFurthestFinPlanPage(finPlanBreadcrumbs);
      }
    }
  }

  componentWillUpdate(nextProps) {
    // Check to see where the user last left fin plan, and forward to page
    const {
      finPlanBreadcrumbs,
      isFinPlanSubmitted
    } = nextProps;

    if (!isEmpty(finPlanBreadcrumbs)) {
      if (isFinPlanSubmitted) {
        forwardToFinPlanSuccess();
      }
      else {
        forwardToFurthestFinPlanPage(finPlanBreadcrumbs);
      }
    }
  }

  _createFinPlan() {
    const {
      dispatch,
    } = this.props;
    dispatch(createFinPlan());
  }

  render() {
    const {
      isFetchingFinPlan,
      hasFinPlan
    } = this.props;
    const isLoading = isFetchingFinPlan || hasFinPlan;

    return (
      <div className="lc-fin-plan-intro lc-fin-plan-page animated fadeIn">
        {/* <!--LOADING HEXAGON--> */}
        { isLoading && <LoadingHexagon />}
        {/* <!--FINANCIAL SNAPSHOT--> */}
        { !isLoading && <FinancialSnapshot />}
        {/* <!--FIN PLAN INTRO--> */}
        { !isLoading &&
          <div className="lc-fin-plan-intro__content">
            <div className="lc-row row">
              <h1 className="lc-fin-plan-intro__header lc-fin-plan__header">
                {cms['finPlan.header']}
              </h1>
              <div className="lc-column columns small-12 lc-column--no-padding">
                <div>
                  <img src={oval}
                      role="presentation" />
                </div>
                <div className="lc-fin-plan-intro__icon-wrapper">
                  <img src={graph}
                      role="presentation" />
                </div>
              </div>
            </div>

            <div className="lc-row row lc-fin-plan-intro__text lc-fin-plan__subtitle">
              <div className="lc-column columns small-12 lc-column--no-padding">
                {cms['finPlan.introText.ln1']}
              </div>
              <div className="lc-column columns small-12 lc-column--padding">
                {cms['finPlan.introText.ln2']}
              </div>
            </div>

            <div className="lc-row row lc-fin-plan-intro__text lc-fin-plan__subtitle">
              <div className="lc-column columns small-12">
                <div className="lc-fin-plan-intro__description-container">
                  {/* TODO: Remove this and replace with the pricing table */}
                  Insert Plan Description design from website here
                </div>
              </div>
            </div>

            <div className="lc-row row lc-fin-plan__buttons">
              <GenericButton text={cms['finPlan.dashboardButton']}
                            className="lc-button--left lc-button--white"
                            onClick={forwardToDashboard} />
              <GenericButton text={cms['finPlan.startPlan']}
                            className="lc-button--center lc-button--blue"
                            onClick={::this._createFinPlan} />
              <GenericButton text={cms['finPlan.payAndStart']}
                            className="lc-button--right lc-button--white"
                            onClick={forwardToFinPlanPayment} />
            </div>
          </div>
        }
      </div>
    );
  }
}

FinPlanIntro.propTypes = {
  hasFinPlan: PropTypes.bool.isRequired,
  isFinPlanSubmitted: PropTypes.bool.isRequired,
  isFetchingFinPlan: PropTypes.bool.isRequired,
  finPlanBreadcrumbs: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return state.finPlan;
}
export default connect(mapStateToProps)(FinPlanIntro);
