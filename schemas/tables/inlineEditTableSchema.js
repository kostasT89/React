import {
        inlineTableDimensionsWidthClass,
        inlineTableDimensionsHeightClass
      } from '../../config/properties';
import {
  calculateHeightAsPercentageOfParent,
  calculateWidthAsSumOfParentAndOffset
} from '../../utils/dimensionUtils';

const heightPercentageOfParentContainer = 0.8;
const widthOffsetOfParentContainer = 0;

export const dimensionsFunctions = {
  getWidth: () => calculateWidthAsSumOfParentAndOffset({
    parentClass: inlineTableDimensionsWidthClass,
    offset: widthOffsetOfParentContainer
  }),
  getHeight: () => calculateHeightAsPercentageOfParent({
    parentClass: inlineTableDimensionsHeightClass,
    percentage: heightPercentageOfParentContainer
  })
};
