import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cms from '../../../config/messages';
import { submitTaxReturnRequest, updateFirstVisitFlag } from '../../../actions/finPlan/finPlanTaxReturn';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';

// Components
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import SuccessPageForm from '../../../components/FinPlanForms/SuccessPageForm/SuccessPageForm';
import TaxReturnForm from '../../../components/FinPlanForms/TaxReturnForm/TaxReturnForm';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

class FinPlanSuccess extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    finPlanCoClient: PropTypes.object,
    finPlanPersonalDetails: PropTypes.object,
    finPlanSaveSuccess: PropTypes.bool,
    isTaxReturnFormActive: PropTypes.bool,
    finPlanAssets: PropTypes.array,
    finPlanIncome: PropTypes.array,
    finPlanTaxReturns: PropTypes.object,
    isFinPlanSubmitted: PropTypes.bool.isRequired,
    isFirstFinPlanSubmit: PropTypes.bool.isRequired,
    dispatch: PropTypes.func
  };

  static _generateForm({ firstName, lastName, onSubmit }) {
    return (
      <SuccessPageForm firstName={firstName}
         lastName={lastName}
         onSubmit={onSubmit}
         intitialValues={{
           gavePermissionToViewFinData: true
         }} />
    );
  }

  static _onSubmitConnectInfoForm(formValues, formDispatch, formProps) {
    const { dispatch } = formProps;
    if (formValues.id) {
      const updatedFormValues = {
        ...formValues,
        data: {}
      };
      dispatch(
        submitTaxReturnRequest(
          updatedFormValues,
          updatedFormValues.finPlanId,
          updatedFormValues.id
        )
      );
    }
    else {
      dispatch(submitTaxReturnRequest(formValues, formValues.finPlanId, undefined));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(updateFirstVisitFlag());
  }

  render() {
    const {
      data: { user },
      finPlanTaxReturns,
      finPlanIncome,
      finPlanAssets,
      finPlanPersonalDetails,
      isTaxReturnFormActive,
      finPlanSaveSuccess,
      finPlanCoClient,
      isFinPlanSubmitted,
      isFirstFinPlanSubmit
    } = this.props;
    const firstName = finPlanPersonalDetails && finPlanPersonalDetails.firstName;
    const lastName = finPlanPersonalDetails && finPlanPersonalDetails.lastName;
    const data =
      finPlanTaxReturns && finPlanTaxReturns.data ? finPlanTaxReturns.data : {};

    return (
      <div className="lc-personal-details-info lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-personal-details-info__content">
          {/* <!--NAV MENU -->  */}
          { (isFinPlanSubmitted && !isFirstFinPlanSubmit) &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.additionalInfoPage} /> }
          { (!isFinPlanSubmitted || isFirstFinPlanSubmit) &&
            <div className="lc-row row">
              <h1 className="lc-fin-plan-success__header lc-fin-plan__header">
                {cms['finPlanSuccess.title'](`${firstName} ${lastName}`)}
              </h1>
              <div className="lc-column columns small-12 lc-column--no-padding">
                { user ?
                  FinPlanSuccess._generateForm({
                    firstName,
                    lastName,
                    onSubmit: FinPlanSuccess._onSubmitConnectInfoForm
                  }) :
                  <LoadingHexagon />
                }
              </div>
            </div>
          }
          <div>
            <TaxReturnForm onSubmit={FinPlanSuccess._onSubmitConnectInfoForm}
              finPlanIncome={finPlanIncome}
              finPlanAssets={finPlanAssets}
              isTaxReturnFormActive={isTaxReturnFormActive}
              finPlanSaveSuccess={finPlanSaveSuccess}
              finPlanCoClient={finPlanCoClient}
              finPlanTaxReturns={data}
              isFinPlanSubmitted={isFinPlanSubmitted && !isFirstFinPlanSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.finPlanSuccess,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted,
    isFirstFinPlanSubmit: state.finPlan.isFirstFinPlanSubmit
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanSuccess));
