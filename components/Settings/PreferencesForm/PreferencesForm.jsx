// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import cx from 'classnames';
import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import { formatMoney } from 'accounting';

import {
        Field,
        touch,
        change,
        reduxForm,
        formValueSelector
       } from 'redux-form';
// Local Deps
// Components
import InputGroup from '../../Form/InputGroup/InputGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';
import FontAwesomeIcon from '../../FontAwesomeIcon/FontAwesomeIcon';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';
import InlineEditTable from '../../Form/InlineEditTable/InlineEditTable';
import { fisecalCategories } from '../../../constants/enums/yodleeCategories';
import {
       formatYodleeCategorySelectOptions,
       formatYodleeCategorySelectOrder
     } from '../../../utils/yodleeCategoryUtils';
import cms from '../../../config/messages';
import {
        rulesTableContainerHeight,
        currencyPrecision
      } from '../../../config/properties';
import { calculateTableWidth } from '../../../utils/dimensionUtils';
import Routes from '../../../constants/Routes';
import reduxForms from '../../../config/reduxForms';
import objectives from '../../../constants/enums/objectives';
import attrs from '../../../config/preferencesAttributes';
import fieldMasks from '../../../constants/enums/fieldMasks';
import { getStartOfNextMonth } from '../../../utils/dateUtils';
import { createUserRepresentationForSave } from '../../../utils/settingsUtils';

import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';

import {
        saveUserData,
        verifyUserPassword
      } from '../../../actions/global/users';

import {
        updateFieldSet,
        changeFormFieldType,
        toggleCoClientFields,
        changeNumberOfChildren,
        cancelStripeSubscription,
        toggleAdvisorCallInformation,
        setPreferencesSubmissionError,
      } from '../../../actions/settings';

import {
        stateOptions,
        yesNoOptions,
        genderOptions,
        defaultOption,
        objectiveOptions,
        experienceOptions,
        maritalStatusOptions,
        defaultEmptyValueOptionGen
       } from '../../../config/formFieldOptions';

import {
        phone,
        number,
        required,
        birthdate,
       } from '../../../utils/formValidationUtils';

const genderOptionsCoClient = genderOptions.slice(0);
const precision = { precision: currencyPrecision };


const isOtherPleaseTypeOptipn = option => option && !Object.keys(objectives).includes(option);

class PreferencesForm extends Component {

  static propTypes = {
    userId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    cardData: PropTypes.object.isRequired,
    fieldTypes: PropTypes.object.isRequired,
    userUpdated: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    submissionError: PropTypes.string,
    hasBegunFinPlan: PropTypes.bool.isRequired,
    editableFieldSets: PropTypes.array,
    numberOfChildren: PropTypes.number.isRequired,
    isStripeSubCancelled: PropTypes.bool,
    stripePlanPaymentName: PropTypes.any,
    stripePlanPaymentAmount: PropTypes.any,
    verificationInProgress: PropTypes.bool.isRequired,
    shouldShowCoClientFields: PropTypes.bool.isRequired,
    showAdvisorCallInformation: PropTypes.bool.isRequired,
    hasPasswordVerificationError: PropTypes.bool.isRequired,
    currentPasswordCustomValidation: PropTypes.string,
    shouldShowConfirmPasswordField: PropTypes.bool,
    confirmPasswordValidationMessage: PropTypes.string
  };

  static _getColumnsForTable(rulesTableColumnWidth) {
    const yodleeCategorySelectOptions = formatYodleeCategorySelectOptions(fisecalCategories);
    const yodleeCategorySelectOrder = formatYodleeCategorySelectOrder(fisecalCategories);
    return [{
        header: 'Original Name',
        isActive: true,
        mapping: 'originalName',
        isSortable: true,
        isEditable: false,
        colWidth: rulesTableColumnWidth
      },
      {
        header: 'Updated Name',
        isActive: true,
        mapping: 'name',
        isSortable: true,
        isEditable: true,
        colWidth: rulesTableColumnWidth
      },
      {
        header: 'Original Category',
        isActive: true,
        mapping: 'originalCategory',
        isSortable: true,
        isEditable: false,
        colWidth: rulesTableColumnWidth
      },
      {
        name: 'category',
        mapping: 'category',
        header: 'Updated Category',
        isActive: true,
        isVisible: true,
        isSortable: true,
        isEditable: true,
        fieldType: 'select',
        selectOptions: yodleeCategorySelectOptions,
        selectOrder: yodleeCategorySelectOrder,
        colWidth: rulesTableColumnWidth
      }
    ];
  }

