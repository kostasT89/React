// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import camelCase from 'lodash/camelCase';
// Local Deps
import cms from '../../../config/messages';
import reduxForms from '../../../config/reduxForms';
import finPlanGoalFormTypes from '../../../constants/enums/finPlanGoalFormTypes';
import {
        updateCurrentGoal,
        updateSelectedOption,
        submitFinPlanGoalForm
      } from '../../../actions/finPlan/finPlanGoals';
import { deleteFinPlanGoal } from '../../../actions/global/finPlan/finPlanGoals';
import {
        columnKeys,
        columns,
        tableHeight,
      } from '../../../config/finPlan/finPlanGoals';
import Routes from '../../../constants/Routes';
import {
      lookupFormTypeByKey,
      getDefaultValuesByFormType,
      createChildValuesForDisplay,
      shouldShowDesiredDownpayment,
      updateEducationGoalChildFields,
      createEducationFormModelForSave
      } from '../../../utils/finPlan/finPlanGoalUtils';
import { lookupFinPlanGoal } from '../../../utils/cmsUtils';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';

// Components
import SimpleTable from '../../../components/SimpleTable/SimpleTable';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import GenericNavButton from '../../../components/GenericNavButton/GenericNavButton';
import GoalTypeForm from '../../../components/FinPlanForms/GoalTypeForm/GoalTypeForm';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import PurchaseGoalsForm from '../../../components/FinPlanForms/PurchaseGoalsForm/PurchaseGoalsForm';
import EducationGoalsForm from '../../../components/FinPlanForms/EducationGoalsForm/EducationGoalsForm';
import RetirementGoalsForm from '../../../components/FinPlanForms/RetirementGoalsForm/RetirementGoalsForm';
import FinancialPlanBreadcrumb
  from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';

// CONST
const goalTypeField = 'goalType';
class FinPlanGoals extends Component {

