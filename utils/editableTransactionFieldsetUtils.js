import fieldsetAttributes from '../config/fieldsetAttributes';
import {
        defaultDateFormat,
        sortableDateFormat
      } from '../config/properties';
import {
        formatMoment,
        createMomentAndFormat
      } from '../utils/dateUtils';
import { sortByDateProperty } from '../utils/sortingUtils';

export function formatFieldsetsByDate(fieldsets, dateMoment) {
  const sortedFieldsets = sortByDateProperty(
    fieldsets,
    fieldsetAttributes.predictedDate
  );
  let predictedDate;
  const today = parseFloat(formatMoment(dateMoment, sortableDateFormat));
  // Split fieldsets into two categories:
  const splitFieldsets = sortedFieldsets.reduce((fieldsetsObj, fset) => {
    predictedDate = parseFloat(createMomentAndFormat(
      fset.predictedDate,
      defaultDateFormat,
      sortableDateFormat
    ));
    if (predictedDate < today) {
      fieldsetsObj.pastFieldsets.push(fset);
    }
    else {
      fieldsetsObj.upcomingFieldsets.push(fset);
    }
    return fieldsetsObj;
  },
  {
    pastFieldsets: [],
    upcomingFieldsets: []
  });
  return splitFieldsets;
}
