import {
        tableDimensionsWidthClass,
        tableDimensionsHeightClass
      } from '../../config/properties';
import {
        calculateHeightAsSumOfParentAndOffset,
        calculateWidthAsSumOfParentAndOffset
      } from '../../utils/dimensionUtils';

// These values has been tailored specifically for the components on the /transactions page
const heightOffsetOfParentContainer = -600;
const widthOffsetOfParentContainer = 0;

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