  static propTypes = {
    goals: PropTypes.array.isRequired,
    children: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    goalType: PropTypes.string,
    finPlanId: PropTypes.any,
    fieldTypes: PropTypes.any,
    currentGoal: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    previousStep: PropTypes.object,
    formIsLoading: PropTypes.bool.isRequired,
    tableIsLoading: PropTypes.bool.isRequired,
    isFetchingFinPlan: PropTypes.bool.isRequired,
    selectedOptionKey: PropTypes.string.isRequired,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  static _generateForm({
    goal,
    formType,
    onSubmit,
    onCancel,
    children,
    selectedOptionKey
  }) {
    const {
      purchaseForm,
      educationForm,
      retirementForm,
    } = finPlanGoalFormTypes;

    let initialValues =
      updateEducationGoalChildFields(goal || getDefaultValuesByFormType(formType));

    // i.e. if this is a new education goal we need to add child values to the form if they exist
    if ((formType === educationForm && !initialValues.id) && !isEmpty(children)) {
      initialValues = { ...initialValues, ...createChildValuesForDisplay(children) };
    }

    const formConfig = {
      type: selectedOptionKey,
      invalid: false,
      children,
      onCancel,
      onSubmit,
      submitting: false,
      initialValues,
      shouldShowDesiredDownpayment: shouldShowDesiredDownpayment(camelCase(selectedOptionKey))
    };

    switch (formType) {
      case retirementForm:
        return (
          <RetirementGoalsForm {...formConfig} />
        );
      case educationForm:
        return (
          <EducationGoalsForm {...formConfig} />
        );
      case purchaseForm:
      default:
        return (
          <PurchaseGoalsForm {...formConfig} />
        );
    }
  }

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      finPlanId,
      currentStep,
      previousStep,
    } = this.props;
    // Update Breadcrumb
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
      }, finPlanId));
    }
  }

  _onGoalFormSubmit(formValues, formDispatch, formProps) {
    const { initialValues } = formProps;
    const { goalType, finPlanId, selectedOptionKey } = this.props;
    const { id } = initialValues;

    const valuesForSave = isNumber(formValues.numberOfChildren) ?
      createEducationFormModelForSave(formValues) : formValues;

    return formDispatch(
      submitFinPlanGoalForm({
        formType: lookupFinPlanGoal(camelCase(selectedOptionKey)) || goalType,
        isNewGoal: !id,
        formValues: { ...initialValues, ...valuesForSave },
        finPlanId,
      })
    );
  }

  _onGoalFormCancel() {
    this.props.dispatch(updateCurrentGoal(null));
  }

  _onDeleteGoal(goal) {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanGoal(goal, finPlanId));
  }

  _onEditGoal(goal) {
    this.props.dispatch(updateCurrentGoal(goal));
  }

  _onCellClick(item, rowIndex, columnKey /* , model */) {
    const { id } = item;
    const { dispatch } = this.props;
    switch (columnKey) {
      case columnKeys.delete:
        return this._onDeleteGoal(id);
      case columnKeys.edit:
        dispatch(updateSelectedOption(camelCase(item.type)));
        return this._onEditGoal(item);
      default:
        return;
    }
  }

  render() {
    const {
      goals,
      dispatch,
      children,
      fieldTypes,
      currentGoal,
      currentStep,
      furthestStep,
      formIsLoading,
      tableIsLoading,
      isFetchingFinPlan,
      selectedOptionKey,
      isFinPlanSubmitted
    } = this.props;

    const { _generateForm } = FinPlanGoals;
    const isFormVisible = !!selectedOptionKey;
    const formType = lookupFormTypeByKey(camelCase(selectedOptionKey));

    // Form Config:
    const formConfig = {
      selectedOptionKey,
      onCancel: ::this._onGoalFormCancel,
      onSubmit: ::this._onGoalFormSubmit,
      formType,
      goal: currentGoal,
      children,
    };
    // Table Config:
    const tableConfig = {
      items: goals,
      containerHeight: tableHeight,
      columns,
      allowEmpty: true,
      dispatch,
      onCellClick: ::this._onCellClick
    };
    const goalTypeFormInitialValues = {
      id: get(currentGoal, 'id'),
      goalType: camelCase(selectedOptionKey)
    };

    return (
      <div className="lc-fin-plan-goals lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--PAGE CONTENT--> */}
        <div className="lc-fin-plan-goals__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMBS -->  */}
          { !isFetchingFinPlan &&
            <FinancialPlanBreadcrumb furthestStep={furthestStep}
                                     currentStep={currentStep} />
          }
          {/* <!--HEADER--> */}
          <div className="lc-row row">
            <h1 className="lc-fin-plan-goals__header lc-fin-plan__header">
              {cms['finPlanGoals.header']}
            </h1>
            <div className="lc-fin-plan-goals__text lc-fin-plan__subtitle">
              {cms['finPlanGoals.p1']}
            </div>
          </div>
          {/* <!-- TABLE --> */}
          <div className="lc-row row">
            <div className="lc-column columns small-12 lc-fin-plan-goals__table">
              {!tableIsLoading && <SimpleTable {...tableConfig} />}
            </div>
          </div>
          {/* <!--SELECT GROUP--> */}
          <div className="lc-row row">
            <div className="lc-column columns small-12 lc-fin-plan-goals__field-group">
              <GoalTypeForm fieldTypes={fieldTypes}
                            initialValues={goalTypeFormInitialValues}
                            selectedOptionKey={selectedOptionKey} />
            </div>
          </div>
          {/* <!--GOAL FORM --> */}
          <div className="lc-row row">
            <div className="lc-fin-plan-goals__form">
              { isFormVisible && !formIsLoading && _generateForm(formConfig) }
            </div>
            {/* <!--LOADING GIF --> */}
            <div className="lc-fin-plan-goals__loader">
              { formIsLoading && <LoadingHexagon /> }
            </div>
          </div>
          {/* <!--NAVIGATION BUTTONS--> */}
          <div className="lc-row row">
            {!isFormVisible &&
              <div className="lc-fin-plan__buttons">
                <GenericNavButton className="lc-button--left lc-button--white"
                                  route={Routes.finPlanPersonalDetails}
                                  text={cms['button.previous']} />
                <GenericNavButton className="lc-button--right lc-button--blue"
                                  route={Routes.finPlanIncome}
                                  text={cms['button.next']}
                                  isDisabled={isEmpty(goals)} />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

// The Other Please Type field is part of a different for field so we need to select that value
// Here and add it to state
const selector = formValueSelector(reduxForms.goalTypeForm);

function mapStateToProps(state) {
  const goalType = selector(state, goalTypeField);
  const children = get(state, 'finPlan.finPlanPersonalDetails.children');
  return {
    ...state.finPlanGoals,
    children,
    goalType,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanGoals));
