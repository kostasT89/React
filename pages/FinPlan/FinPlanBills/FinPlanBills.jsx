import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
// Local Deps
import cms from '../../../config/messages';
import { fields } from '../../../config/fieldsetsTable';
import finPlanSchemas from '../../../schemas/finPlanSchemas';
import finPlanSchemaTypes from '../../../constants/enums/finPlanSchemaTypes';
import {
        defaultOtherRecurringExpenses,
        otherBillsColumns,
        tableHeight,
        rowHeight,
        idMapping,
      } from '../../../config/finPlan/finPlanBills';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import GenericButton from '../../../components/GenericButton/GenericButton';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import InlineEditTable from '../../../components/Form/InlineEditTable/InlineEditTable';
import FieldsetsTableComponent from '../../../components/FieldsetsTable/FieldsetsTable';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';
// Actions
import {
        bulkCreateFinPlanOtherExpenses,
        deleteFinPlanOtherExpense,
        updateFinPlanOtherExpense,
        createFinPlanOtherExpense,
        updateFinPlanBillsCommentForStore,
        updateFinPlanBillsComment,
        getFinPlanBillsComments
      } from '../../../actions/global/finPlan/finPlanOtherExpenses';
import { predictBills } from '../../../actions/global/transactionFieldsets';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import { forwardToFinPlanQuestions, forwardToFinPlanTransactions } from '../../../utils/navigationUtils';

