/* eslint-disable */
// TODO: Cleanup lints and re-enable linting in this file if we choose to keep this form around
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, change, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import fieldMasks from '../../constants/enums/fieldMasks';

import InputGroup from '../../components/Form/InputGroup/InputGroup';
import TextGroup from '../../components/Form/TextGroup/TextGroup';
import RadioGroup from '../../components/Form/RadioGroup/RadioGroup';
import SelectGroup from '../../components/Form/SelectGroup/SelectGroup';
import CheckboxGroup from '../../components/Form/CheckboxGroup/CheckboxGroup';

import {
  yesNoOptions,
  genderOptions,
  objectiveOptions,
  experienceOptions,
  maritalStatusOptions,
  defaultEmptyValueOptionGen
} from '../../config/formFieldOptions';

import {
  number,
  required,
  optionSelected
} from '../../utils/formValidationUtils';

import { changeFormFieldType } from '../../actions/advisorConnect';

import Routes from '../../constants/Routes';
import reduxForms from '../../config/reduxForms';
import { lookupMessage } from '../../utils/cmsUtils';
import finPlanAttributes from '../../constants/enums/finPlanAttributes';

import { OTHER_PLEASE_TYPE } from '../../constants/AppConstants';

const {
  maritalStatus,
  childrenCount,
  hasSubmitedTaxReturnsInLastTwoYears,
  income,
  debt,
  objective,
  experience,
  gavePermissionToViewFinData,
  savings,
  retirement,
  creditCardDebt,
  studentLoanDebt,
} = finPlanAttributes;

const keyBase = 'advisorConnectInfo';

class AdvisorConnectInfoForm extends Component {

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _getInitialState(hasPermission) {
    return { hasPermission, hasCoClient: false };
  }

  constructor(props) {
    super(props);
    const { initialValues: { gavePermissionToViewFinData } } = props;
    this.state = AdvisorConnectInfoForm._getInitialState(gavePermissionToViewFinData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fieldTypes[objective]) {
      this.props.dispatch(change(reduxForms.advisorConnectInfoForm, objective, ' '));
    }
  }

  _togglePermission() {
    this.setState({ hasPermission: !this.state.hasPermission });
  }

  _toggleCoClient() {
    this.setState({ hasCoClient: !this.state.hasCoClient });
  }

  _handleChange(event, newValue) {
    const { target: { name } } = event;
    if (newValue === OTHER_PLEASE_TYPE) {
      event.preventDefault();
      this.props.dispatch(changeFormFieldType(name));
    }
  }

