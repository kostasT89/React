export const createOptionsFromEnums = (enumObject) => {
  const keys = Object.keys(enumObject);
  return keys.map(key => ({
    text: enumObject[key],
    value: key
  }));
};

export const createSameKeyValueOptionsFromEnums = (enumObject) => {
  const values = Object.values(enumObject);
  return values.map(value => ({
    text: value,
    value
  }));
};