class FinPlanBills extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    bills: PropTypes.array,
    isFetchingBills: PropTypes.bool,
    otherExpenses: PropTypes.array,
    // Provided by HOC:
    finPlanId: PropTypes.any,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    isFetchingFinPlan: PropTypes.bool,
    comments: PropTypes.string,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { currentStep, previousStep, finPlanId, dispatch } = this.props;
    // Predict Bills
    dispatch(predictBills());
    // If FinPlan has already been fetched:
    if (finPlanId) {
      this._handleFirstVisit({ currentStep, previousStep, finPlanId });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentStep, previousStep, finPlanId, dispatch, comments } = nextProps;
    // On Page Refresh: Handle first visit here since finPlan has not yet loaded.
    if (finPlanId && isUndefined(comments)) { // Fin Plan Bills
      dispatch(getFinPlanBillsComments(finPlanId));
    }

    if (!this.props.finPlanId && nextProps.finPlanId) {
      this._handleFirstVisit({ currentStep, previousStep, finPlanId });
    }
  }

  _handleFirstVisit({ currentStep, previousStep, finPlanId }) {
    const { dispatch } = this.props;
    // Update breadcrumb + create default other expenses:
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
        isCompleted: true
      }, finPlanId));
      dispatch(bulkCreateFinPlanOtherExpenses(defaultOtherRecurringExpenses, finPlanId));
    }
  }

  _addOtherExpense = () => {
    const { dispatch, finPlanId } = this.props;
    dispatch(createFinPlanOtherExpense(
      { data: finPlanSchemas[finPlanSchemaTypes.bill] },
      finPlanId
    ));
  }

  _updateItem = (data) => {
    const { dispatch, finPlanId } = this.props;
    if (data && finPlanId) {
      dispatch(updateFinPlanOtherExpense({ id: data.id, data }, finPlanId));
    }
  }

  _deleteOtherExpense = (expenseId) => {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanOtherExpense(expenseId, finPlanId));
  }

  _onClickBackButton = () => {
    const { dispatch, finPlanId, comments } = this.props;
    dispatch(updateFinPlanBillsComment(finPlanId, comments));
    forwardToFinPlanTransactions();
  }

  _onClickNextButton = () => {
    const { dispatch, finPlanId, comments } = this.props;
    dispatch(updateFinPlanBillsComment(finPlanId, comments));
    forwardToFinPlanQuestions();
  }

  _onChangeComment = (e) => {
    const { dispatch } = this.props;
    dispatch(updateFinPlanBillsCommentForStore(e.target.value));
  };

  render() {
    const {
      bills,
      dispatch,
      furthestStep,
      currentStep,
      isFetchingFinPlan,
      otherExpenses,
      isFetchingBills,
      comments,
      isFinPlanSubmitted
    } = this.props;

    // Configure Fieldsets Table
    const fieldsetsTableConfig = {
      fields,
      dispatch,
      fieldsets: bills,
      showSelectCarets: true
    };

    // Configure Other Expenses Table
    const otherTableHeight = tableHeight(get(otherExpenses, 'length', 0));

    const otherTableConfig = {
      items: otherExpenses,
      containerHeightOveride: otherTableHeight,
      columns: otherBillsColumns,
      idMapping,
      dispatch,
      rowHeight,
      allowEmpty: true,
      updateItem: this._updateItem,
      onCellClick: this._deleteOtherExpense,
      ignoreManualValues: true,
      uneditableFieldKey: 'type',
      schemaType: finPlanSchemaTypes.bill
    };

    return (
      <div>
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        <div className="lc-fin-plan-bills-page lc-fin-plan-page animated fadeIn">
          {/* <!--FORM--> */}
          <div className="lc-fin-plan-bills-page__content lc-table-dimensions-parent--width lc-table-dimensions-parent--height">
            {/* <!--NAV MENU -->  */}
            { isFinPlanSubmitted &&
              <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
            {/* <!--BREADCRUMB-->  */}
            {!isFetchingFinPlan &&
              <FinancialPlanBreadcrumb furthestStep={furthestStep}
                currentStep={currentStep} />
            }
            {/* <!--LOADING HEXAGON-->  */}
            { isFetchingFinPlan && <LoadingHexagon /> }

            {/* <!--HEADER--> */}
            <div className="lc-row row">
              <h1 className="lc-fin-plan-bills-page__header lc-fin-plan__header">
                {cms['finPlanBills.header']}
              </h1>
              <div className="lc-fin-plan-bills-page__text lc-fin-plan__subtitle">
                {cms['finPlanBills.text']}
              </div>
            </div>

            {/* <!--TABLE--> */}
            <div className="lc-fin-plan-page__table">
              {!isFetchingBills &&
                <FieldsetsTableComponent {...fieldsetsTableConfig} />
              }
            </div>

            {/* <!--OTHER EXPENSES--> */}
            {!isEmpty(otherExpenses) &&
              <div className="lc-row row lc-row--other-expenses lc-inline-table-dimensions-parent--height">
                <div className="lc-column columns small-12">
                  <h1 className="lc-fin-plan-bills-page__other-title">
                    {cms['finPlanBills.other-header']}
                  </h1>
                  <div className="lc-fin-plan-bills-page__text lc-fin-plan__subtitle">
                    {cms['finPlanBills.other-text']}
                  </div>
                  <div className="lc-fin-plan-page__table lc-fin-plan-bills-page__other-expense-table lc-inline-table-dimensions-parent--width">
                    <InlineEditTable {...otherTableConfig} />
                  </div>
                  <div className="lc-fin-plan-bills-page__other-expense">
                    <GenericButton className="lc-button--white"
                                   text={cms['finPlanBills.button.add-expense']}
                                   onClick={this._addOtherExpense} />
                  </div>
                </div>
              </div>
            }

            {/* <!--COMMENTS--> */}
            <div className="lc-row row lc-row-comments">
              <div className="lc-comments-title">
                {cms['comments.label']}
              </div>
              <div className="lc-comments-content">
                <textarea name={cms['comments.label']}
                          className="lc-comments-content-textarea"
                          placeholder={cms['finPlanBills.comments.placeholder']}
                          onChange={this._onChangeComment}
                          value={comments} />
              </div>
            </div>

            {/* <!--NAVIGATION BUTTONS--> */}
            <div className="lc-row row">
              <div className="lc-fin-plan__buttons">
                <GenericButton className="lc-button--left lc-button--white"
                                  text={cms['button.previous']}
                                  onClick={this._onClickBackButton} />
                <GenericButton className="lc-button--right lc-button--blue"
                                  text={cms['button.next']}
                                  onClick={this._onClickNextButton} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.finPlanBills,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanBills));
