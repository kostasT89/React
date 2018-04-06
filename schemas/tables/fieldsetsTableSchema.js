import { tableDimensionsWidthClass } from '../../config/properties';
import {
  calculateWidthAsSumOfParentAndOffset
} from '../../utils/dimensionUtils';

const fixedHeightInPixels = 600;

export const dimensionsFunctions = {
  getWidth: () => calculateWidthAsSumOfParentAndOffset({
    parentClass: tableDimensionsWidthClass,
    offset: 0
  }),
  getHeight: () => fixedHeightInPixels
};