  componentDidMount() {
    const { dispatch, initialValues } = this.props;
    dispatch(touch(reduxForms.preferencesForm, attrs.state));
    dispatch(touch(reduxForms.preferencesForm, attrs.maritalStatus));
    dispatch(touch(reduxForms.preferencesForm, attrs.currentPassword));
    if (isOtherPleaseTypeOptipn(initialValues[attrs.objective])) {
      dispatch(changeFormFieldType(attrs.objective));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, fieldTypes, initialValues } = nextProps;
    if (fieldTypes[attrs.objective] && !isOtherPleaseTypeOptipn(initialValues[attrs.objective])) {
      dispatch(change(reduxForms.preferencesForm, attrs.objective, ' '));
    }
  }

  _handleChange(event, newValue) {
    const { target: { name } } = event;
    if (newValue === OTHER_PLEASE_TYPE) {
      event.preventDefault();
      this.props.dispatch(changeFormFieldType(name));
    }
  }

  _checkShowChildInfo(event) {
    const { target: { value } } = event;
    this.props.dispatch(changeNumberOfChildren(parseInt(value || 0, 10)));
  }

  _onSubmit(formValues) {
    const {
      userId,
      dispatch,
      verificationInProgress,
      shouldShowCoClientFields,
      hasPasswordVerificationError
    } = this.props;

    const { newPassword, currentPassword, confirmNewPassword } = formValues;
    const hasPasswordValues = newPassword || confirmNewPassword;
    const passwordsAreEqual = newPassword === confirmNewPassword;

    let submissionError = '';

    if (((hasPasswordValues && !passwordsAreEqual))) {
      if (hasPasswordVerificationError) {
        submissionError = cms['settings.submissionError'];
      }
    }
    else if (verificationInProgress) {
      submissionError = cms['settings.verificationInProgress'];
    }

    dispatch(setPreferencesSubmissionError(submissionError));

    if (!submissionError && !verificationInProgress) {
      const options = hasPasswordValues ? { newPassword, currentPassword } : {};
      dispatch(
        saveUserData(
          userId,
          createUserRepresentationForSave(formValues, shouldShowCoClientFields, options)
        )
      );
    }
  }

  _verifyPassword = ({ target: { value } }) => {
    if (value) this.props.dispatch(verifyUserPassword(value));
  }

  _toggleCoClientFields() {
    this.props.dispatch(toggleCoClientFields());
  }

  _updateRowItem(data) {
    this.props.dispatch(updateFieldSet(data));
  }

  _cancelStripeSubscription() {
    this.props.dispatch(cancelStripeSubscription());
  }

  _toggleAdvisorCallInformation() {
    this.props.dispatch(toggleAdvisorCallInformation());
  }

