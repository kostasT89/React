import {
        UPDATE_ASSET_FORM_TYPE,
        SUBMIT_FIN_PLAN_ASSET_FORM,
        SUBMIT_FIN_PLAN_ASSET_FORM_FAIL,
        UPDATE_FIN_PLAN_CURRENT_ASSET,
        UPLOAD_SUCCESS_RETIREMENT_ACCOUNT,
        SUBMIT_ADDITIONAL_ASSET_FORM,
        SUBMIT_ADDITIONAL_ASSET_FORM_FAIL,
      } from '../../constants/AppConstants';
import {
        createFinPlanAsset,
        updateFinPlanAsset,
        createAdditionalAsset,
        updateAdditionalAsset,
      } from '../global/finPlan/finPlanAssets';
import { parseCurrency } from '../../utils/parsingUtils';
import ModalType from '../../config/modalType';

/*-----------------------------------
  UPLOAD SUCCESS
-------------------------------------*/

export function uploadSuccess(currentFileName) {
  return {
    type: UPLOAD_SUCCESS_RETIREMENT_ACCOUNT,
    currentFileName,
  };
}

/*-----------------------------------
  UPDATE ASSET FORM TYPE
-------------------------------------*/

export function updateAssetFormType(assetFormType) {
  return {
    type: UPDATE_ASSET_FORM_TYPE,
    assetFormType,
  };
}

/*-----------------------------------
  UPDATE CURRENT ASSET
-------------------------------------*/

export function updateCurrentAsset(currentAsset) {
  return {
    type: UPDATE_FIN_PLAN_CURRENT_ASSET,
    currentAsset,
  };
}


/*-----------------------------------
  SUBMIT FORM
-------------------------------------*/

export function submitFinPlanAssetFormRequest() {
  return {
    type: SUBMIT_FIN_PLAN_ASSET_FORM,
  };
}

export function submitFinPlanAssetFormFail() {
  return {
    type: SUBMIT_FIN_PLAN_ASSET_FORM_FAIL
  };
}

export const submitFinPlanAssetForm = ({
  formValues,
  isNewAsset,
  finPlanId,
}) => async (dispatch) => {
  try {
    const asset = {
      data: {
        ...formValues,
      },
      id: formValues.id,
      finPlanId,
    };
    if (isNewAsset) {
      dispatch(createFinPlanAsset(asset, finPlanId));
    }
    else {
      dispatch(updateFinPlanAsset(asset, finPlanId));
    }
    dispatch(submitFinPlanAssetFormRequest(asset));
  }
  catch (err) {
    dispatch(submitFinPlanAssetFormFail(err));
  }
};

/*-----------------------------------
  SUBMIT ADDITIONAL ASSET FORM
-------------------------------------*/

export function submitAdditionalAssetFormRequest() {
  return {
    type: SUBMIT_ADDITIONAL_ASSET_FORM,
  };
}

export function submitAdditionalAssetFormFail() {
  return {
    type: SUBMIT_ADDITIONAL_ASSET_FORM_FAIL
  };
}

export const submitAdditionalAssetForm = (additionalAsset, modalType, id) => async (dispatch) => {
  try {
    const asset = {
      property: additionalAsset.property,
      estimatedValue: parseCurrency(additionalAsset.estimatedValue)
    };
    dispatch(modalType === ModalType.additionalAssetAdd ?
      createAdditionalAsset(asset) : updateAdditionalAsset(id, asset));
    dispatch(submitAdditionalAssetFormRequest());
  }
  catch (err) {
    dispatch(submitAdditionalAssetFormFail(err));
  }
};
