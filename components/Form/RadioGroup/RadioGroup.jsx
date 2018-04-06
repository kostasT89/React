import React, { PropTypes, Component } from 'react';
import { Field } from 'redux-form';

export default class RadioGroup extends Component {

  static propTypes = {
    fields: PropTypes.arrayOf(React.PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    validate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    optionalClassname: PropTypes.string
  };

  static _generateFields({ fields, name, validate }) {
    return fields.map(({ text, value }, idx) => (
      <div className="lc-radio-group__option" key={idx}>
        <Field className="lc-radio-group__field"
               type="radio"
               value={value}
               id={`${name}-${value}`}
               name={name}
               component="input"
               validate={validate} />
        <label className="lc-radio-group__field-label"
               htmlFor={`${name}-${value}`}>
          <span className="lc-radio-group__field-label-text">
            {text}
          </span>
        </label>
      </div>
    ));
  }

  render() {
    const { fields, name, label, validate, optionalClassname } = this.props;
    return (
      <div className={`lc-radio-group ${optionalClassname || ''}`}>
        {label && <div className="lc-radio-group__label">
          <span className="lc-radio-group__text">
            {label}
          </span>
        </div>}
        <div className="lc-radio-group__options">
          { RadioGroup._generateFields({ fields, name, validate }) }
        </div>
      </div>
    );
  }
}
