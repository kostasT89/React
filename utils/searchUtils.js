
export function findByValues(collection, property, values) {
  return collection.reduce((valuesArray, item) => {
    if (values.includes(item[property])) {
      valuesArray.push(item);
    }
    return valuesArray;
  }, []);
}
