// GLOBAL DEP
import React, { PropTypes, Component } from 'react';
import range from 'lodash/range';

import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
// LOCAL DEPENDANCIES
import cms from '../../../../app/config/messages';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import attrs from '../../../config/preferencesAttributes';
import {
        changeNumberOfChildren,
        toggleCoClient,
      } from '../../../actions/finPlan/finPlanPersonalDetails';
import {
        defaultOption,
        maritalStatusOptions,
        genderOptions,
        yesNoOptions,
        stateOptions
      } from '../../../config/formFieldOptions';
import {
        phone,
        number,
        required,
        birthdate,
        optionSelected,
      } from '../../../utils/formValidationUtils';
import { lookupMessage } from '../../../utils/cmsUtils';
// Components
import GenericButton from '../../GenericButton/GenericButton';
import InputGroup from '../../Form/InputGroup/InputGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';

import './PersonalDetailsInfoForm.scss';

const keyBase = 'personalDetailsInfo';

const genderOptionsCoClient = genderOptions.slice(0);

let PersonalDetailsInfoForm = class Form extends Component { // eslint-disable-line

  static propTypes = {
    invalid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    numberOfChildren: PropTypes.number.isRequired,
    shouldShowCoClientFields: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { removingCoClientFields: false };
  }

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  _toggleCoClient() {
    const { removingCoClientFields } = this.state;
    // NOTE: Magic numbers -- 500 is the ms we delay the dispatch of the toggleCoClient action
    // So that we can allow the co cleint field to animate off of the screen. If props does not
    // Currently have shouldShowCoClientFields set as true we want to fire this off immediately (0)
    const debounceMS = this.props.shouldShowCoClientFields ? 500 : 0;

    if (!removingCoClientFields) {
      this.setState({
        removingCoClientFields: true
      }, () => setTimeout(() => this.setState({
        removingCoClientFields: false
      }, () => this.props.dispatch(toggleCoClient())), debounceMS));
    }
  }

  _checkShowChildInfo(event) {
    const { target: { value } } = event;
    this.props.dispatch(changeNumberOfChildren(parseInt(value || 0, 10)));
  }

  render() {
    const {
      invalid,
      submitting,
      handleSubmit,
      numberOfChildren,
      shouldShowCoClientFields,
    } = this.props;

    const { _cms } = Form;
    const { removingCoClientFields } = this.state;
    return (
      <form className="lc-personal-details-info-form"
            onSubmit={handleSubmit}>
        {/* <!--ROW 1--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
          {/* <!--First Name--> */}
          <div className="lc-column columns small-6">
            <Field name={attrs.firstName}
                   type="text"
                   label={cms['firstName.label']}
                   validate={[required]}
                   component={InputGroup}
                   placeholder={cms['firstName.placeholder']} />
          </div>
          {/* <!--Last Name--> */}
          <div className="lc-column columns small-6">
            <Field name={attrs.lastName}
                   type="text"
                   label={cms['lastName.label']}
                   validate={[required]}
                   component={InputGroup}
                   placeholder={cms['lastName.placeholder']} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
          {/* <!--Date of Birth--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.birthdate}
                   mask={fieldMasks.dateTwoDigitYear}
                   label={cms['birthdate.label']}
                   validate={[required]}
                   component={InputGroup}
                   placeholder={cms['birthdate.placeholder']} />
          </div>
          {/* <!--Gender--> */}
          <div className="lc-column columns small-6">
            <RadioGroup name={attrs.gender}
                        label={cms['gender.label']}
                        fields={genderOptions}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        {/* <!--Add Co-Client--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row--large">
          <div className="lc-column lc-column--left columns small-12">
            <div className="lc-personal-details-info-form__button--input-style text-center"
                 onClick={::this._toggleCoClient}>
              {shouldShowCoClientFields ? _cms('button.coClient.remove') : _cms('button.coClient.add')}
            </div>
            <div className="text-left lc-add-co-client__text">
              {_cms('coClient.addCoClientText')}
            </div>
          </div>
        </div>
        {shouldShowCoClientFields &&
          <div className={cx('lc-column columns lc-co-client-row animated fadeIn',
            { 'lc-co-client-row--hidden': removingCoClientFields }
          )}>
            {/* <!--ROW 4--> */}
            <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
              {/* <!--Co-Client First Name--> */}
              <div className="lc-column lc-column--left columns small-6">
                <Field name={attrs.firstNameCoClient}
                  component={InputGroup}
                  type="text"
                  label={cms['firstName.label']}
                  validate={[required]}
                  placeholder={cms['firstName.label']} />
              </div>
              {/* <!--Co-Client Last Name--> */}
              <div className="lc-column columns small-6">
                <Field name={attrs.lastNameCoClient}
                       component={InputGroup}
                       label={cms['lastName.label']}
                       placeholder={cms['lastName.label']}
                       validate={[required]} />
              </div>
            </div>
            {/* <!--ROW 5--> */}
            <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
              {/* <!--Date of Birth--> */}
              <div className="lc-column lc-column--left columns small-6">
                <Field name={attrs.birthdateCoClient}
                       component={InputGroup}
                       mask={fieldMasks.dateTwoDigitYear}
                       label={cms['settings.birthdate']}
                       placeholder={cms['settings.birthdate']}
                       validate={[birthdate, required]} />
              </div>
              {/* <!--Co-Client Gender--> */}
              <div className="lc-column columns small-6">
                <RadioGroup name={attrs.genderCoClient}
                            fields={genderOptionsCoClient}
                            label={cms['settings.gender']}
                            placeholder={cms['settings.gender']}
                            validate={[required]} />
              </div>
            </div>
          </div>
        }
        {/* <!--ROW 6--> */}
        <div className="lc-column columns small-10 small-offset-1">
          {/* <!--Tax Filing Status--> */}
          <div className="lc-column columns small-6">
            <RadioGroup name={attrs.hasSubmitedTaxReturnsInLastTwoYears}
                        fields={yesNoOptions}
                        label={cms['settings.hasSubmitedTaxReturnsInLastTwoYears']}
                        validate={[required]} />
          </div>
          <div className="lc-column columns small-6">
            <Field name={attrs.phone}
                   component={InputGroup}
                   mask={fieldMasks.usPhone}
                   label={cms['phoneNumber.label']}
                   placeholder={cms['phoneNumber.label']}
                   validate={[required, phone]} />
          </div>
        </div>
        {/* <!--ROW 7--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
          {/* <!--State--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.state}
                   component={SelectGroup}
                   label={cms['state.label']}
                   options={[defaultOption, ...stateOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Zip Code--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.zipCode}
                   component={InputGroup}
                   mask={fieldMasks.zipCode}
                   label={cms['zipCode.label']}
                   validate={[required]}
                   placeholder={cms['zipCode.placeholder']} />
          </div>
        </div>
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
          {/* <!--State--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.maritalStatus}
                   component={SelectGroup}
                   options={[defaultOption, ...maritalStatusOptions]}
                   label={cms['maritalStatus.label']}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Zip Code--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.numberOfChildren}
                   mask={fieldMasks.children}
                   label={cms['numberOfChildren.label']}
                   validate={[required, number]}
                   component={InputGroup}
                   onChangeCB={::this._checkShowChildInfo}
                   placeholder={cms['numberOfChildren.placeholder']} />
          </div>
        </div>
        {/* <!--CHILDREN--> */}
        {range(0, numberOfChildren).map(idx =>
          (<div key={idx + 1}
                className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
            <div className="lc-column columns small-6">
              <Field name={`child${idx}.name`}
                     component={InputGroup}
                     type="text"
                     label={cms['childName.label']}
                     placeholder={cms['childName.placeholder']}
                     validate={[required]} />
            </div>
            <div className="lc-column columns small-6">
              <Field name={`child${idx}.birthdate`}
                     component={InputGroup}
                     mask={fieldMasks.dateTwoDigitYear}
                     label={cms['childBirthdate.label']}
                     placeholder={cms['childBirthdate.placeholder']}
                     validate={[required]} />
            </div>
          </div>)
          )}
        {/* <!--BUTTONS--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-personal-details-info-form__row">
          <div className="lc-fin-plan__buttons">
            <GenericButton className="lc-button--right lc-button--blue"
                         type="submit"
                         isDisabled={invalid || submitting}
                         text={cms['button.next']} />
          </div>
        </div>
      </form>
    );
  }
};

PersonalDetailsInfoForm = reduxForm({
  form: 'personalDetailsInfoForm',
  destroyOnUnmount: false,
})(PersonalDetailsInfoForm);

export default PersonalDetailsInfoForm;
