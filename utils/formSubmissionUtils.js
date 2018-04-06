import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import pick from 'lodash/pick';

export const checkForMissingFormValues = (initialValuesObject, formValuesObject) => {
  const formFieldNames = Object.keys(formValuesObject);
  const initialFieldNames = Object.keys(initialValuesObject);
  if (isEmpty(initialFieldNames)) { return []; }
  const missingFields = initialFieldNames.reduce((missingFieldsArray, initialFieldName) => {
    const isMissingField = !find(formFieldNames, initialFieldName);
    if (isMissingField) {
      const missingField = pick(initialValuesObject, initialFieldName);
      missingFieldsArray.push([missingField]);
    }
    return missingFieldsArray;
  }, []);
  return missingFields;
};

export const onFormSubmit = ({
  intitialValues,
  formValues,
  formDispatch,
  formSubmitAction,
}) => {
    const defaultValues = checkForMissingFormValues(intitialValues, formValues);
    formDispatch(formSubmitAction([...formValues, ...defaultValues]));
  };
