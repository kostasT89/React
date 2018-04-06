// Global Deps
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import cx from 'classnames';
// Local Deps
import {
        required,
        optionSelected,
        number,
        maxLength2,
      } from '../../../utils/formValidationUtils';

import {
        defaultOption,
      } from '../../../config/formFieldOptions';
import {
        toggleFinPlanIncomeForm,
        toggleFormState,
      } from '../../../actions/finPlan/finPlanIncome';
import { lookupMessage } from '../../../utils/cmsUtils';
import cms from '../../../../app/config/messages';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import otherIncomeFormFields from '../../../../app/constants/enums/finPlanOtherIncomeTypes';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
import { prepareInitialValues } from '../../../utils/finPlan/finPlanIncomeUtils';
import formTypes from '../../../constants/enums/finPlanIncomeFormTypes';

// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import Switch from '../../Form/Switch/Switch';
import GenericButton from '../../GenericButton/GenericButton';

import './OtherIncomeSourcesForm.scss';
// CONSTS
const keyBase = 'finPlanIncome.otherIncomeForm';
const {
  incomeSourcesForm,
  incomeInfoForm,
} = formTypes;

class OtherIncomeSourcesForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _generateRows(onToggle, toggleStates) {
    const checkedClass = 'lc-column__toggle-section__wrapper--checked';
    const { _cms } = OtherIncomeSourcesForm;
    const content = otherIncomeFormFields.map((fields, index) => {
      const rowFields = fields.map((field, idx) => (
        <div
          key={idx}
          className="lc-column columns small-4"
        >
          <div className={cx('lc-column__toggle-section__wrapper', {
            [checkedClass]: toggleStates[field.name] })}>
            <Switch
              handleToggle={onToggle}
              name={field.name}
              value={toggleStates[field.name]}
            />
            <div className="lc-column__toggle-section__label">
              {_cms(field.cms)}
            </div>
          </div>
        </div>
      ));

     return (
       <div
         key={index}
         className="lc-row row lc-column__toggle-section"
       >
         {rowFields}
       </div>
      );
    });
    return content;
  }

  static _generateForm(toggleStates, clientSelectOptions) {
    const { _cms } = OtherIncomeSourcesForm;
    const renderFields = (states) => {
      const otherIncomeFormFieldsArray = flatten(otherIncomeFormFields);
      const formFields = [];
      Object.keys(states).forEach((key) => {
        if (key && states[key]) {
          const fieldConfig = find(otherIncomeFormFieldsArray, ['name', key]);
          const label = _cms(`${fieldConfig.cms}__label`);
          const placeholder = _cms('field-placeholder');
          const field = (
            <div key={key}
              className="lc-row row lc-other-income-sources-form__row">
              <div className="lc-column columns small-4">
                <Field name={`${fieldConfig.name}_grossSalary`}
                      component={InputGroup}
                      type={inputTypes.text}
                      label={label}
                      mask={fieldMasks.currency}
                      placeholder={placeholder}
                      validate={[required]} />
              </div>
              <div className="lc-column columns small-4">
                <Field name={`${fieldConfig.name}_payFrequency`}
                      component={InputGroup}
                      type={inputTypes.text}
                      mask={fieldMasks.age}
                      label={_cms('day-of-month__label')}
                      placeholder={_cms('day-of-month__placeholder')}
                      validate={[required, number, maxLength2]} />
              </div>
              <div className="lc-column columns small-4">
                <Field name={`${fieldConfig.name}_employedIndividual`}
                  component={SelectGroup}
                  label={_cms('select-client')}
                  options={[defaultOption, ...clientSelectOptions]}
                  validate={[required, optionSelected]} />
              </div>
            </div>
          );
          formFields.push(field);
        }
      });

      return (
        <div className="lc-other-income-sources-form__fields">
          {formFields}
        </div>
      );
    };

    return (
      <div className="lc-row row">
        <div className="lc-column columns small-12">
          {renderFields(toggleStates)}
          <div className="lc-row row lc-other-income-sources-form__row">
            <div className="lc-column colums small-12">
              <Field name="comment"
                    props={{ className: 'lc-other-income-sources-form__comment' }}
                    component={TextArea}
                    type={inputTypes.text}
                    label={_cms('comment__label')}
                    placeholder={_cms('comment__placeholder')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // values, dispatch, and props supplied by redux-form:
  _onSubmit = (formValues, formDispatch, formProps) => {
    const {
      onSubmit,
      formType,
      dispatch,
      toggleStates,
    } = this.props;
    const {
      _cms,
    } = OtherIncomeSourcesForm;
    if (formType === incomeInfoForm) {
      const fieldConfigs = flatten(otherIncomeFormFields);
      const keys = Object.keys(toggleStates);
      let fieldConfig;
      let label;
      const otherIncomes = keys.map((key) => {
        fieldConfig = fieldConfigs.find(config => config.name === key);
        label = _cms(`${fieldConfig.cms}__label`);
        return {
          employerName: label,
          otherIncomeType: key,
          employedIndividual: formValues[`${key}_employedIndividual`],
          payFrequency: formValues[`${key}_payFrequency`],
          grossSalary: formValues[`${key}_grossSalary`],
          comment: formValues.comment
        };
      });
      otherIncomes.forEach(income => (onSubmit(income, formDispatch, formProps)));
      return;
    }
    dispatch(toggleFinPlanIncomeForm(incomeInfoForm));
  }

  _onToggle({ target: { id } }) {
    this.props.dispatch(toggleFormState(id));
  }

  _onCancel() {
    const { onCancel, formType, dispatch } = this.props;

    if (formType === incomeSourcesForm) {
      return onCancel();
    }

    dispatch(toggleFinPlanIncomeForm(incomeSourcesForm));
  }

  _handleClick() {
    const { reset, formType, onCancel } = this.props;
    if (formType === incomeInfoForm) {
      setTimeout(() => {
        reset();
        onCancel();
      }, 100);
    }
  }

  _buttonText() {
    const { formType } = this.props;
    const { _cms } = OtherIncomeSourcesForm;

    if (formType === incomeSourcesForm) {
      return _cms('button__details');
    }

    if (formType === incomeInfoForm) {
      return _cms('button__save-details');
    }
    return cms['button.next'];
  }

  render() {
    const {
      options: { employedIndividualNameOptions },
      invalid,
      formType,
      submitting,
      handleSubmit,
      toggleStates,
    } = this.props;

    const { _generateRows, _generateForm } = OtherIncomeSourcesForm;

    const clientIncomeSelectOptions = createSameKeyValueOptionsFromEnums(
      employedIndividualNameOptions
    );
    return (
      <form className="lc-other-income-sources-form"
            onSubmit={handleSubmit(this._onSubmit)}>
        {
          formType === incomeSourcesForm ?
          /* <!--TOGGLE SWITCHES--> */
          _generateRows(::this._onToggle, toggleStates)
          :
          /* <!--TOGGLE SWITCHES--> */
          _generateForm(toggleStates, clientIncomeSelectOptions)
        }
        {/* <!--BUTTONS-->*/}
        <div className="lc-fin-plan__buttons">
          <GenericButton className="lc-button--left lc-button--white"
                         text={cms['button.previous']}
                         onClick={::this._onCancel} />
          <GenericButton className="lc-button--right lc-button--blue"
                         text={::this._buttonText()}
                         type="submit"
                         onClick={::this._handleClick}
                         isDisabled={invalid || submitting} />
        </div>
      </form>
    );
  }
}

OtherIncomeSourcesForm.propTypes = {
  formType: PropTypes.string,
  dispatch: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.object,
  toggleStates: PropTypes.object,
};

const OtherIncomeSourcesFormRedux = reduxForm({
  form: 'otherIncomeSourcesForm',
})(OtherIncomeSourcesForm);


const mapStateToProps = (state) => {
  const { currentIncomeSource } = state.finPlanIncome;
  const initialValues = currentIncomeSource ?
    prepareInitialValues(currentIncomeSource) : {};
  return {
    initialValues,
    enableReinitialize: true
  };
};

const OtherIncomeSourcesFormWithState = connect(mapStateToProps)(OtherIncomeSourcesFormRedux);

export default OtherIncomeSourcesFormWithState;
