import {
  YODLEE_GET_FASTLINK_DATA_SUCCESS,
  YODLEE_GET_FASTLINK_DATA_FAIL,
} from '../constants/AppConstants';

import { fetchYodleeFastLinkDataRequest } from '../api/fastLinkApi';

/*-----------------------------------
  GET YODLEE FASTLINK DATA
-------------------------------------*/

export function getYodleeFastLinkDataSuccess({ url, rsession, token }) {
  return {
    type: YODLEE_GET_FASTLINK_DATA_SUCCESS,
    url,
    rsession,
    token
  };
}

export function getYodleeFastLinkDataFailure(err) {
  return {
    type: YODLEE_GET_FASTLINK_DATA_FAIL,
    err
  };
}

export const getYodleeFastLinkAuthData = () => async (dispatch) => {
  try {
    const response = await fetchYodleeFastLinkDataRequest();
    const json = await response.json();
    const { url, rsession, token } = json.fastLinkData;
    dispatch(getYodleeFastLinkDataSuccess({ url, rsession, token }));
  }
  catch (err) {
    dispatch(getYodleeFastLinkDataFailure(err));
  }
};
