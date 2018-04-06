import React, { PropTypes, Component } from 'react';

export default class TextArea extends Component {

  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string
    })
  };

  static _renderTextArea({ input, placeholder, type }) {
    return (
      <textarea className="lc-text-area__input"
             placeholder={placeholder}
             type={type}
             {...input} />
    );
  }

  render() {
    const {
      input,
      label,
      placeholder,
      type,
      meta: {
        touched,
        error,
        warning
      }
    } = this.props;
    const errorClass = touched && error ? 'lc-text-area--error' : '';
    const warningClass = touched && warning ? 'lc-text-area--warning' : '';
    const validClass = touched && !error && !warning ? 'lc-text-area--valid' : '';

    return (
      <div className={`lc-text-area ${errorClass} ${warningClass} ${validClass}`}>
        <label className="lc-text-area__label" htmlFor>
          <span className="lc-text-area__text">{label}</span>
        </label>
        <div className="lc-text-area__field">
          {TextArea._renderTextArea({ input, placeholder, type })}
        </div>
        { errorClass ? (<div className="lc-text-area__error">{error}</div>) : '' }
        { warningClass ? (<div className="lc-text-area__warning">{warning}</div>) : '' }
      </div>
    );
  }
}
