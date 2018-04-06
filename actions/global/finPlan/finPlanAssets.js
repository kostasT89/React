import { handleErrors } from '../../../utils/fetchUtils';
import {
        createFinPlanAssetRequest,
        updateFinPlanAssetRequest,
        deleteFinPlanAssetRequest,
        createAdditionalAssetRequest,
        updateAdditionalAssetRequest,
        deleteAdditionalAssetRequest,
        getAdditionalAssetsRequest,
      } from '../../../api/global/finPlan/finPlanAssetApi';
import {
        CREATE_FIN_PLAN_ASSET_SUCCESS,
        CREATE_FIN_PLAN_ASSET_FAIL,
        UPDATE_FIN_PLAN_ASSET_SUCCESS,
        UPDATE_FIN_PLAN_ASSET_FAIL,
        DELETE_FIN_PLAN_ASSET_SUCCESS,
        DELETE_FIN_PLAN_ASSET_FAIL,
        TOOGLE_ADD_ADDITIONAL_ASSET_MODAL,
        UPDATE_ADDITIONAL_ASSET_MODAL_TYPE,
        SET_SELECTED_ADDITIONAL_ASSET,
        RESET_REQUEST_SUCCESS,
        CREATE_ADDITIONAL_ASSET_SUCCESS,
        CREATE_ADDITIONAL_ASSET_FAIL,
        UPDATE_ADDITIONAL_ASSET_SUCCESS,
        UPDATE_ADDITIONAL_ASSET_FAIL,
        DELETE_ADDITIONAL_ASSET_SUCCESS,
        DELETE_ADDITIONAL_ASSET_FAIL,
        GET_ADDITIONAL_ASSETS_SUCCESS,
        GET_ADDITIONAL_ASSETS_FAIL,
        TOGGLE_FIN_PLAN_ASSET_CREATION_IN_PROGRESS
      } from '../../../constants/AppConstants';

/*-----------------------------------
  CREATE FIN PLAN ASSET
-------------------------------------*/
function _toggleCreationInProgress() {
  return {
    type: TOGGLE_FIN_PLAN_ASSET_CREATION_IN_PROGRESS
  };
}

export function createFinPlanAssetSuccess(asset) {
  return {
    type: CREATE_FIN_PLAN_ASSET_SUCCESS,
    asset,
  };
}

export function createFinPlanAssetFail() {
  return {
    type: CREATE_FIN_PLAN_ASSET_FAIL,
  };
}

export const createFinPlanAsset = (asset, finPlanId) => async (dispatch) => {
  try {
    dispatch(_toggleCreationInProgress());
    const response = await createFinPlanAssetRequest(asset, finPlanId);

    handleErrors(response);
    const json = await response.json();

    const createdAsset = json.assetData.asset;
    dispatch(createFinPlanAssetSuccess(createdAsset));
    dispatch(_toggleCreationInProgress());
  }
  catch (err) {
    dispatch(createFinPlanAssetFail(err));
    dispatch(_toggleCreationInProgress());
  }
};

/*-----------------------------------
  UPDATE FIN PLAN ASSET
-------------------------------------*/
export function updateFinPlanAssetSuccess(asset) {
  return {
    type: UPDATE_FIN_PLAN_ASSET_SUCCESS,
    asset,
  };
}

export function updateFinPlanAssetFail() {
  return {
    type: UPDATE_FIN_PLAN_ASSET_FAIL,
  };
}

export const updateFinPlanAsset = (asset, finPlanId) => async (dispatch) => {
  try {
    const response = await updateFinPlanAssetRequest(asset, finPlanId);

    handleErrors(response);
    dispatch(updateFinPlanAssetSuccess(asset));
  }
  catch (err) {
    dispatch(updateFinPlanAssetFail(err));
  }
};

/*-----------------------------------
  DELETE FIN PLAN ASSET
-------------------------------------*/
export function deleteFinPlanAssetSuccess(id) {
  return {
    type: DELETE_FIN_PLAN_ASSET_SUCCESS,
    id
  };
}

export function deleteFinPlanAssetFail() {
  return {
    type: DELETE_FIN_PLAN_ASSET_FAIL,
  };
}

export const deleteFinPlanAsset = (id, finPlanId) => async (dispatch) => {
  try {
    const response = await deleteFinPlanAssetRequest(id, finPlanId);

    handleErrors(response);
    dispatch(deleteFinPlanAssetSuccess(id));
  }
  catch (err) {
    dispatch(deleteFinPlanAssetFail(err));
  }
};

