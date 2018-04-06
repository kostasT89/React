const TOTAL_COLUMNS = 12;
const FOUR_COLUMNS_PER_ROW = 3;
const THREE_COLUMNS_PER_ROW = 4;
const FIVE_COLUMNS_PER_ROW = 2;

export function determineMediumColumnSize(count) {
  if (count < 5) {
    return TOTAL_COLUMNS / count;
  }
  const remainder = TOTAL_COLUMNS % count;
  return remainder < 3 ? THREE_COLUMNS_PER_ROW : FOUR_COLUMNS_PER_ROW;
}

export function determineLargeColumnSize(count) {
  if (count < 5) {
    return TOTAL_COLUMNS / count;
  }

  else if (count > 6) {
    return FOUR_COLUMNS_PER_ROW;
  }
  return FIVE_COLUMNS_PER_ROW;
}

export function determineLargeRowSize(count) {
  if (count === 5) {
    return 11;
  }
  return 10;
}

export function determineLargeRowOffset() {
  return 1;
}
