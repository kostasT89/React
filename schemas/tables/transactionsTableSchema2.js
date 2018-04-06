import {
        tableDimensionsWidthClass,
        tableDimensionsHeightClass
      } from '../../config/properties';
import {
        calculateHeightAsSumOfParentAndOffset,
        calculateWidthAsSumOfParentAndOffset
      } from '../../utils/dimensionUtils';

const heightOffsetOfParentContainer = 0;
const widthOffsetOfParentContainer = -30;

export const dimensionsFunctions = {
  getWidth: () => calculateWidthAsSumOfParentAndOffset({
    parentClass: tableDimensionsWidthClass,
    offset: widthOffsetOfParentContainer
  }),
  getHeight: () => calculateHeightAsSumOfParentAndOffset({
    parentClass: tableDimensionsHeightClass,
    offset: heightOffsetOfParentContainer
  })
};
