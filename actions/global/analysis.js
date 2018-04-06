import moment from 'moment';
// Local Deps:
import { handleErrors } from '../../utils/fetchUtils';
import { calculateNinetyDayPastDate, formatMoment } from '../../utils/dateUtils';
import {
        createPerExSummaryRequest,
      } from '../../api/global/analysisApi';
import { defaultDateFormat } from '../../config/properties';
// Constants:
import {
        GET_PEREX_ANALYSIS_SUCCESS,
        GET_PEREX_ANALYSIS_FAIL,
      } from '../../constants/AppConstants';

/*-----------------------------------
  GET PEREX ANALYSIS
-------------------------------------*/
export function getPerExAnalysisSuccess(summary) {
  return {
    type: GET_PEREX_ANALYSIS_SUCCESS,
    summary
  };
}

export function getPerExAnalysisFail(error) {
  return {
    type: GET_PEREX_ANALYSIS_FAIL,
    error
  };
}

export const getPerExAnalysis = () => async (dispatch) => { // eslint-disable-line
  const today = moment();
  const pastDate = calculateNinetyDayPastDate(today);
  const dateEnd = formatMoment(today, defaultDateFormat);
  const dateStart = formatMoment(pastDate, defaultDateFormat);

  try {
    const response = await createPerExSummaryRequest({
      dateStart,
      dateEnd
    });

    handleErrors(response);
    const json = await response.json();

    const { summaryData } = json;
    dispatch(getPerExAnalysisSuccess(summaryData));
  }
  catch (err) {
    dispatch(getPerExAnalysisFail(err));
  }
};
