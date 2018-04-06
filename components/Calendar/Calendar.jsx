import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import { forbidExtraProps } from 'airbnb-prop-types';
import { DayPicker } from 'react-dates';

import toMomentObject from '../../../node_modules/react-dates/lib/utils/toMomentObject';
import toLocalizedDateString from '../../../node_modules/react-dates/lib/utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../../../node_modules/react-dates/lib/utils/isInclusivelyAfterDay';
import isSameDay from '../../../node_modules/react-dates/lib/utils/isSameDay';

import SingleDatePickerShape from '../../../node_modules/react-dates/lib/shapes/SingleDatePickerShape';

const propTypes = forbidExtraProps(SingleDatePickerShape);

const defaultProps = {
  // required props for a functional interactive Calendar
  date: null,
  focused: false,

  // calendar presentation and interaction related props
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: 'Close',
    clearDate: 'Clear Date',
  },
};

export default class Calendar extends React.Component {

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      hoverDate: null,
    };

    this.today = moment();

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  componentWillUpdate() {
    this.today = moment();
  }

  onChange(dateString) {
    const { isOutsideRange, keepOpenOnDateSelect, onDateChange, onFocusChange } = this.props;
    const date = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = date && !isOutsideRange(date);
    if (isValid) {
      onDateChange(date);
      if (!keepOpenOnDateSelect) onFocusChange({ focused: false });
    }
    else {
      onDateChange(null);
    }
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;

    this.props.onDateChange(day);
    if (!this.props.keepOpenOnDateSelect) this.props.onFocusChange({ focused: null });
  }

  onDayMouseEnter(day) {
    this.setState({
      hoverDate: day,
    });
  }

  onDayMouseLeave() {
    this.setState({
      hoverDate: null,
    });
  }

  onFocus() {
    if (!this.props.disabled) {
      this.props.onFocusChange({ focused: true });
    }
  }

  onClearFocus() {
    const { focused, onFocusChange } = this.props;
    if (!focused) return;

    onFocusChange({ focused: false });
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  getDayPickerContainerClasses() {
    const { hoverDate } = this.state;

    const dayPickerClassName = cx('lc-calendar__picker', {
      'lc-calendar__picker--valid-date-hovered': hoverDate && !this.isBlocked(hoverDate),
    });

    return dayPickerClassName;
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  clearDate() {
    const { onDateChange, reopenPickerOnClearDate, onFocusChange } = this.props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onFocusChange({ focused: true });
    }
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isHovered(day) {
    return isSameDay(day, this.state.hoverDate);
  }

  isSelected(day) {
    return isSameDay(day, this.props.date);
  }

  isToday(day) {
    return isSameDay(day, this.today);
  }

  renderDayPicker() {
    const {
      isDayBlocked,
      isOutsideRange,
      enableOutsideDays,
      numberOfMonths,
      monthFormat,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      focused,
      renderDay,
      date,
      initialVisibleMonth,
    } = this.props;

    const modifiers = {
      today: day => this.isToday(day),
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      valid: day => !this.isBlocked(day),
      hovered: day => this.isHovered(day),
      selected: day => this.isSelected(day),
    };

    const initialVisibleMonthThunk = initialVisibleMonth || (() => (date || moment()));

    return (
      <div
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
      >
        <DayPicker
          enableOutsideDays={enableOutsideDays}
          modifiers={modifiers}
          numberOfMonths={numberOfMonths}
          onDayClick={this.onDayClick}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayMouseLeave={this.onDayMouseLeave}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          monthFormat={monthFormat}
          hidden={!focused}
          initialVisibleMonth={initialVisibleMonthThunk}
          navPrev={navPrev}
          navNext={navNext}
          renderDay={renderDay}
        />
      </div>
    );
  }

  render() {
    const { focused } = this.props;

    return (
      <div className="lc-calendar">
        { focused ? this.renderDayPicker() : null }
      </div>
    );
  }
}
