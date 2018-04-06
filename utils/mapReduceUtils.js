export function safeReduceTotals(toReduce) {
  return toReduce.reduce((a, b) => (parseFloat(a) + parseFloat(b)).toFixed(2), 0);
}

export function mapToNewProperty(toMap, newProperty, defaultValue) {
  return toMap.map(element => (element[newProperty] || defaultValue));
}

export function mapReduceTotals(toMap, objectToGrabValuesFrom, defaultValue) {
  return safeReduceTotals(mapToNewProperty(toMap, objectToGrabValuesFrom, defaultValue));
}