  render() {
    const {
      invalid,
      dispatch,
      onSubmit,
      lastName,
      firstName,
      fieldTypes,
      submitting,
      handleSubmit,
    } = this.props;

    const { _cms } = AdvisorConnectInfoForm;
    const { hasPermission, hasCoClient } = this.state;
    const permissionClass = hasPermission ? 'lc-column--hidden' : 'lc-column--visible';
    const coClientClass = !hasCoClient ? 'lc-column--hidden' : 'lc-column--visible';
    const coClientButtonText = !hasCoClient ? _cms('button.coClient.add') : _cms('button.coClient.remove');
    const permittedValidation = hasPermission ? [] : [required];

    return (
      <form className="lc-advisor-connect-info-form" onSubmit={handleSubmit(onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--First Name--> */}
          <div className="lc-column lc-column--left columns medium-5">
            <TextGroup label={_cms('field.firstName.label')}
                       text={firstName} />
          </div>
          {/* <!--Last Name--> */}
          <div className="lc-column columns medium-7">
            <TextGroup label={_cms('field.lastName.label')}
                       text={lastName} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--Age--> */}
          <div className="lc-column lc-column--left columns medium-5">
            <Field name="age"
                   type="number"
                   mask={fieldMasks.age}
                   label={_cms('field.age.label')}
                   validate={[required, number]}
                   hideGuide
                   component={InputGroup}
                   placeholder={_cms('field.age.placeholder')} />
          </div>
          {/* <!--Gender--> */}
          <div className="lc-column columns medium-7">
            <RadioGroup name="gender"
                        fields={genderOptions}
                        label={_cms('field.gender.label')}
                        validate={[required]} />
          </div>
        </div>
        <div className={coClientClass}>
          {/* <!--ROW 3--> */}
          <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row animated fadeIn">
            {/* <!--Co-Client First Name--> */}
            <div className="lc-column lc-column--left columns medium-5">
              <Field name="coClientFirstName"
                     component={InputGroup}
                     type="text"
                     label={_cms('field.coClientFirstName.label')}
                     placeholder={_cms('field.coClientFirstName.placeholder')} />
            </div>
            {/* <!--Co-Client Last Name--> */}
            <div className="lc-column columns medium-7">
              <Field name="coClientLastName"
                     component={InputGroup}
                     type="text"
                     label={_cms('field.coClientLastName.label')}
                     placeholder={_cms('field.coClientLastName.placeholder')} />
            </div>
          </div>
          {/* <!--ROW 4--> */}
          <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
            {/* <!--Co-Client Age--> */}
            <div className="lc-column lc-column--left columns medium-5">
              <Field name="coClientAge"
                     component={InputGroup}
                     type="text"
                     mask={fieldMasks.age}
                     hideGuide
                     label={_cms('field.coClientAge.label')}
                     placeholder={_cms('field.coClientAge.placeholder')}
                     validate={number} />
            </div>
            {/* <!--Co-Client Gender--> */}
            <div className="lc-column columns medium-7">
              <RadioGroup name="coClientGender"
                          fields={genderOptions}
                          label={_cms('field.coClientGender.label')} />
            </div>
          </div>
        </div>
        {/* <!--ROW 5--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--Add Co-Client--> */}
          <div className="lc-column columns medium-5 lc-column--left-align">
            <button className="lc-button add-co-client-button"
                    onClick={(e) => { e.preventDefault(); this._toggleCoClient(); }}>
              {coClientButtonText}
            </button>
          </div>
          {/* <!--Tax Filing Status--> */}
          <div className="lc-column columns medium-7">
            <RadioGroup name={hasSubmitedTaxReturnsInLastTwoYears}
                        fields={yesNoOptions}
                        label={_cms('field.hasSubmitedTaxReturnsInLastTwoYears.label')}
                        validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 6--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--Marital Status--> */}
          <div className="lc-column lc-column--left columns medium-5">
            <Field name={maritalStatus}
                   component={SelectGroup}
                   label={_cms('field.maritalStatus.label')}
                   options={[defaultEmptyValueOptionGen(), ...maritalStatusOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Number of Children--> */}
          <div className="lc-column columns medium-7">
            <Field name={childrenCount}
                   component={InputGroup}
                   type="number"
                   mask={fieldMasks.age}
                   hideGuide
                   label={_cms('field.children.label')}
                   placeholder={_cms('field.children.placeholder')}
                   validate={[required, number]} />
          </div>
        </div>
        {/* <!--ROW 7--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--Income--> */}
          <div className="lc-column lc-column--left columns medium-5">
            <Field name={income}
                   component={InputGroup}
                   type="text"
                   label={_cms('field.income.label')}
                   mask={fieldMasks.currency}
                   placeholder={_cms('field.placeholder.zeroDollars')}
                   validate={[required]} />
          </div>
          {/* <!--Debt--> */}
          <div className="lc-column columns medium-7">
            <Field name={debt}
                   component={InputGroup}
                   type="text"
                   label={_cms('field.debt.label')}
                   mask={fieldMasks.currency}
                   placeholder={_cms('field.placeholder.zeroDollars')}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 8--> */}
        <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          {/* <!--Objective--> */}
          <div className="lc-column lc-column--left columns medium-5">
            {
              fieldTypes[objective] ?
                (<Field name={objective}
                        component={InputGroup}
                        onCancelCB={() => dispatch(changeFormFieldType(objective))}
                        label={_cms('field.objective.label')}
                        validate={[required]} />)
              :
              (<Field name={objective}
                     component={SelectGroup}
                     hasOther
                     onChange={::this._handleChange}
                     label={_cms('field.objective.label')}
                     options={[defaultEmptyValueOptionGen(), ...objectiveOptions]}
                     validate={[required, optionSelected]} />)
            }
          </div>
          {/* <!--Experience--> */}
          <div className="lc-column columns medium-7">
            <Field name={experience}
                   component={SelectGroup}
                   label={_cms('field.experience.label')}
                   options={[defaultEmptyValueOptionGen(), ...experienceOptions]}
                   validate={[required, optionSelected]} />
          </div>
        </div>
        {/* <!--ROW 9--> NOTE: we are not implementing permissions at this time, so the following code is commented out */}
        {/* <div className="lc-column lc-column--centered columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
          <CheckboxGroup name={gavePermissionToViewFinData}
                         value={hasPermission}
                         label={_cms('field.gavePermissionToViewFinData.text')}
                         onClick={::this._togglePermission} />
        </div> */}
        {/* <div className={permissionClass}>
          <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row">
            <div className="lc-column lc-column--left columns medium-5">
              <Field name={savings}
                     component={InputGroup}
                     type="text"
                     mask={fieldMasks.currency}
                     label={_cms('field.savings.label')}
                     placeholder={_cms('field.placeholder.zeroDollars')}
                     validate={permittedValidation} />
            </div>
            <div className="lc-column columns medium-7">
              <Field name={retirement}
                     component={InputGroup}
                     type="text"
                     mask={fieldMasks.currency}
                     label={_cms('field.retirement.label')}
                     placeholder={_cms('field.placeholder.zeroDollars')}
                     validate={permittedValidation} />
            </div>
          </div>
          <div className="lc-column columns medium-10 medium-offset-1 lc-advisor-connect-info-form__row" >
            <div className="lc-column lc-column--left columns medium-5">
              <Field name={creditCardDebt}
                     component={InputGroup}
                     type="text"
                     mask={fieldMasks.currency}
                     label={_cms('field.creditDebt.label')}
                     placeholder={_cms('field.placeholder.zeroDollars')}
                     validate={permittedValidation} />
            </div>
            <div className="lc-column columns medium-7">
              <Field name={studentLoanDebt}
                     component={InputGroup}
                     type="text"
                     mask={fieldMasks.currency}
                     label={_cms('field.studentLoanDebt.label')}
                     placeholder={_cms('field.placeholder.zeroDollars')}
                     validate={permittedValidation} />
            </div>
          </div>
        </div> */}
        {/* <!--BUTTONS-->  */}
        <div className="lc-column lc-column--buttons columns medium-12">
          <Link to={Routes.advisorConnect}>
            <button className="lc-advisor-connect-info-form__button"
                    type="button">
              {_cms('button.left')}
            </button>
          </Link>
          <button className="lc-advisor-connect-info-form__button
                             lc-advisor-connect-info-form__button--submit"
                  type="submit"
                  disabled={invalid || submitting}>
            {_cms('button.submit')}
          </button>
        </div>
      </form>
    );
  }
}

AdvisorConnectInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  initialValues: PropTypes.object,
  fieldTypes: PropTypes.object.isRequired,
};

export default reduxForm({ form: reduxForms.advisorConnectInfoForm })(AdvisorConnectInfoForm);

/* eslint-enable */
