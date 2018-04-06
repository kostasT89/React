import find from 'lodash/find';
import {
        GET_USER_SUCCESS,
        GET_FIN_PLAN_SUCCESS,
        UPDATE_ASSET_FORM_TYPE,
        GET_ENABLED_ACCOUNTS_SUCCESS,
        CREATE_FIN_PLAN_ASSET_SUCCESS,
        CREATE_FIN_PLAN_ASSET_FAIL,
        UPDATE_FIN_PLAN_ASSET_SUCCESS,
        UPDATE_FIN_PLAN_ASSET_FAIL,
        UPDATE_FIN_PLAN_CURRENT_ASSET,
        DELETE_FIN_PLAN_ASSET_SUCCESS,
        DELETE_FIN_PLAN_ASSET_FAIL,
        SUBMIT_FIN_PLAN_ASSET_FORM,
        SUBMIT_FIN_PLAN_ASSET_FORM_FAIL,
        CHANGE_FORM_FIELD_TYPE, OTHER_PLEASE_TYPE,
        UPLOAD_SUCCESS_RETIREMENT_ACCOUNT,
        TOOGLE_ADD_ADDITIONAL_ASSET_MODAL,
        UPDATE_ADDITIONAL_ASSET_MODAL_TYPE,
        SET_SELECTED_ADDITIONAL_ASSET,
        RESET_REQUEST_SUCCESS,
        SUBMIT_ADDITIONAL_ASSET_FORM,
        SUBMIT_ADDITIONAL_ASSET_FORM_FAIL,
        CREATE_ADDITIONAL_ASSET_SUCCESS,
        CREATE_ADDITIONAL_ASSET_FAIL,
        UPDATE_ADDITIONAL_ASSET_SUCCESS,
        UPDATE_ADDITIONAL_ASSET_FAIL,
        DELETE_ADDITIONAL_ASSET_SUCCESS,
        DELETE_ADDITIONAL_ASSET_FAIL,
        GET_ADDITIONAL_ASSETS_SUCCESS,
        GET_ADDITIONAL_ASSETS_FAIL,
        TOGGLE_FIN_PLAN_ASSET_CREATION_IN_PROGRESS,
      } from '../../constants/AppConstants';
import accountTypes from '../../constants/enums/accountTypes';

const initialState = {
  assets: [],
  additionalAssets: [],
  accounts: [],
  fieldTypes: {},
  currentAsset: null,
  assetFormType: 'BANK',
  currentFileName: '',
  isAssetModalOpen: false,
  formIsLoading: false,
  isRequestSuccess: true, // API Request is failed : false, success : true
  creationInProgress: false,
  modalType: '',
  selectedAdditionalAsset: {
    id: '',
    property: '',
    estimatedValue: '',
  }
};

