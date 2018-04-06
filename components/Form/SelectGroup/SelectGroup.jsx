import React, { PropTypes, Component } from 'react';
import { lookupMessage } from '../../../utils/cmsUtils';

import ReactTooltipWithIcon from '../../ReactTooltipWithIcon/ReactTooltipWithIcon';
// CONST
const OTHER_PLEASE_TYPE = 'OTHER_PLEASE_TYPE';
const OTHER_PLEASE_TYPE_TEXT = 'Other (Please Type)';

export default class SelectGroup extends Component {

  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(React.PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isDisabled: PropTypes.boolean
    })).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string
    }),
    hasOther: PropTypes.bool,
    toolTipConfig: PropTypes.object
  };

  static defaultProps = {
    meta: {
      touched: false,
      error: null,
      warning: null
    }
  };

  static _cms(key, base) {
    return lookupMessage(base, key);
  }

  static _generateOptions(options, hasOther) {
    const opts = options.map(({ text, value, isDisabled = false }, idx) => (
      <option className="lc-select-group__option"
              value={value}
              disabled={isDisabled}
              key={idx}>{text}</option>
    ));
    if (hasOther) {
      opts.push((
        <option className="lc-select-group__option"
                value={OTHER_PLEASE_TYPE}
                key={-1}>{OTHER_PLEASE_TYPE_TEXT}</option>
      ));
    }
    return opts;
  }

  constructor(props) {
    super(props);
    this.state = { hasInitialValue: false };
  }

  componentDidMount() {
    const { input: { value } } = this.props;
    if (value) { this.setState({ hasInitialValue: true }); } // eslint-disable-line
  }

  render() {
    const { hasInitialValue } = this.state;
    const {
      input,
      label,
      className = '',
      options,
      hasOther,
      meta: {
        touched,
        error,
        warning,
      },
      toolTipConfig
    } = this.props;

    const errorClass = touched && error ? 'lc-select-group--error' : '';
    const warningClass = touched && warning ? 'lc-select-group--warning' : '';
    const validClass = (touched || hasInitialValue) && !error && !warning ? 'lc-select-group--valid' : '';
    return (
      <div className={`lc-select-group ${className} ${errorClass} ${warningClass} ${validClass}`}>
        <div className="lc-select-group__container" >
          { label &&
            <label className="lc-select-group__label" htmlFor>
              <span className="lc-select-group__text">{label}</span>
              { toolTipConfig && <ReactTooltipWithIcon
                                optionalClass="lc-input-group__tooltip"
                                icon={toolTipConfig.icon}
                                message={toolTipConfig.message}
                                id={toolTipConfig.id} /> }
            </label>
          }
          <div className="lc-select-group__field">
            <select className="lc-select-group__select" {...input}>
              { SelectGroup._generateOptions(options, hasOther) }
            </select>
          </div>
        </div>
        { errorClass ? (<div className="lc-select-group__error">{error}</div>) : '' }
        { warningClass ? (<div className="lc-select-group__warning">{warning}</div>) : '' }
      </div>
    );
  }
}