  render() {
    const {
      dispatch,
      cardData,
      fieldTypes,
      userUpdated,
      handleSubmit,
      submissionError,
      hasBegunFinPlan,
      numberOfChildren,
      editableFieldSets,
      isStripeSubCancelled,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      shouldShowCoClientFields,
      showAdvisorCallInformation,
      currentPasswordCustomValidation,
      confirmPasswordValidationMessage,
      shouldShowConfirmPasswordField,
    } = this.props;

    const { _getColumnsForTable } = PreferencesForm;
    const paymentDenominator = 100;

    const toggleCoClientButtonName = shouldShowCoClientFields ?
       cms['settings.removeCoClient'] : cms['settings.addCoClient'];

    const { rulesTableColumnWidth, rulesTableContainerWidth } = calculateTableWidth();

    const rulesColumns = _getColumnsForTable(rulesTableColumnWidth);

    const rulesPreferencesConfig = {
      items: editableFieldSets,
      containerHeight: 1000,
      columns: rulesColumns,
      idMapping: 'id',
      dispatch,
      rowHeight: 100,
      updateItem: data => ::this._updateRowItem(data),
      canEdit: true,
      allowEmpty: true,
    };

    return (
      <div className="lc-preferences__container">
        <form onSubmit={handleSubmit(::this._onSubmit)}>
          <div className="lc-preferences__body-personal-info columns small-12">
            <div className="lc-preferences__header-personal-info">
              {cms['settings.personalInformation']}
            </div>
            {/* PERSONAL - left side information */}
            <div className="lc-preferences__form-fields-personal-info columns small-6">
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.firstName}>
                  {`${cms['firstName.label']}:`}
                </label>
                <Field name={attrs.firstName}
                       component={InputGroup}
                       type="text"
                       validate={[required]}
                       placeholder={cms['firstName.label']} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.lastName}>
                  {`${cms['lastName.label']}:`}
                </label>
                <Field name={attrs.lastName}
                       component={InputGroup}
                       placeholder={cms['lastName.label']} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.birthdate}>
                  {`${cms['settings.birthdate']}:`}
                </label>
                <Field name={attrs.birthdate}
                       component={InputGroup}
                       mask={fieldMasks.dateTwoDigitYear}
                       placeholder={cms['settings.birthdate']}
                       validate={[birthdate]} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.gender}>
                  {`${cms['settings.gender']}:`}
                </label>
                <RadioGroup name={attrs.gender}
                            fields={genderOptions}
                            placeholder={cms['settings.gender']} />
              </div>
            </div>
            {/* CO-CLIENT - right side details/button */}
            <div className="lc-preferences__form-fields-co-client columns small-6">
              {
                shouldShowCoClientFields &&
                  <div>
                    <div className="lc-preferences__form-fields-co-client-label">
                      <span className="lc-preferences__form-field-label-co-client">
                        {cms['settings.coClients']}
                      </span>
                    </div>
                    <div className="lc-preferences__form-field">
                      <label className="lc-personal-field-title"
                        htmlFor={attrs.firstNameCoClient}>
                        {`${cms['firstName.label']}:`}
                      </label>
                      <Field name={attrs.firstNameCoClient}
                             component={InputGroup}
                             type="text"
                             validate={[required]}
                             placeholder={cms['firstName.label']} />
                    </div>
                    <div className="lc-preferences__form-field">
                      <label className="lc-personal-field-title"
                        htmlFor={attrs.lastNameCoClient}>
                        {`${cms['lastName.label']}:`}
                      </label>
                      <Field name={attrs.lastNameCoClient}
                             component={InputGroup}
                             placeholder={cms['lastName.label']}
                             validate={[required]} />
                    </div>
                    <div className="lc-preferences__form-field">
                      <label className="lc-personal-field-title"
                        htmlFor={attrs.birthdateCoClient}>
                        {`${cms['settings.birthdate']}:`}
                      </label>
                      <Field name={attrs.birthdateCoClient}
                             component={InputGroup}
                             mask={fieldMasks.dateTwoDigitYear}
                             placeholder={cms['settings.birthdate']}
                             validate={[birthdate]} />
                    </div>
                    <div className="lc-preferences__form-field">
                      <label className="lc-personal-field-title"
                        htmlFor={attrs.genderCoClient}>
                        {`${cms['settings.gender']}:`}
                      </label>
                      <RadioGroup name={attrs.genderCoClient}
                                  fields={genderOptionsCoClient}
                                  placeholder={cms['settings.gender']} />
                    </div>
                  </div>
                }
              <div className="lc-preferences__add-co-client">
                <GenericButton className="lc-generic-button--white"
                                 text={toggleCoClientButtonName}
                                 onClick={::this._toggleCoClientFields} />
                <div className="lc-preferences__co-client-message">
                  {cms['settings.coClientMessage']}
                </div>
              </div>
            </div>
            {/* BOTTOM - the rest of the personal information */}
            <div className="lc-preferences__form-fields-remaining-info columns small-6 small-centered">
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.currentPassword}>
                  {`${cms['settings.currentPassword']}:`}
                </label>
                <Field name={attrs.currentPassword}
                       onBlur={::this._verifyPassword}
                       inputClass="lc-preferences__password"
                       component={InputGroup}
                       placeholder={cms['settings.currentPassword']}
                       customValidationMessage={currentPasswordCustomValidation} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.newPassword}>
                  {`${cms['settings.newPassword']}:`}
                </label>
                <Field name={attrs.newPassword}
                       inputClass="lc-preferences__password"
                       component={InputGroup}
                       placeholder={cms['settings.newPassword']} />
              </div>
              {shouldShowConfirmPasswordField &&
                <div className="lc-preferences__form-field">
                  <label className="lc-personal-field-title"
                    htmlFor={attrs.confirmNewPassword}>
                    {`${cms['settings.confirmNewPassword']}:`}
                  </label>
                  <Field name={attrs.confirmNewPassword}
                         inputClass="lc-preferences__password"
                         component={InputGroup}
                         placeholder={cms['settings.confirmNewPassword']}
                         customValidationMessage={confirmPasswordValidationMessage} />
                </div>
              }
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.phone}>
                  {`${cms['phoneNumber.label']}:`}
                </label>
                <Field name={attrs.phone}
                       component={InputGroup}
                       mask={fieldMasks.usPhone}
                       placeholder={cms['phoneNumber.label']}
                       validate={[phone]} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.state}>
                  {`${cms['state.label']}:`}
                </label>
                <div className="lc-select-group">
                  <Field name={attrs.state}
                        component={SelectGroup}
                        placeholder={cms['state.label']}
                        options={[defaultOption, ...stateOptions]} />
                </div>
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.zipCode}>
                  {`${cms['zipCode.label']}:`}
                </label>
                <Field name={attrs.zipCode}
                       component={InputGroup}
                       mask={fieldMasks.zipCode}
                       placeholder={cms['zipCode.placeholder']} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.hasSubmitedTaxReturnsInLastTwoYears}>
                  {`${cms['settings.hasSubmitedTaxReturnsInLastTwoYears']}:`}
                </label>
                <RadioGroup name={attrs.hasSubmitedTaxReturnsInLastTwoYears}
                            fields={yesNoOptions}
                            placeholder={cms['settings.hasSubmitedTaxReturnsInLastTwoYears']}
                            validate={[required]} />
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.maritalStatus}>
                  {`${cms['maritalStatus.label']}:`}
                </label>
                <div className="lc-select-group">
                  <Field name={attrs.maritalStatus}
                       component={SelectGroup}
                       options={[defaultOption, ...maritalStatusOptions]}
                       placeholder={cms['maritalStatus.label']} />
                </div>
              </div>
              <div className="lc-preferences__form-field">
                <label className="lc-personal-field-title"
                  htmlFor={attrs.numberOfChildren}>
                  {`${cms['numberOfChildren.label']}:`}
                </label>
                <Field name={attrs.numberOfChildren}
                       mask={fieldMasks.children}
                       validate={[number]}
                       component={InputGroup}
                       onChangeCB={::this._checkShowChildInfo}
                       placeholder={cms['numberOfChildren.placeholder']} />
              </div>
            </div>
            <div className="lc-childrens-info-container">
              {range(0, numberOfChildren).map(idx =>
                (<div key={idx + 1}
                      className="lc-column columns small-7 small-offset-5 lc-personal-details-info-form__row">
                  <div className="lc-preferences__form-field">
                    <label className="lc-personal-field-title"
                      htmlFor={`child${idx}.name`}>
                      {`${cms['childName.label']}:`}
                    </label>
                    <Field name={`child${idx}.name`}
                            component={InputGroup}
                            type="text"
                            placeholder={cms['childName.placeholder']}
                            validate={[required]} />
                  </div>
                  <div className="lc-preferences__form-field">
                    <label className="lc-personal-field-title"
                      htmlFor={`child${idx}.birthdate`}>
                      {`${cms['childBirthdate.label']}:`}
                    </label>
                    <Field name={`child${idx}.birthdate`}
                            component={InputGroup}
                            mask={fieldMasks.dateTwoDigitYear}
                            placeholder={cms['childBirthdate.placeholder']}
                            validate={[required, birthdate]} />
                  </div>
                </div>)
              )}
            </div>
          </div>
          <div className="lc-preferences__container-generic lc-columns columns small-10">
            <div className="lc-preferences__header-generic">
              {cms['settings.financialPlanDetails.label']}
              { !isStripeSubCancelled &&
                <GenericButton className="lc-preferences__fin-plan-cancel"
                  text={cms['settings.finPlan.cancel.label']}
                  onClick={::this._cancelStripeSubscription} />
              }
            </div>
            { !hasBegunFinPlan ?
              <div className="fin-plan-begin-button-container">
                <GenericNavButton className="lc-generic-button--blue text-center"
                                  route={Routes.financialPlan}
                                  text={cms['settings.finPlan.startFinPlan']} />
              </div>
              :
              !isStripeSubCancelled ?
                <div className="lc-preferences__body-generic">
                  <div className="lc-preferences__row">
                    <div className="lc-column columns small-4">
                      <span className="lc-preferences__form-label">
                        {cms['settings.planSelection.label']}:
                      </span>
                    </div>
                    <div className="lc-column columns small-5 lc-preferences__payment-form-field">
                      <span>
                        {stripePlanPaymentName}
                      </span>
                    </div>
                  </div>
                  <div className="lc-preferences__row bottom">
                    <div className="lc-column columns small-4">
                      <div className="lc-preferences__form-label bottom-label">
                        <span>
                          {cms['settings.paymentMethod.label']}:
                        </span>
                      </div>
                    </div>
                    <div className="lc-column columns small-5 lc-preferences__payment-form-field">
                      <div className="lc-preferences__payment-fields-data">
                        <span>
                          {cms['finPlanPayment.cardEnding'](
                            cardData.brand,
                            cardData.last4
                          )}
                        </span>
                        <span>
                          {cms['finPlanPayment.cardExpires'](
                            cardData.exp_month,
                            cardData.exp_year
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="lc-preferences__message lc-columns columns small-12">
                    {cms['settings.payment.message'](
                      getStartOfNextMonth(),
                      // Need floor calculation below since stripe sends 25.00 as 2500
                      formatMoney(
                        Math.floor(stripePlanPaymentAmount / paymentDenominator),
                        precision)
                      )
                    }
                  </div>
                </div>
            :
                <div className="lc-preferences__body-generic">
                  <div className="lc-preferences__body-no-data">
                    {cms['settings.noStripeSubscription']}
                  </div>
                </div>
            }
          </div>
          <div className="lc-preferences__container-generic lc-columns columns small-10">
            <div className="lc-preferences__header-generic">
              {cms['settings.rules.label']}
            </div>
            <div className="lc-preferences__body-generic lc-columns columns small-12">
              <div className="lc-preferences__small-message">
                {cms['settings.rulesMessage']}
              </div>
              { !isEmpty(editableFieldSets) &&
                <div className="lc-preferences__table">
                  <InlineEditTable
                    containerWidth={rulesTableContainerWidth}
                    containerHeight={rulesTableContainerHeight}
                    containerHeightOveride={rulesTableContainerHeight}
                    columns={rulesColumns}
                    items={editableFieldSets}
                    {...rulesPreferencesConfig} />
                </div>
              }
            </div>
          </div>
          <div className="lc-preferences__container-generic lc-columns columns small-10">
            <div className="lc-preferences__header-generic">
              {cms['settings.advisor_call.label']}
              <FontAwesomeIcon icon="chevron-down"
                               onClick={::this._toggleAdvisorCallInformation}
                               optionalClassName="hide-advisor-call-information-icon" />
            </div>
            {showAdvisorCallInformation &&
              <div className="animated fadeIn">
                {/* <!--Income--> */}
                <div className="lc-column columns small-6">
                  <Field name={attrs.income}
                         component={InputGroup}
                         type="text"
                         label={cms['advisorConnectInfo.field.income.label']}
                         mask={fieldMasks.currency}
                         placeholder={cms['advisorConnectInfo.field.placeholder.zeroDollars']} />
                </div>
                {/* <!--Debt--> */}
                <div className="lc-column columns small-6">
                  <Field name={attrs.debt}
                         component={InputGroup}
                         type="text"
                         label={cms['advisorConnectInfo.field.debt.label']}
                         mask={fieldMasks.currency}
                         placeholder={cms['advisorConnectInfo.field.placeholder.zeroDollars']} />
                </div>
                {/* <!--ROW 8--> */}
                {/* <!--Objective--> */}
                <div className="lc-column columns small-6">
                  {
                    fieldTypes[attrs.objective] ?
                      (<Field name={attrs.objective}
                              component={InputGroup}
                              onCancelCB={() => dispatch(changeFormFieldType(attrs.objective))}
                              label={cms['advisorConnectInfo.field.objective.label']} />)
                    :
                    (<Field name={attrs.objective}
                           component={SelectGroup}
                           hasOther
                           onChange={::this._handleChange}
                           label={cms['advisorConnectInfo.field.objective.label']}
                           options={[defaultEmptyValueOptionGen(), ...objectiveOptions]} />)
                  }
                </div>
                {/* <!--Experience--> */}
                <div className="lc-column columns small-6">
                  <Field name={attrs.experience}
                         component={SelectGroup}
                         label={cms['advisorConnectInfo.field.experience.label']}
                         options={[defaultEmptyValueOptionGen(), ...experienceOptions]} />
                </div>
              </div>
            }
          </div>
          {(userUpdated || submissionError) &&
            <div className="lc-preferences__container-generic lc-columns columns small-10">
              <div className={cx({
                'lc-preferences__save-error-message': submissionError,
                'lc-preferences__save-success-message': !submissionError })}>
                {submissionError || cms['settings.saved']}
              </div>
            </div>}
          <div className="lc-preferences__button-container lc-columns columns small-10">
            <Link to={Routes.dashboard}>
              <GenericButton className="lc-preferences__dashboard-button"
                text={cms['settings.dashboardButton']} />
            </Link>
            <GenericButton className="lc-generic-button--blue"
                           text="Save"
                           type="submit"
                           onClick={handleSubmit(::this._onSubmit)} />
          </div>
        </form>
      </div>
    );
  }
}

const DecoratedForm = reduxForm({
  form: reduxForms.preferencesForm,
  destroyOnUnmount: false,
  onSubmitFail: (errors, dispatch) =>
    dispatch(setPreferencesSubmissionError(cms['settings.submissionError']))
})(PreferencesForm);

const selectConfirmPasswordValidationMessage = (newPass, confirmation) =>
  ((newPass || confirmation) && (confirmation !== newPass) ? cms['settings.matchNewAndOld'] : null);

const selector = formValueSelector(reduxForms.preferencesForm);

const ConnectedForm = connect((state) => {
  const { settings: { hasPasswordVerificationError } } = state;

  const {
    newPassword,
    confirmNewPassword
  } = selector(state, attrs.newPassword, attrs.confirmNewPassword);

  return {
    hasBegunFinPlan: !!state.finPlan.id,
    shouldShowConfirmPasswordField: !isEmpty(newPassword),
    currentPasswordCustomValidation: hasPasswordVerificationError ? cms['settings.verifyPassword'] : null,
    confirmPasswordValidationMessage:
      selectConfirmPasswordValidationMessage(newPassword, confirmNewPassword)
  };
})(DecoratedForm);

export default ConnectedForm;