const actionMappings = {
  [GET_USER_SUCCESS]: '_receiveUserData',
  [UPDATE_ASSET_FORM_TYPE]: '_updateAssetFormType',
  [GET_FIN_PLAN_SUCCESS]: '_receiveFinPlanAssets',
  [GET_ENABLED_ACCOUNTS_SUCCESS]: '_getAccountsSuccess',
  [CREATE_FIN_PLAN_ASSET_FAIL]: '_handleServerError',
  [UPDATE_FIN_PLAN_CURRENT_ASSET]: '_updateFinPlanCurrentAsset',
  [UPDATE_FIN_PLAN_ASSET_SUCCESS]: '_updateFinPlanAssetSuccess',
  [UPDATE_FIN_PLAN_ASSET_FAIL]: '_handleServerError',
  [DELETE_FIN_PLAN_ASSET_SUCCESS]: '_deleteFinPlanAssetSuccess',
  [DELETE_FIN_PLAN_ASSET_FAIL]: '_handleServerError',
  [SUBMIT_FIN_PLAN_ASSET_FORM]: '_submitFinPlanAssetForm',
  [CREATE_FIN_PLAN_ASSET_SUCCESS]: '_createFinPlanAssetSuccess',
  [SUBMIT_FIN_PLAN_ASSET_FORM_FAIL]: '_submitFinPlanAssetFormFail',
  [UPLOAD_SUCCESS_RETIREMENT_ACCOUNT]: '_uploadSuccessRetirmentAccount',
  [CHANGE_FORM_FIELD_TYPE]: '_changeFormFieldType',
  [TOOGLE_ADD_ADDITIONAL_ASSET_MODAL]: '_updateAssetModalFlag',
  [UPDATE_ADDITIONAL_ASSET_MODAL_TYPE]: '_updateAssetModalType',
  [SET_SELECTED_ADDITIONAL_ASSET]: '_setSelectedAdditionalAsset',
  [RESET_REQUEST_SUCCESS]: '_resetRequestSuccess',
  [SUBMIT_ADDITIONAL_ASSET_FORM]: '_submitAdditionalAssetForm',
  [SUBMIT_ADDITIONAL_ASSET_FORM_FAIL]: '_submitAdditionalAssetFormFail',
  [CREATE_ADDITIONAL_ASSET_SUCCESS]: '_createAdditionalAssetSuccess',
  [CREATE_ADDITIONAL_ASSET_FAIL]: '_handleServerError',
  [UPDATE_ADDITIONAL_ASSET_SUCCESS]: '_updateAdditionalAssetSuccess',
  [UPDATE_ADDITIONAL_ASSET_FAIL]: '_handleServerError',
  [DELETE_ADDITIONAL_ASSET_SUCCESS]: '_deleteAdditionalAssetSuccess',
  [DELETE_ADDITIONAL_ASSET_FAIL]: '_handleServerError',
  [GET_ADDITIONAL_ASSETS_SUCCESS]: '_getAdditionalAssetsSuccess',
  [GET_ADDITIONAL_ASSETS_FAIL]: '_handleServerError',
  [TOGGLE_FIN_PLAN_ASSET_CREATION_IN_PROGRESS]: '_toggleCreationInProgress',
};

