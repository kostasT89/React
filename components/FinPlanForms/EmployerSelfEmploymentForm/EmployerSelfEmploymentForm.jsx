// Global Deps
import React, { PropTypes, Component } from 'react';
import { touch, Field, reduxForm } from 'redux-form';

import get from 'lodash/get';

// Local Deps
import { required, optionSelected } from '../../../utils/formValidationUtils';
import {
        stateOptions,
        yesNoOptions,
        jobFrequencyOptions,
        payFrequencyOptions,
        bonusFrequencyOptions,
        defaultEmptyValueOptionGen
      } from '../../../config/formFieldOptions';

import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupMessage } from '../../../utils/cmsUtils';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';

// Components
import InputGroup from '../../Form/InputGroup/InputGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';

import './EmployerSelfEmploymentForm.scss';

const stateFieldName = 'state';
const initialId = 'initialValues.id';
const payFrequency = 'payFrequency';
const jobFrequency = 'jobFrequency';
const bonusFrequency = 'bonusFrequency';
const employedIndividual = 'employedIndividual';

const keyBase = 'finPlanIncome.employerselfEmploymentInfoForm';

const touchReduxFormFields = (dispatch, initialValues) => {
  /* eslint-disable */
  initialValues[jobFrequency] &&
    dispatch(touch(reduxForms.employerSelfEmploymentForm, jobFrequency));
  initialValues[payFrequency] &&
    dispatch(touch(reduxForms.employerSelfEmploymentForm, payFrequency));
  initialValues[stateFieldName] &&
    dispatch(touch(reduxForms.employerSelfEmploymentForm, stateFieldName));
  initialValues[bonusFrequency] &&
    dispatch(touch(reduxForms.employerSelfEmploymentForm, bonusFrequency));
  initialValues[employedIndividual] &&
    dispatch(touch(reduxForms.employerSelfEmploymentForm, employedIndividual));
  /* eslint-enable */
};

class EmployerSelfEmploymentForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    options: PropTypes.any,
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    if (nextId && nextId !== currentId) {
      touchReduxFormFields(nextProps.dispatch, nextProps.initialValues); // eslint-disable-line
    }
  }

  _onSubmit = (formValues, formDispatch, formProps) => {
    const { reset, onSubmit } = this.props;
    reset();
    return onSubmit(formValues, formDispatch, formProps);
  }

  _onCancel = () => {
    const { reset, onCancel } = this.props;
    reset();
    return onCancel();
  }

  render() {
    const {
      options: { employedIndividualNameOptions },
      invalid,
      onCancel,
      submitting,
      handleSubmit,
    } = this.props;

    const { _cms } = EmployerSelfEmploymentForm;
    const employedIndividualSelectOptions =
      createSameKeyValueOptionsFromEnums(employedIndividualNameOptions);

    return (
      <form onSubmit={handleSubmit(this._onSubmit)}
            className="lc-employer-self-employment-form">
        {/* <!--ROW 1--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Primary Employer--> */}
            <div className="lc-column columns small-6">
              <RadioGroup name="primaryEmployer"
                          fields={yesNoOptions}
                          label={_cms('primaryEmployer')}
                          validate={[required]}
                          optionalClassname="fin-plan-radio-group" />
            </div>
            {/* <!--Employed Individual-->*/}
            <div className="lc-column columns small-6">
              <Field name={employedIndividual}
                     component={SelectGroup}
                     label={_cms(employedIndividual)}
                     options={[defaultEmptyValueOptionGen(), ...employedIndividualSelectOptions]}
                     validate={[required, optionSelected]} />
            </div>
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Employer Name--> */}
            <div className="lc-column columns small-6">
              <Field name="employerName"
                     component={InputGroup}
                     type={inputTypes.text}
                     label={_cms('employerName')}
                     placeholder={_cms('employerName')}
                     validate={[required]} />
            </div>
            {/* <!--Title/Job Function-->*/}
            <div className="lc-column columns small-6">
              <Field name="titleJobFunction"
                     component={InputGroup}
                     type={inputTypes.text}
                     label={_cms('titleJobFunction')}
                     placeholder={_cms('titleJobFunction')}
                     validate={[required]} />
            </div>
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--State--> */}
            <div className="lc-column columns small-6">
              <Field name={stateFieldName}
                     component={SelectGroup}
                     label={_cms(stateFieldName)}
                     options={[defaultEmptyValueOptionGen(), ...stateOptions]}
                     validate={[required, optionSelected]} />
            </div>
            {/* <!--Number of Years-->*/}
            <div className="lc-column columns small-6">
              <Field name="numberOfYears"
                     component={InputGroup}
                     mask={fieldMasks.age}
                     hideGuide
                     type={inputTypes.text}
                     label={_cms('numberOfYears')}
                     placeholder={cms['doubleZero.placeholder']}
                     validate={[required]} />
            </div>
          </div>
        </div>
        {/* <!--ROW 4--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Job Frequency--> */}
            <div className="lc-column columns small-6">
              <Field name={jobFrequency}
                     component={SelectGroup}
                     label={_cms(jobFrequency)}
                     options={[defaultEmptyValueOptionGen(), ...jobFrequencyOptions]}
                     validate={[required, optionSelected]} />
            </div>
            {/* <!--Anticipates Employment Changes-->*/}
            <div className="lc-column columns small-6">
              <RadioGroup name="anticipatesEmploymentChanges"
                          fields={yesNoOptions}
                          label={_cms('anticipatesEmploymentChanges')}
                          validate={[required]}
                          optionalClassname="fin-plan-radio-group" />
            </div>
          </div>
        </div>
        {/* <!--ROW 5--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Pay Frequency--> */}
            <div className="lc-column columns small-6">
              <Field name={payFrequency}
                     component={SelectGroup}
                     label={_cms(payFrequency)}
                     options={[defaultEmptyValueOptionGen(), ...payFrequencyOptions]}
                     validate={[required, optionSelected]} />
            </div>
            {/* <!--Gross Salary-->*/}
            <div className="lc-column columns small-6">
              <Field name="grossSalary"
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     type={inputTypes.text}
                     label={_cms('grossSalary')}
                     placeholder={cms['dollarSign.placeholder']}
                     validate={[required]} />
            </div>
          </div>
        </div>
        {/* <!--ROW 6--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Average Overtime--> */}
            <div className="lc-column columns small-6">
              <Field name="averageOvertime"
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     type={inputTypes.text}
                     label={_cms('averageOvertime')}
                     placeholder={cms['dollarSign.placeholder']} />
            </div>
            {/* <!--Average Tips-->*/}
            <div className="lc-column columns small-6">
              <Field name="averageTips"
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     type={inputTypes.text}
                     label={_cms('averageTips')}
                     placeholder={cms['dollarSign.placeholder']} />
            </div>
          </div>
        </div>
        {/* <!--ROW 6--> */}
        <div className="lc-row row">
          <div className="lc-column columns small-12">
            {/* <!--Bonus Amount--> */}
            <div className="lc-column columns small-6">
              <Field name="bonusAmount"
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     type={inputTypes.text}
                     label={_cms('bonusAmount')}
                     placeholder={cms['dollarSign.placeholder']} />
            </div>
            {/* <!--Bonus Frequency-->*/}
            <div className="lc-column columns small-6">
              <Field name={bonusFrequency}
                     component={SelectGroup}
                     label={_cms(bonusFrequency)}
                     options={[defaultEmptyValueOptionGen(), ...bonusFrequencyOptions]} />
            </div>
          </div>
        </div>
        {/* <!--Buttons -->*/}
        <div className="lc-row row lc-column--buttons">
          <div className="lc-column columns small-4 first-button-container">
            <GenericButton className="lc-button--white"
                           text={cms['button.previous']}
                           onClick={this._onCancel} />
          </div>
          <div className="lc-column columns small-4">
            <GenericButton className="lc-button--blue-secondary"
                           text={cms['button.saveAdd']}
                           type="submit"
                           isDisabled={invalid || submitting} />
          </div>
          <div className="lc-column columns small-4 last-button-container">
            <GenericButton className="lc-button--right lc-button--blue lc-button--blue--primary"
                             text={cms['button.finished']}
                             type="submit"
                             onClick={() => { setTimeout(() => onCancel(), 100); }}
                             isDisabled={invalid || submitting} />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: reduxForms.employerSelfEmploymentForm
})(EmployerSelfEmploymentForm);