/*-----------------------------------
  UPDATE ADDITIONAL ASSET MODAL FLAG
-------------------------------------*/
export function toggleAddAdditionalAssetModal(isAssetModalOpen) {
  return {
    type: TOOGLE_ADD_ADDITIONAL_ASSET_MODAL,
    isAssetModalOpen,
  };
}

/*-----------------------------------
  UPDATE ADDITIONAL ASSET MODAL TYPE
-------------------------------------*/
export function setAdditionalAssetModalType(modalType) {
  return {
    type: UPDATE_ADDITIONAL_ASSET_MODAL_TYPE,
    modalType,
  };
}

/*-----------------------------------
  SET SELECTED ADDITIONAL ASSET
-------------------------------------*/
export function setSelectedAdditionalAsset(id, property, estimatedValue) {
  return {
    type: SET_SELECTED_ADDITIONAL_ASSET,
    additionalAsset: {
      id,
      property,
      estimatedValue
    },
  };
}

/*-----------------------------------
  RESET REQUEST SUCCESS FLAG
-------------------------------------*/
export function resetRequestSuccess() {
  return {
    type: RESET_REQUEST_SUCCESS,
  };
}

/*-----------------------------------
  CREATE ADDITIONAL ASSET ACTIONS
-------------------------------------*/
export function createAdditionalAssetSuccess(additionalAsset) {
  return {
    type: CREATE_ADDITIONAL_ASSET_SUCCESS,
    additionalAsset,
  };
}

export function createAdditionalAssetFail(error) {
  return {
    type: CREATE_ADDITIONAL_ASSET_FAIL,
    error,
  };
}

export const createAdditionalAsset = additionalAsset => async(dispatch) => {
  try {
    const response = await createAdditionalAssetRequest(additionalAsset);

    handleErrors(response);
    const json = await response.json();
    const createdAdditionalAsset = json.additionalAsetData.additionalAsset;
    dispatch(createAdditionalAssetSuccess(createdAdditionalAsset));
  }
  catch (err) {
    dispatch(createAdditionalAssetFail(err));
  }
};

/*-----------------------------------
  UPDATE ADDITIONAL ASSET ACTIONS
-------------------------------------*/
export function updateAdditionalAssetSuccess(additionalAsset) {
  return {
    type: UPDATE_ADDITIONAL_ASSET_SUCCESS,
    additionalAsset,
  };
}

export function updateAdditionalAssetFail(error) {
  return {
    type: UPDATE_ADDITIONAL_ASSET_FAIL,
    error,
  };
}

export const updateAdditionalAsset = (assetId, additionalAsset) => async(dispatch) => {
  try {
    const response = await updateAdditionalAssetRequest(assetId, additionalAsset);

    handleErrors(response);
    const json = await response.json();
    const updatedAdditionalAsset = json.additionalAssetData.updatedAdditionalAsset;
    dispatch(updateAdditionalAssetSuccess(updatedAdditionalAsset));
  }
  catch (err) {
    dispatch(updateAdditionalAssetFail(err));
  }
};

/*-----------------------------------
  DELETE ADDITIONAL ASSET ACTIONS
-------------------------------------*/
export function deleteAdditionalAssetSuccess(assetId) {
  return {
    type: DELETE_ADDITIONAL_ASSET_SUCCESS,
    assetId,
  };
}

export function deleteAdditionalAssetFail(error) {
  return {
    type: DELETE_ADDITIONAL_ASSET_FAIL,
    error,
  };
}

export const deleteAdditionalAsset = assetId => async(dispatch) => {
  try {
    const response = await deleteAdditionalAssetRequest(assetId);

    handleErrors(response);
    dispatch(deleteAdditionalAssetSuccess(assetId));
  }
  catch (err) {
    dispatch(deleteAdditionalAssetFail(err));
  }
};

/*-----------------------------------
  GET ADDITIONAL ASSETS ACTIONS
-------------------------------------*/
export function getAdditionalAssetsSuccess(additionalAssets) {
  return {
    type: GET_ADDITIONAL_ASSETS_SUCCESS,
    additionalAssets,
  };
}

export function getAdditionalAssetsFail(error) {
  return {
    type: GET_ADDITIONAL_ASSETS_FAIL,
    error,
  };
}

export const getAdditionalAssets = () => async(dispatch) => {
  try {
    const response = await getAdditionalAssetsRequest();

    handleErrors(response);
    const json = await response.json();
    const additionalAssets = json.additionalAssetData.additionalAssets;
    dispatch(getAdditionalAssetsSuccess(additionalAssets));
  }
  catch (err) {
    dispatch(getAdditionalAssetsFail(err));
  }
};
