import reduce from 'lodash/reduce';
import isNull from 'lodash/isNull';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';

export default function objectToQueryString(obj) {
  const qs = reduce(obj, (result, value, key) => {
    if (!isNull(value) && !isUndefined(value)) {
      let newValue;
      if (isArray(value)) {
        newValue = `${key}=${value.toString()}&`;
      }
      else {
        newValue = `${key}=${value}&`;
      }
      const newResult = `${result}${newValue}`;
      return newResult;
    }
    return result;
  }, '').slice(0, -1);
  return `?${qs}`;
}