const reducer = {
  _receiveUserData(state, action) {
    return {
      ...state,
      user: action.userData
    };
  },

  _changeFormFieldType(state, { fieldName }) {
    return {
      ...state,
      fieldTypes: {
        ...state.fieldTypes,
        [fieldName]: state.fieldTypes[fieldName] === OTHER_PLEASE_TYPE ? null : OTHER_PLEASE_TYPE
      }
    };
  },

  _uploadSuccessRetirmentAccount(state, { currentFileName }) {
    return {
      ...state,
      currentFileName
    };
  },

  _submitFinPlanAssetForm(state) {
    return {
      ...state,
      formIsLoading: true
    };
  },

  _submitFinPlanAssetFormFail(state) {
    return {
      ...state,
      formIsLoading: false
    };
  },

  _submitAdditionalAssetForm(state) {
    return {
      ...state,
      formIsLoading: true
    };
  },

  _submitAdditionalAssetFormFail(state) {
    return {
      ...state,
      formIsLoading: false
    };
  },

  _receiveFinPlanAssets(state, { finPlan: { finPlanAssets } }) {
    const newAssets = finPlanAssets.map(asset => ({
      ...asset.data,
      id: asset.id,
      finPlanId: asset.finPlanId,
    }));

    const newAccounts = state.accounts.map((account) => {
      const accountOn = find(newAssets, {
        yodleeId: account.id
      });
      if (accountOn) {
        return {
          ...account,
          value: true,
          fisecalId: accountOn.id
        };
      }
      return {
        ...account
      };
    });

    return {
      ...state,
      assets: newAssets,
      accounts: newAccounts,
    };
  },

  _updateAssetFormType(state, { assetFormType }) {
    return {
      ...state,
      fieldTypes: assetFormType === state.assetFormType ? state.fieldTypes : {},
      currentAsset: null,
      assetFormType,
    };
  },

  _updateAssetModalFlag(state, { isAssetModalOpen }) {
    return {
      ...state,
      isAssetModalOpen
    };
  },

  _updateAssetModalType(state, { modalType }) {
    return {
      ...state,
      modalType
    };
  },

  _setSelectedAdditionalAsset(state, { additionalAsset }) {
    return {
      ...state,
      selectedAdditionalAsset: additionalAsset
    };
  },

  _resetRequestSuccess(state) {
    return {
      ...state,
      isRequestSuccess: true
    };
  },

  _getAccountsSuccess(state, { enabledYodleeAccounts }) {
    const bank = enabledYodleeAccounts.filter(acct => acct.CONTAINER === accountTypes.bank);
    const investment = enabledYodleeAccounts.filter(acct =>
      acct.CONTAINER === accountTypes.investment);
    const loans = enabledYodleeAccounts.filter(acct => acct.CONTAINER === accountTypes.loan);
    let updatedAccounts = [].concat(bank, investment);
    updatedAccounts = updatedAccounts.map((account) => {
      // default all accounts to on
      const accountOn = find(state.assets, {
        yodleeId: account.id
      });
      if (accountOn) {
        return {
          ...account,
          value: true,
          fisecalId: accountOn.id
        };
      }
      return account;
    });

    return {
      ...state,
      accounts: updatedAccounts,
      loanAccounts: loans
    };
  },

  _handleServerError(state, action) {
    const { error } = action;
    return {
      ...state,
      error,
      fieldTypes: {},
      currentAsset: null,
      formIsLoading: false,
      tableIsLoading: false,
      currentFileName: '',
      isRequestSuccess: false,
    };
  },

  _updateFinPlanCurrentAsset(state, { currentAsset }) {
    return {
      ...state,
      currentAsset,
    };
  },

  _deleteFinPlanAssetSuccess(state, action) {
    const { id } = action;
    const asset = find(state.assets, { id });
    const assets = state.assets.filter(value => (value.id !== id));

    const accounts = state.accounts.map((account) => {
      if (asset.yodleeId && account.id === asset.yodleeId) {
        return {
          ...account,
          value: false,
          fisecalId: null
        };
      }
      return { ...account };
    });
    return {
      ...state,
      assets,
      accounts,
      fieldTypes: {},
      currentAsset: null,
      formIsLoading: false,
      tableIsLoading: false,
      currentFileName: '',
    };
  },

  _createFinPlanAssetSuccess(state, action) {
    const { asset, asset: { data: { yodleeId } } } = action;

    const assets = [...state.assets, {
      ...asset.data,
      finPlanId: asset.finPlanId,
      id: asset.id,
    }];

    const newAccounts = state.accounts.map((account) => {
      if (yodleeId && account.id === yodleeId) {
        return {
          ...account,
          value: true,
          fisecalId: asset.id
        };
      }
      return { ...account };
    });
    return {
      ...state,
      assets,
      fieldTypes: {},
      currentAsset: null,
      accounts: newAccounts,
      formIsLoading: false,
      tableIsLoading: false,
      currentFileName: '',
    };
  },

  _updateFinPlanAssetSuccess(state, action) {
    const { asset } = action;
    // Replace old  with updated one:
    const assets = state.assets.map(a => (
      a.id === asset.id ? {
        ...asset.data,
        finPlanId: asset.finPlanId,
        id: asset.id,
      } : a
    ));
    return {
      ...state,
      assets,
      fieldTypes: {},
      currentAsset: null,
      formIsLoading: false, // In process : true, finished : false
      tableIsLoading: false,
      currentFileName: '',
    };
  },

  // Additional Assets Reducers
  _createAdditionalAssetSuccess(state, action) {
    const { additionalAsset } = action;
    const additionalAssets = [
      ...state.additionalAssets,
      additionalAsset
    ];
    return {
      ...state,
      additionalAssets,
      formIsLoading: false,
      isRequestSuccess: true,
    };
  },

  _updateAdditionalAssetSuccess(state, action) {
    const { additionalAsset } = action;
    const additionalAssets = state.additionalAssets.map(asset => (
      additionalAsset.id === asset.id ? additionalAsset : asset
    ));
    return {
      ...state,
      additionalAssets,
      formIsLoading: false,
      isRequestSuccess: true,
    };
  },

  _deleteAdditionalAssetSuccess(state, action) {
    const { assetId } = action;
    const additionalAssets = state.additionalAssets.filter(asset => (assetId !== asset.id));
    return {
      ...state,
      additionalAssets,
      formIsLoading: false,
      isRequestSuccess: true,
    };
  },

  _getAdditionalAssetsSuccess(state, action) {
    const { additionalAssets } = action;
    return {
      ...state,
      additionalAssets,
      formIsLoading: false,
      isRequestSuccess: true,
    };
  },

  _toggleCreationInProgress(state) {
    return {
      ...state,
      creationInProgress: !state.creationInProgress
    };
  }
};

const finPlanAssetsReducer = (state = initialState, action) => {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
};

export default finPlanAssetsReducer;
