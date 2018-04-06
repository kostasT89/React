import { handleErrors } from '../../utils/fetchUtils';
import { convertMomentToUtcAndFormat } from '../../utils/dateUtils';
import { sortFinanceSummary } from '../../utils/financeUtils';
import {
        createTransactionsSummaryRequest
      } from '../../api/global/analysisApi';
import {
  CREATE_FINANCE_SUMMARY_SUCCESS,
  CREATE_FINANCE_SUMMARY_FAIL,
  CREATE_COMPARISON_SUMMARY_SUCCESS,
  CREATE_COMPARISON_SUMMARY_FAIL
} from '../../constants/AppConstants';


/*-----------------------------------
  CREATE FINANCE SUMMARY
-------------------------------------*/
export function createFinanceSummarySuccess(summary) {
  return {
    type: CREATE_FINANCE_SUMMARY_SUCCESS,
    summary
  };
}

export function createFinanceSummaryFail(err) {
  return {
    type: CREATE_FINANCE_SUMMARY_FAIL,
    err
  };
}

export const createFinanceSummary = ({
  dateStart,
  dateEnd
}) => async (dispatch) => {
  try {
    const response = await createTransactionsSummaryRequest({
      dateStart: convertMomentToUtcAndFormat(dateStart),
      dateEnd: convertMomentToUtcAndFormat(dateEnd)
    });

    handleErrors(response);
    const json = await response.json();

    const { summary } = json.summaryData;
    const {
      income,
      uncategorizedIncome,
      recurringCharges,
      livingExpenses,
      uncategorizedExpenses,
      savingsTransfers,
      transfers
    } = sortFinanceSummary(summary);
    dispatch(createFinanceSummarySuccess({
      income,
      uncategorizedIncome,
      recurringCharges,
      livingExpenses,
      uncategorizedExpenses,
      savingsTransfers,
      transfers
    }));
  }
  catch (err) {
    dispatch(createFinanceSummaryFail(err));
  }
};

/*-----------------------------------
  CREATE COMPARISON SUMMARY
-------------------------------------*/
export function createComparisonSummarySuccess(summary) {
  return {
    type: CREATE_COMPARISON_SUMMARY_SUCCESS,
    summary
  };
}

export function createComparisonSummaryFail(err) {
  return {
    type: CREATE_COMPARISON_SUMMARY_FAIL,
    err
  };
}

export const createComparisonSummary = ({
  dateStart,
  dateEnd
}) => async (dispatch) => {
  try {
    const response = await createTransactionsSummaryRequest({
      dateStart: convertMomentToUtcAndFormat(dateStart),
      dateEnd: convertMomentToUtcAndFormat(dateEnd)
    });

    handleErrors(response);
    const json = await response.json();

    const { summary } = json.summaryData;
    const {
      income,
      uncategorizedIncome,
      recurringCharges,
      livingExpenses,
      uncategorizedExpenses,
      savingsTransfers,
      transfers
    } = sortFinanceSummary(summary);
    dispatch(createComparisonSummarySuccess({
      income,
      uncategorizedIncome,
      recurringCharges,
      livingExpenses,
      uncategorizedExpenses,
      savingsTransfers,
      transfers
    }));
  }
  catch (err) {
    dispatch(createComparisonSummaryFail(err));
  }
};
