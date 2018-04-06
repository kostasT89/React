import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
// Local Deps:
import { sortableDateFormat } from '../config/properties';
import { createLocalMoment } from './dateUtils';

export function sortByDateProperty(items, property) {
  let date;
  const sortedItems = sortBy(items, (item) => {
    date = get(item, property);
    return createLocalMoment(date).format(sortableDateFormat);
  });
  return sortedItems;
}
