import React, { PropTypes, Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import './DatePicker.scss';

export default class DatePicker extends Component {

  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    subtext: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  _date = () => {
    const {
      date,
    } = this.state;

    if (!date) {
      return '';
    }
    return date.format('YYYY-MM-DD');
  }

  handleDateChange = (date) => {
    this.setState(
      { date },
      () => this.props.input.onChange(this.props.input.name, this._date())
    );
  }

  handleFocusChange = (data) => {
    this.setState({ focused: data.focused });
  }


  render() {
    const {
      label,
      input,
      subtext,
      meta: {
        error,
        warning,
        touched,
      }
    } = this.props;
    const errorClass = touched && error ? 'lc-input-group--error' : '';
    const warningClass = touched && warning ? 'lc-input-group--warning' : '';
    const validClass = (touched && !error && !warning) ||
      (input.value && !touched) ? 'lc-input-group--valid' : '';

    return (
      <div className={`lc-input-group ${errorClass} ${warningClass} ${validClass}`}>
        <label className="lc-input-group__label" htmlFor>
          <span className="lc-input-group__text">{label}</span>
        </label>
        <div className="lc-input-group__field">
          <SingleDatePicker
            date={this.state.date || null}
            placeholderText="Date"
            focused={this.state.focused}
            onDateChange={::this.handleDateChange}
            onFocusChange={::this.handleFocusChange}
            numberOfMonths={1}
            showDefaultInputIcon={true}
            isRTL={true}
          />
        </div>
        { subtext && (<div className="lc-input-group__subtext">{subtext}</div>)}
        { errorClass && (<div className="lc-input-group__error">{error}</div>) }
        { warningClass && (<div className="lc-input-group__warning">{warning}</div>) }
      </div>
    );
  }
}
