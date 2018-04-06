import { READY_TO_LOAD_PAGE } from '../constants/AppConstants';

/*-----------------------------------
  READY TO LOAD PAGE
-------------------------------------*/

export function readyToLoadPage() {
  return {
    type: READY_TO_LOAD_PAGE
  };
}
