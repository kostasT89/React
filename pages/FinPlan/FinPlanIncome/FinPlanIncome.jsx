// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
// Local Deps
import cms from '../../../config/messages';
import {
        updateCurrentIncomeSource,
        toggleFinPlanIncomeForm,
        toggleFormState,
        clearFormToggleStates,
        submitFinPlanIncomeForm,
        cancelIncomeForm,
      } from '../../../actions/finPlan/finPlanIncome';
import { deleteFinPlanIncome } from '../../../actions/global/finPlan/finPlanIncome';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import {
        columnKeys,
        columns,
        tableHeight,
      } from '../../../config/finPlan/finPlanIncome';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';

// Components
import SimpleTable from '../../../components/SimpleTable/SimpleTable';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import IncomeInfoForm from '../../../components/FinPlanForms/IncomeInfoForm/IncomeInfoForm';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialPlanBreadcrumb
  from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import formTypes from '../../../constants/enums/finPlanIncomeFormTypes';

const { incomeInfoForm } = formTypes;

class FinPlanIncome extends Component {

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      currentStep,
      previousStep,
      finPlanId
    } = this.props;
    // Update breadcrumb
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
      }, finPlanId));
    }
  }

  _onIncomeFormSubmit = (formValues, formDispatch /* , formProps */) => {
    const { finPlanId, formType } = this.props;
    const { id } = formValues;
    return formDispatch(
      submitFinPlanIncomeForm({
        isNewIncomeSource: !id,
        formType,
        formValues,
        finPlanId,
      })
    );
  }

  _onIncomeFormCancel = () => {
    const { dispatch } = this.props;
    dispatch(cancelIncomeForm());
  }

  _onDeleteIncomeSource(incomeSource) {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanIncome(incomeSource, finPlanId));
  }

  _onEditIncomeSource(incomeSource) {
    const { dispatch } = this.props;

    const { type, otherIncomeType } = incomeSource;
    // we need to clear before so we don't toggle twice
    dispatch(toggleFinPlanIncomeForm());
    dispatch(toggleFinPlanIncomeForm(type));
    dispatch(updateCurrentIncomeSource(incomeSource));
    if (type === incomeInfoForm) {
      dispatch(clearFormToggleStates());
      dispatch(toggleFormState(otherIncomeType));
    }
  }

  _onCellClick(item, rowIndex, columnKey /* , model */) {
    const { id } = item;

    switch (columnKey) {
      case columnKeys.delete:
        return this._onDeleteIncomeSource(id);
      case columnKeys.edit:
        return this._onEditIncomeSource(item);
      default:
        return;
    }
  }

  render() {
    const {
      incomes,
      dispatch,
      clientName,
      coClientName,
      tableIsLoading,
      isFetchingFinPlan,
      isLoadingIncomes,
      currentIncomeSource,
      currentStep,
      furthestStep,
      formType,
      toggleStates,
      isFinPlanSubmitted
    } = this.props;

    // Massage Incomes:
    const massagedIncomes = incomes.map(income => ({
        ...income,
        payFrequency: startCase(income.payFrequency),
      }
    ));

    // Table Config:
    const tableConfig = {
      items: massagedIncomes,
      containerHeight: tableHeight,
      columns,
      allowEmpty: true,
      dispatch,
      onCellClick: ::this._onCellClick
    };
    // Income Form Config
    const incomeFormProps = {
      clientName,
      coClientName,
      onCancel: this._onIncomeFormCancel,
      onSubmit: this._onIncomeFormSubmit,
      initialValues: currentIncomeSource,
      formType,
      toggleStates,
      dispatch,
      incomes
    };

    return (
      <div className="lc-fin-plan-income lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--PAGE CONTENT--> */}
        <div className="lc-fin-plan-income__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          {!isFetchingFinPlan &&
            <FinancialPlanBreadcrumb currentStep={currentStep}
              furthestStep={furthestStep} />
          }
          {/* <!--TABLE--> */}
          <div className="lc-row row">
            <h1 className="lc-fin-plan-income__header lc-fin-plan__header">
              {cms['finPlanIncome.header']}
            </h1>
            <div className="lc-column columns small-12 lc-fin-plan-income__table">
              {tableIsLoading ? <LoadingHexagon /> : <SimpleTable {...tableConfig} />}
            </div>
          </div>
          {/* <!--Income Form--> */}
          { !isLoadingIncomes && <IncomeInfoForm {...incomeFormProps} /> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { finPlanPersonalDetails } = state.finPlan;
  const nameInfo = {};
  if (finPlanPersonalDetails) {
    const { firstName, lastName, coClient } = finPlanPersonalDetails;
    // Massage clientName and coClientName:
    nameInfo.clientName = `${firstName} ${lastName}`;
    if (coClient && coClient.firstName) {
      nameInfo.coClientName = `${coClient.firstName} ${coClient.lastName}`;
    }
  }

  return {
    ...state.finPlanIncome,
    ...nameInfo,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

FinPlanIncome.propTypes = {
  finPlanId: PropTypes.any,
  formType: PropTypes.string,
  isFetchingFinPlan: PropTypes.bool,
  previousStep: PropTypes.object,
  currentStep: PropTypes.object,
  furthestStep: PropTypes.object,
  toggleStates: PropTypes.object,
  incomes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  clientName: PropTypes.string,
  coClientName: PropTypes.string,
  tableIsLoading: PropTypes.bool.isRequired,
  currentIncomeSource: PropTypes.object,
  isLoadingIncomes: PropTypes.bool.isRequired,
  isFinPlanSubmitted: PropTypes.bool.isRequired
};

export default FinPlanHOC(connect(mapStateToProps)(FinPlanIncome));
