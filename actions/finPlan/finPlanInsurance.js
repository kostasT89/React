import {
        SHOW_INSURANCE_FORM,
        SUBMIT_INSURANCE_FORM,
        SUBMIT_INSURANCE_FORM_FAIL,
        UPDATE_CURRENT_INSURANCE_POLICY
      } from '../../constants/AppConstants';

import {
      createFinPlanInsurance,
      updateFinPlanInsurance,
    } from '../global/finPlan/finPlanInsurance';

/*-----------------------------------
  UPDATE CURRENT INSURANCE POLICY
  -------------------------------------*/
export function updateCurrentInsurancePolicy(policy) {
  return {
    type: UPDATE_CURRENT_INSURANCE_POLICY,
    policy,
  };
}


/*-----------------------------------
  SHOW INSURANCE FORM
-------------------------------------*/
export function showInsuranceForm(formType) {
  return {
    type: SHOW_INSURANCE_FORM,
    formType,
  };
}

/*-----------------------------------
  SUBMIT INSURANCE FORM
-------------------------------------*/
export function submitFinPlanInsuranceFormRequest() {
  return {
    type: SUBMIT_INSURANCE_FORM
  };
}

export function submitFinPlanInsuranceFormFail() {
  return {
    type: SUBMIT_INSURANCE_FORM_FAIL
  };
}

export const submitFinPlanInsuranceForm = ({
  formType,
  formValues,
  isNewInsurancePolicy,
  finPlanId,
}) => async (dispatch) => {
  try {
    const insurancePolicy = {
      data: {
        ...formValues,
        type: formType,
      },
      id: formValues.id,
      finPlanId,
    };
    if (isNewInsurancePolicy) {
      dispatch(createFinPlanInsurance(insurancePolicy, finPlanId));
    }
    else {
      dispatch(updateFinPlanInsurance(insurancePolicy, finPlanId));
    }
    dispatch(submitFinPlanInsuranceFormRequest(insurancePolicy));
  }
  catch (err) {
    dispatch(submitFinPlanInsuranceFormFail(err));
  }
};
