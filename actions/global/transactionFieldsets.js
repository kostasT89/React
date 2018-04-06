import yodleeTransactionTypes from '../../constants/enums/yodleeTransactionTypes';
import yodleeCategories from '../../constants/enums/yodleeCategories';
import baseTypes from '../../constants/enums/baseTypes';
import { handleErrors } from '../../utils/fetchUtils';
import { convertMomentToUtcAndFormat } from '../../utils/dateUtils';
import { defaultDateFormat } from '../../config/properties';
import {
        upsertFieldsetRequest,
        importBillsRequest,
        importIncomesRequest,
        predictFieldsetsRequest
      } from '../../api/global/transactionFieldsetsApi';
import {
          UPSERT_TRANSACTION_FIELDSET,
          UPSERT_TRANSACTION_FIELDSET_SUCCESS,
          UPSERT_TRANSACTION_FIELDSET_FAIL,
          IMPORT_BILLS_SUCCESS,
          IMPORT_BILLS_FAIL,
          IMPORT_INCOMES_SUCCESS,
          IMPORT_INCOMES_FAIL,
          PREDICT_BILLS_SUCCESS,
          PREDICT_BILLS_FAIL
        } from '../../constants/AppConstants';

/*-----------------------------------
  UPSERT TRANSACTION FIELDSET
-------------------------------------*/
export function upsertTransactionFieldsetSuccess(transactions) {
  return {
    type: UPSERT_TRANSACTION_FIELDSET_SUCCESS,
    transactions
  };
}

export function upsertTransactionFieldsetFail(err) {
  return {
    type: UPSERT_TRANSACTION_FIELDSET_FAIL,
    err
  };
}

export function upsertTransactionFieldsetRequest() {
  return {
    type: UPSERT_TRANSACTION_FIELDSET
  };
}

export const upsertTransactionFieldset = (fieldset) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await upsertFieldsetRequest(fieldset);

    handleErrors(response);
    dispatch(upsertTransactionFieldsetSuccess());
  }
  catch (err) {
    dispatch(upsertTransactionFieldsetFail(err));
  }
};

/*-----------------------------------
  IMPORT BILLS
-------------------------------------*/
export function importBillsSuccess() {
  return {
    type: IMPORT_BILLS_SUCCESS,
  };
}

export function importBillsFail(err) {
  return {
    type: IMPORT_BILLS_FAIL,
    err
  };
}

export const importBills = ({
  dateStart,
  dateEnd
}) => async (dispatch) => { // eslint-disable-line
  try {
    // Dates must be UTC
    const dateStartFormatted = convertMomentToUtcAndFormat(dateStart, defaultDateFormat);
    const dateEndFormatted = convertMomentToUtcAndFormat(dateEnd, defaultDateFormat);
    const response = await importBillsRequest({
      dateStart: dateStartFormatted,
      dateEnd: dateEndFormatted,
      transactionType: yodleeTransactionTypes.payment,
    });

    handleErrors(response);
    dispatch(importBillsSuccess());
  }
  catch (err) {
    dispatch(importBillsFail(err));
  }
};

/*-----------------------------------
  IMPORT INCOME
-------------------------------------*/
export function importIncomesSuccess() {
  return {
    type: IMPORT_INCOMES_SUCCESS,
  };
}

export function importIncomesFail(err) {
  return {
    type: IMPORT_INCOMES_FAIL,
    err
  };
}

export const importIncomes = ({
  dateStart,
  dateEnd
}) => async (dispatch) => { // eslint-disable-line
  try {
    const response = await importIncomesRequest({
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
      category: [yodleeCategories.otherIncome, yodleeCategories.salaryRegularIncome],
    });

    handleErrors(response);
    dispatch(importIncomesSuccess());
  }
  catch (err) {
    dispatch(importIncomesFail(err));
  }
};


/*-----------------------------------
  GET PREDICTED BILLS
-------------------------------------*/
export function predictBillsSuccess(predictedBills) {
  return {
    type: PREDICT_BILLS_SUCCESS,
    predictedBills
  };
}

export function predictBillsFail(err) {
  return {
    type: PREDICT_BILLS_FAIL,
    err
  };
}

export const predictBills = () => async (dispatch) => { // eslint-disable-line
  try {
    const response = await predictFieldsetsRequest({
      baseType: baseTypes.debit,
    });

    handleErrors(response);
    const json = await response.json();

    const { fieldsets } = json.fieldsetsData;
    dispatch(predictBillsSuccess(fieldsets));
  }
  catch (err) {
    dispatch(predictBillsFail(err));
  }
};
