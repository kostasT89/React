import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Local Dependancies
import cms from '../../../config/messages';
import {
        showInsuranceForm,
        submitFinPlanInsuranceForm,
        updateCurrentInsurancePolicy,
      } from '../../../actions/finPlan/finPlanInsurance';
import { deleteFinPlanInsurance } from '../../../actions/global/finPlan/finPlanInsurance';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import { forwardToFinPlanIncomePage } from '../../../utils/navigationUtils';
import {
        columnKeys,
        columns,
        tableHeight,
        headerHeight,
      } from '../../../config/finPlan/finPlanInsurance';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import InsuranceForm from '../../../components/FinPlanForms/InsuranceForm/InsuranceForm';
import SimpleTable from '../../../components/SimpleTable/SimpleTable';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

const INSURANCE = 'INSURANCE';

class FinPlanInsurance extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    finPlanId: PropTypes.any,
    dispatch: PropTypes.func,
    isFetchingFinPlan: PropTypes.bool,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      finPlanId,
      currentStep,
      previousStep
    } = this.props;
    // Update breadcrumb:
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
      }, finPlanId));
    }
  }

  _onSubmit(formValues, formDispatch, formProps = {}) {
    const { data: { formType }, dispatch, finPlanId } = this.props;
    const initialValues = formProps.initialValues || {};
    const id = initialValues.id;
    if (formType) {
      return dispatch(submitFinPlanInsuranceForm({
        isNewInsurancePolicy: !id,
        formValues,
        formType,
        finPlanId,
      }));
    }
  }

  _onCellClick(item, rowIndex, columnKey /* , model */) {
    const { id } = item;
    switch (columnKey) {
      case columnKeys.delete:
        return this._onDeleteInsurancePolicy(id);
      case columnKeys.edit:
        return this._onEditInsurancePolicy(item);
      default:
        return;
    }
  }

  _onDeleteInsurancePolicy(insurancePolicy) {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanInsurance(insurancePolicy, finPlanId));
  }

  _onEditInsurancePolicy(insurancePolicy) {
    const { dispatch } = this.props;
    // we need to clear before so we don't toggle twice
    dispatch(showInsuranceForm());
    dispatch(showInsuranceForm(INSURANCE));
    dispatch(updateCurrentInsurancePolicy(insurancePolicy));
  }

  _showForm = formType => this.props.dispatch(showInsuranceForm(formType));

  _onCancel() {
    const { data: { formType } } = this.props;
    if (formType) {
      this._showForm();
    }
    else {
      forwardToFinPlanIncomePage();
    }
  }

  render() {
    const {
      data: {
        user,
        formType,
        policies,
        fieldTypes,
        updateInProgress,
        currentInsurancePolicy
      },
      dispatch,
      currentStep,
      furthestStep,
      isFetchingFinPlan,
      isFinPlanSubmitted
    } = this.props;

    const tableConfig = {
      items: policies,
      containerHeight: tableHeight,
      columns,
      dispatch,
      headerHeight,
      onCellClick: ::this._onCellClick,
      allowEmpty: true,
    };

    const insuranceFormProps = {
      formType,
      fieldTypes,
      showForm: this._showForm,
      onCancel: ::this._onCancel,
      onSubmit: ::this._onSubmit,
      nextButtonDisabled: isEmpty(get(this.props, 'data.policies', [])),
      currentInsurancePolicy
    };

    return (
      <div className="lc-insurance-page lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-insurance-page__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          {!isFetchingFinPlan &&
            <FinancialPlanBreadcrumb currentStep={currentStep}
                                     furthestStep={furthestStep} />
          }
          <div className="lc-row row">
            <div className="lc-columns columns small-11 small-centered">
              <h1 className="lc-insurance-page__header lc-fin-plan__header">
                {cms['finPlanInsurance.header']}
              </h1>
              <h1 className="lc-insurance-page__blurb">
                {cms['finPlanInsurance.p1']}
              </h1>
            </div>
          </div>
          <div className="lc-row row">
            <div className="lc-column columns small-11 small-centered lc-column--no-padding">
              { user ?
                <SimpleTable {...tableConfig} />
                :
                <LoadingHexagon />
              }
            </div>
          </div>
          <div className="lc-row row">
            <div className="lc-column columns small-12 lc-column--no-padding">
              { (user && !updateInProgress) ?
                <InsuranceForm {...insuranceFormProps} />
                :
                <LoadingHexagon />
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
    data: state.finPlanInsurance,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanInsurance));
