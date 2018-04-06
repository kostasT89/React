import React, { PropTypes, Component } from 'react';
import MaskedInput from 'react-text-mask';
import get from 'lodash/get';
import ReactTooltipWithIcon from '../../ReactTooltipWithIcon/ReactTooltipWithIcon';

const noop = () => {};
const NEGATIVE = 'negative';
const POSITIVE = 'positive';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  subtext: PropTypes.string,
  subtext2: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  normalizeValue: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  inputClass: PropTypes.string,
  customValidationMessage: PropTypes.string,
  mask: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object
  ]),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
    pristine: PropTypes.bool,
  }),
  hideGuide: PropTypes.bool,
  onCancelCB: PropTypes.func,
  onChangeCB: PropTypes.func,
  toolTipConfig: PropTypes.object
};

const defaultProps = {
  onChangeCB: noop,
  isDisabled: false
};

const _onInputChange = (reduxFormOnChange, onChangeCB, newValue) => {
  reduxFormOnChange(newValue);
  onChangeCB(newValue);
};

export default class InputGroup extends Component {

static defaultProps = defaultProps;

static propTypes = propTypes;

static _renderInput({
  mask,
  type,
  dirty,
  input,
  visited,
  autoFocus,
  onChangeCB,
  placeholder,
  allowPrefill,
  isDisabled,
  inputClass,
  hideGuide
  }) {
    if (mask && (visited || allowPrefill || dirty)) {
      let selectedMask = mask;
      const positiveMask = get(mask, POSITIVE, mask);
      const negativeMask = get(mask, NEGATIVE, mask);
      if (typeof input.value === 'number') {
        selectedMask = input.value > 0 ? positiveMask : negativeMask;
      }
      return (
        <MaskedInput {...input}
                     className="lc-input-group__input lc-input-group__input--masked"
                     value={input.value}
                     mask={selectedMask}
                     guide={!hideGuide}
                     autoFocus={visited}
                     onChange={newValue => _onInputChange(input.onChange, onChangeCB, newValue)}
                     placeholder={placeholder}
                     disabled={isDisabled} />
      );
    }
    return (
      <input {...input}
             type={type}
             className={`lc-input-group__input ${inputClass}`}
             disabled={isDisabled}
             autoFocus={autoFocus}
             onChange={newValue => _onInputChange(input.onChange, onChangeCB, newValue)}
             placeholder={placeholder} />
    );
  }

  render() {
    const {
      type,
      mask,
      label,
      input,
      subtext,
      autoFocus,
      onCancelCB,
      onChangeCB,
      isDisabled,
      subtext2,
      placeholder,
      normalizeValue,
      className = '',
      inputClass = '',
      hideGuide,
      customValidationMessage,
      meta: {
        error,
        warning,
        touched,
        visited,
        pristine,
        dirty
      },
      toolTipConfig
    } = this.props;

    const allowPrefill = pristine && (input.value === 0 || !!input.value);
    const errorClass = touched && error ? 'lc-input-group--error' : '';
    const warningClass = touched && warning ? 'lc-input-group--warning' : '';
    const validClass = (touched && !error && !warning) ||
      (input.value && !touched) ? 'lc-input-group--valid' : '';
    const disabledClass = isDisabled ? 'lc-input-group--disabled' : '';

    const inputConfig = {
      type,
      mask,
      input,
      visited,
      autoFocus,
      placeholder,
      normalizeValue,
      allowPrefill,
      onChangeCB,
      dirty,
      isDisabled,
      inputClass,
      hideGuide,
      customValidationMessage
    };
    return (
      <div className={`lc-input-group ${className} ${errorClass}`
        + `${warningClass} ${validClass} ${disabledClass}`}>
        <div className="lc-input-group__container">
          { label &&
            <label className="lc-input-group__label" htmlFor>
              <span className="lc-input-group__text">{label}</span>
              { toolTipConfig && <ReactTooltipWithIcon
                                  optionalClass="lc-input-group__tooltip"
                                  icon={toolTipConfig.icon}
                                  message={toolTipConfig.message}
                                  id={toolTipConfig.id} /> }
            </label>
          }
          <div className="lc-input-group__field">
            {InputGroup._renderInput(inputConfig)}
            {onCancelCB && <span onClick={onCancelCB}
                                 className="lc-input-group-cancel-icon fa fa-times" />}
          </div>
        </div>
        { subtext && (<div className="lc-input-group__subtext">{subtext}</div>)}
        { subtext2 && (<div className="lc-input-group__subtext">{subtext2}</div>)}
        { errorClass && (<div className="lc-input-group__error">{error}</div>) }
        { customValidationMessage && (<div className="lc-input-group__error">{customValidationMessage}</div>) }
        { warningClass && (<div className="lc-input-group__warning">{warning}</div>) }
      </div>
    );
  }
}
