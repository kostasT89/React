import { WINDOW_WIDTH } from '../config/properties';

export function getHeightByClass(className) {
  const pw = document.getElementsByClassName(className);
  const foundHeight = pw.length > 0 ? pw[0].clientHeight : window.innerHeight;
  return foundHeight;
}

export function getWidthByClass(className) {
  const pw = document.getElementsByClassName(className);
  const foundWidth = pw.length > 0 ? pw[0].clientWidth : WINDOW_WIDTH;
  return foundWidth;
}

export function calculateHeightAsPercentageOfParent({ parentClass, percentage }) {
  const parentHeight = getHeightByClass(parentClass);
  return parentHeight * percentage;
}

export function calculateWidthAsPercentageOfParent({ parentClass, percentage }) {
  const parentWidth = getWidthByClass(parentClass);
  return parentWidth * percentage;
}

export function calculateWidthAsSumOfParentAndOffset({ parentClass, offset }) {
  const parentWidth = getWidthByClass(parentClass);
  return parentWidth + offset;
}

export function calculateHeightAsSumOfParentAndOffset({ parentClass, offset }) {
  const parentWidth = getHeightByClass(parentClass);
  return parentWidth + offset;
}

export function calculateTableWidth() {
  const windowWidth = WINDOW_WIDTH;
  let rulesTableContainerWidth = 1200;
  let rulesTableColumnWidth = rulesTableContainerWidth / 4;
  if (windowWidth < 1300) {
    rulesTableContainerWidth = 745;
    rulesTableColumnWidth = rulesTableContainerWidth / 4;
  }
  else if (windowWidth < 1500 && windowWidth > 1350) {
    rulesTableContainerWidth = 860;
    rulesTableColumnWidth = rulesTableContainerWidth / 4;
  }
  else if (windowWidth < 1600 && windowWidth > 1499) {
    rulesTableContainerWidth = 900;
    rulesTableColumnWidth = rulesTableContainerWidth / 4;
  }
  else if (windowWidth < 1700 && windowWidth > 1599) {
    rulesTableContainerWidth = 1050;
    rulesTableColumnWidth = rulesTableContainerWidth / 4;
  }
  return {
    rulesTableContainerWidth,
    rulesTableColumnWidth
  };
}
