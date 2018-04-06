import get from 'lodash/get';
import {
        getFieldsetsRequest,
        upsertFieldsetRequest
      } from '../api/global/transactionFieldsetsApi';
import {
        createBillSummaryRequest,
        createIncomeSummaryRequest
      } from '../api/global/analysisApi';
import { convertMomentToUtcAndFormat } from '../utils/dateUtils';
import { handleErrors } from '../utils/fetchUtils';
import { defaultDateFormat } from '../config/properties';
import {
          GET_BILL_FIELDSETS_SUCCESS,
          GET_BILL_FIELDSETS_FAIL,
          GET_INCOME_FIELDSETS_SUCCESS,
          GET_INCOME_FIELDSETS_FAIL,
          CREATE_INCOME_SUMMARY_SUCCESS,
          CREATE_INCOME_SUMMARY_FAIL,
          CREATE_BILL_SUMMARY_SUCCESS,
          CREATE_BILL_SUMMARY_FAIL,
          BILLS_NOT_FOUND,
          INCOMES_NOT_FOUND,
          UPDATE_BILL,
          UPDATE_INCOME
        } from '../constants/AppConstants';
import baseTypes from '../constants/enums/baseTypes';

/*-----------------------------------
  GET BILL FIELDSETS
-------------------------------------*/
export function getBillFieldsetsSuccess(bills) {
  return {
    type: GET_BILL_FIELDSETS_SUCCESS,
    bills
  };
}

export function getBillFieldsetsFail(err) {
  return {
    type: GET_BILL_FIELDSETS_FAIL,
    err
  };
}

export const getBillFieldsets = () => async (dispatch) => {
  try {
    const response = await getFieldsetsRequest({
      baseType: baseTypes.debit
    });

    handleErrors(response);

    const json = await response.json();

    const fieldsets = get(json, 'fieldsetsData.fieldsets');
    dispatch(getBillFieldsetsSuccess(fieldsets));
  }
  catch (err) {
    dispatch(getBillFieldsetsFail(err));
  }
};

/*-----------------------------------
  GET INCOME FIELDSETS
-------------------------------------*/
export function getIncomeFieldsetsSuccess(income) {
  return {
    type: GET_INCOME_FIELDSETS_SUCCESS,
    income
  };
}

export function getIncomeFieldsetsFail(err) {
  return {
    type: GET_INCOME_FIELDSETS_FAIL,
    err
  };
}

export const getIncomeFieldsets = () => async (dispatch) => {
  try {
    const response = await getFieldsetsRequest({
      baseType: baseTypes.credit
    });

    handleErrors(response);

    const json = await response.json();

    const { fieldsets } = json.fieldsetsData;
    dispatch(getIncomeFieldsetsSuccess(fieldsets));
  }
  catch (err) {
    dispatch(getIncomeFieldsetsFail(err));
  }
};

/*-----------------------------------
  CREATE BILL SUMMARY
-------------------------------------*/
export function createBillSummarySuccess(summary) {
  return {
    type: CREATE_BILL_SUMMARY_SUCCESS,
    summary
  };
}

export function createBillSummaryFail(err) {
  return {
    type: CREATE_BILL_SUMMARY_FAIL,
    err
  };
}

export const createBillSummary = ({ dateStart, dateEnd }) => async (dispatch) => {
  try {
    const response = await createBillSummaryRequest({
       // Must be UTC
      dateStart: convertMomentToUtcAndFormat(
        dateStart,
        defaultDateFormat
      ),
      // Must be UTC
      dateEnd: convertMomentToUtcAndFormat(
        dateEnd,
        defaultDateFormat
      ),
    });

    handleErrors(response);
    const json = await response.json();

    const { summaryData } = json;
    dispatch(createBillSummarySuccess(summaryData));
  }
  catch (err) {
    dispatch(createBillSummaryFail(err));
  }
};

/*-----------------------------------
  CREATE INCOME SUMMARY
-------------------------------------*/

export function createIncomeSummarySuccess(summary) {
  return {
    type: CREATE_INCOME_SUMMARY_SUCCESS,
    summary
  };
}

export function createIncomeSummaryFail(err) {
  return {
    type: CREATE_INCOME_SUMMARY_FAIL,
    err
  };
}

export const createIncomeSummary = ({
  dateStart,
  dateEnd
}) => async (dispatch) => {
  try {
    const response = await createIncomeSummaryRequest({
       // Must be UTC
      dateStart: convertMomentToUtcAndFormat(
        dateStart,
        defaultDateFormat
      ),
      // Must be UTC
      dateEnd: convertMomentToUtcAndFormat(
        dateEnd,
        defaultDateFormat
      )
    });

    handleErrors(response);
    const json = await response.json();

    const { summaryData } = json;
    dispatch(createIncomeSummarySuccess(summaryData));
  }
  catch (err) {
    dispatch(createIncomeSummaryFail(err));
  }
};

/*-----------------------------------
  NO BILLS FOUND
-------------------------------------*/
export function noBillsFound() {
  return {
    type: BILLS_NOT_FOUND
  };
}

/*-----------------------------------
  NO INCOME FOUND
-------------------------------------*/
export function noIncomesFound() {
  return {
    type: INCOMES_NOT_FOUND
  };
}

/*-----------------------------------
  UPDATE BILL
-------------------------------------*/
export function updateBill(bill) {
  upsertFieldsetRequest(bill);
  return {
    type: UPDATE_BILL,
    bill
  };
}

/*-----------------------------------
  UPDATE INCOME
-------------------------------------*/
export function updateIncome(income) {
  upsertFieldsetRequest(income);
  return {
    type: UPDATE_INCOME,
    income
  };
}
