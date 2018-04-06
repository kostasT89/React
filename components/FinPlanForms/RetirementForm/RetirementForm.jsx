// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
        Form,
        Field,
        touch,
        reduxForm,
        formValueSelector,
      } from 'redux-form';
import ReactS3Uploader from 'react-s3-uploader';
import get from 'lodash/get';
import last from 'lodash/last';
import first from 'lodash/first';
// Local Deps
import {
        required,
        optionSelected,
      } from '../../../utils/formValidationUtils';
import {
        distributionOptions,
        yearlyMonthlyOptions,
        retirementTypeOptions,
        defaultEmptyValueOptionGen
      } from '../../../config/formFieldOptions';

import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupMessage } from '../../../utils/cmsUtils';
import { debounceMS, retirementTerm } from '../../../config/properties';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import { uploadSuccess } from '../../../actions/finPlan/finPlanAssets';
import { changeFormFieldType } from '../../../actions/finPlan/finPlan';
import { shouldChangeFormFieldType } from '../../../utils/finPlan/finPlanUtils';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import GenericButton from '../../GenericButton/GenericButton';
import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';

import './RetirementForm.scss';

// CONSTANTS
const owner = 'owner';
const comments = 'comments';
const planType = 'planType';
const initialId = 'initialValues.id';
const keyBase = 'finPlanAssets.retirementForm';
const primaryBeneficiaryField = 'primaryBeneficiary';
const secondaryBeneficiaryField = 'secondaryBeneficiary';
const employerContributionFrequency = 'employerContributionFrequency';
const individualContributionFrequency = 'individualContributionFrequency';
const additionalEmployerContributionFrequency = 'additionalEmployerContributionFrequency';

const LUMP_SUM = 'lumpSum';
const DISTRIBUTIONS = 'distributions';

// These filds are not correctly rendering and we need to touch them mantually
const touchFields = (dispatch, initialValues) =>
  setTimeout(() => {
    /* eslint-disable */
    initialValues[owner] && dispatch(touch(reduxForms.retirementForm, owner));
    initialValues[comments] && dispatch(touch(reduxForms.retirementForm, comments));
    initialValues[planType] && dispatch(touch(reduxForms.retirementForm, planType));
    initialValues[primaryBeneficiaryField] &&
      dispatch(touch(reduxForms.retirementForm, primaryBeneficiaryField));
    initialValues[secondaryBeneficiaryField] &&
      dispatch(touch(reduxForms.retirementForm, secondaryBeneficiaryField));
    initialValues[employerContributionFrequency] &&
      dispatch(touch(reduxForms.retirementForm, employerContributionFrequency));
    initialValues[individualContributionFrequency] &&
      dispatch(touch(reduxForms.retirementForm, individualContributionFrequency));
    initialValues[additionalEmployerContributionFrequency] &&
      dispatch(touch(reduxForms.retirementForm, additionalEmployerContributionFrequency));
    /* eslint-enable */
  }, debounceMS);

class RetirementForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    apiUrl: PropTypes.any,
    invalid: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.any,
    submitting: PropTypes.bool.isRequired,
    fieldTypes: PropTypes.any,
    clientNames: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    currentFileName: PropTypes.any,
    currentFormValues: PropTypes.any,
    hasEmployerContribution: PropTypes.bool.isRequired,
  };

  static defaultProps = { initialValues: { retirementTerm } };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  componentDidMount() {
    // i.e. if the page was initialized by clicking the edit button
    if (get(this.props, initialId)) {
      touchFields(this.props.dispatch, this.props.initialValues);
      this._updateFormFieldTypeActions(this.props.initialValues);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    // i.e. if they have clicked the edit button while already on the annuity form
    if (nextId && nextId !== currentId) {
      touchFields(this.props.dispatch, nextProps.initialValues);
      this._updateFormFieldTypeActions(nextProps.initialValues);
    }
  }

  _updateFormFieldTypeActions(initialValues) {
    Object.entries(this._generatePossibleOtherPleaseTypeOptions())
    .map((entry) => { // eslint-disable-line
      if (initialValues[first(entry)] &&
          shouldChangeFormFieldType(initialValues[first(entry)], last(entry))) {
        this._dispatchChangeFormFieldTypeActions(first(entry));
      }
    });
  }

  _generatePossibleOtherPleaseTypeOptions() {
    const ownerOptions = createSameKeyValueOptionsFromEnums(this.props.clientNames);
    return {
      [primaryBeneficiaryField]: ownerOptions,
      [secondaryBeneficiaryField]: ownerOptions,
      [employerContributionFrequency]: yearlyMonthlyOptions,
      [individualContributionFrequency]: yearlyMonthlyOptions,
      [additionalEmployerContributionFrequency]: yearlyMonthlyOptions,
    };
  }

  _onSubmit(formValues, formDispatch, formProps) {
    const { reset, onSubmit, currentFileName } = this.props;
    reset();
    onSubmit({ ...formValues, uploadedFilename: currentFileName }, formDispatch, formProps);
  }

  _onUploadError() { // eslint-disable-line
    // TODO: Implement this to handle upload failure
  }

  _onUploadFinish({ filename }) {
    this.props.dispatch(uploadSuccess(filename));
  }

  _handleChange(event, newValue) {
    const { target: { name } } = event;
    if (newValue === OTHER_PLEASE_TYPE) {
      event.preventDefault();
      this.props.dispatch(changeFormFieldType(name));
    }
  }

  _dispatchChangeFormFieldTypeActions(name) {
    this.props.dispatch(changeFormFieldType(name));
  }

  render() {
    const {
      apiUrl,
      invalid,
      onCancel,
      dispatch,
      submitting,
      fieldTypes,
      clientNames,
      handleSubmit,
      currentFileName,
      currentFormValues: {
        distributionType,
      },
      hasEmployerContribution
    } = this.props;

    const { _cms } = RetirementForm;
    const ownerOptions = createSameKeyValueOptionsFromEnums(clientNames);

    const id = get(this.props, initialId);
    const initialValues = this.props.initialValues || {};
    const filename = currentFileName || initialValues.uploadedFilename;
    const commentValidation = hasEmployerContribution ? { validate: [required] } : {};

    return (
      <Form className="lc-retirement-form"
            onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-retirement-form__row">
          {/* <!--Plan Type--> */}
          <div className="lc-column lc-column--left columns medium-6">
            {
              fieldTypes[planType] ? (
                <Field name={planType}
                       component={InputGroup}
                       onCancelCB={() =>
                         dispatch(changeFormFieldType(planType))}
                       label={_cms('field.plan-type.label')}
                       validate={[required]} />
              )
              :
              (<Field name={planType}
                      hasOther
                      onChange={::this._handleChange}
                      component={SelectGroup}
                      label={_cms('field.plan-type.label')}
                      placeholder={cms['pleaseMakeSelection.placeholder']}
                      options={[defaultEmptyValueOptionGen(), ...retirementTypeOptions]}
                      validate={[required, optionSelected]} />)
            }
          </div>
          {/* <!--Owner-->*/}
          <div className="lc-column columns medium-6">
            <Field name={owner}
                   component={SelectGroup}
                   label={_cms('field.plan-owner.label')}
                   placeholder={cms['pleaseMakeSelection.placeholder']}
                   options={[defaultEmptyValueOptionGen(), ...ownerOptions]}
                   validate={[required, optionSelected]} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-retirement-form__row">
          {/* <!--Account Name--> */}
          <div className="lc-column lc-column--left columns medium-6">
            <Field name="assetDescription"
                   component={InputGroup}
                   label={_cms('field.account-name.label')}
                   placeholder={_cms('field.account-name.placeholder')}
                   validate={[required]} />
          </div>
          {/* <!--Owner-->*/}
          <div className="lc-column columns medium-6">
            <Field name="assetValue"
                   component={InputGroup}
                   label={_cms('field.vested-account-balance.label')}
                   mask={fieldMasks.currency}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row lc-retirement-form__row">
          {/* <!--Individual Contribution--> */}
          <div className="lc-column lc-column--left columns medium-6">
            <Field name="individualContribution"
                   component={InputGroup}
                   label={_cms('field.individual-contribution.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   mask={fieldMasks.currency}
                   validate={[required]} />
          </div>
          {/* <!--Individual Contribution Frequency-->*/}
          <div className="lc-column columns medium-6">
            {
              fieldTypes[individualContributionFrequency] ? (
                <Field name={individualContributionFrequency}
                       component={InputGroup}
                       onCancelCB={() =>
                         dispatch(changeFormFieldType(individualContributionFrequency))}
                       label={_cms('field.individual-contribution-frequency.label')}
                       validate={[required]} />
              )
              :
              (<Field name={individualContributionFrequency}
                      component={SelectGroup}
                      hasOther
                      onChange={::this._handleChange}
                      label={_cms('field.individual-contribution-frequency.label')}
                      placeholder={cms['pleaseMakeSelection.placeholder']}
                      options={[defaultEmptyValueOptionGen(), ...yearlyMonthlyOptions]}
                      validate={[required, optionSelected]} />)
            }
          </div>
        </div>
        {/* <!--ROW 4--> */}
        <div className="lc-row row lc-retirement-form__row">
          {/* <!--Employer Contribution--> */}
          <div className="lc-column lc-column--left columns medium-6">
            <Field name="employerContribution"
                   component={InputGroup}
                   label={_cms('field.employer-contribution.label')}
                   mask={fieldMasks.currency}
                   placeholder={cms['dollarSign.placeholder']} />
          </div>
          {/* <!--Employer Contribution Frequency-->*/}
          <div className="lc-column columns medium-6">
            {
              fieldTypes[employerContributionFrequency] ? (
                <Field name={employerContributionFrequency}
                       component={InputGroup}
                       onCancelCB={() =>
                         dispatch(changeFormFieldType(employerContributionFrequency))}
                       label={_cms('field.employer-contribution-frequency.label')}
                       validate={[required]} />
              )
              :
              (<Field name={employerContributionFrequency}
                     component={SelectGroup}
                     hasOther
                     onChange={::this._handleChange}
                     label={_cms('field.employer-contribution-frequency.label')}
                     placeholder={cms['pleaseMakeSelection.placeholder']}
                     options={[defaultEmptyValueOptionGen(), ...yearlyMonthlyOptions]}
                     validate={[optionSelected]} />)
            }
          </div>
        </div>
        {/* <!--ROW 5--> */}
        <div className="lc-row row lc-retirement-form__row">
          {/* <!--Additional Employer Contribution--> */}
          <div className="lc-column lc-column--left columns medium-6">
            <Field name="additionalEmployerContribution"
                   component={InputGroup}
                   mask={fieldMasks.currency}
                   label={_cms('field.additional-employer-contribution.label')}
                   placeholder={cms['dollarSign.placeholder']} />
          </div>
          {/* <!--Employer Contribution Frequency-->*/}
          <div className="lc-column columns medium-6">
            {
              fieldTypes[additionalEmployerContributionFrequency] ? (
                <Field name={additionalEmployerContributionFrequency}
                        component={InputGroup}
                        onCancelCB={() =>
                          dispatch(changeFormFieldType(additionalEmployerContributionFrequency))}
                        label={_cms('field.additional-employer-contribution-frequency.label')}
                        validate={[required]} />
              )
              :
              (<Field name={additionalEmployerContributionFrequency}
                     component={SelectGroup}
                     hasOther
                     onChange={::this._handleChange}
                     label={_cms('field.additional-employer-contribution-frequency.label')}
                     placeholder={cms['pleaseMakeSelection.placeholder']}
                     options={[defaultEmptyValueOptionGen(), ...yearlyMonthlyOptions]}
                     validate={[optionSelected]} />)
            }
          </div>
          <div className="additional-employer-contribution-text text-left">
            <span>
              {_cms('field.additional-employer-contribution.note')}
            </span>
          </div>
        </div>
        {/* <!--ROW 6--> */}
        <div className="lc-row row lc-retirement-form__row--short">
          {/* <!--Primary Beneficiary--> */}
          <div className="lc-column lc-column--left columns medium-6">

            {
              fieldTypes[primaryBeneficiaryField] ? (
                <Field name={primaryBeneficiaryField}
                       component={InputGroup}
                       onCancelCB={() => dispatch(changeFormFieldType(primaryBeneficiaryField))}
                       label={_cms('field.primary-beneficiary.label')}
                       validate={[required]} />
              )
              :
              (
                <Field name={primaryBeneficiaryField}
                     component={SelectGroup}
                     hasOther
                     onChange={::this._handleChange}
                     label={_cms('field.primary-beneficiary.label')}
                     placeholder={cms['pleaseMakeSelection.placeholder']}
                     options={[defaultEmptyValueOptionGen(), ...ownerOptions]}
                     validate={[optionSelected]} />
              )
            }
          </div>
          {/* <!--Secondary Beneficiary-->*/}
          <div className="lc-column columns medium-6">
            {
              fieldTypes[secondaryBeneficiaryField] ? (
                <Field name={secondaryBeneficiaryField}
                       component={InputGroup}
                       onCancelCB={() => dispatch(changeFormFieldType(secondaryBeneficiaryField))}
                       label={_cms('field.secondary-beneficiary.label')}
                       validate={[required]} />
              )
              :
              (
                <Field name={secondaryBeneficiaryField}
                       component={SelectGroup}
                       hasOther
                       label={_cms('field.secondary-beneficiary.label')}
                       placeholder={cms['pleaseMakeSelection.placeholder']}
                       onChange={::this._handleChange}
                       options={[defaultEmptyValueOptionGen(), ...ownerOptions]}
                       validate={[optionSelected]} />
                )
            }
          </div>
        </div>
        {/* <!--ROW 7-->*/}
        <div className="lc-row row lc-retirement-form__row--short">
          <div className="lc-column columns small-offset-3 small-6">
            <div className="lc-retirement-form__distribution--header">
              {_cms('distribution-header')}
            </div>
            <RadioGroup name="distributionType"
              fields={distributionOptions}
              validate={[required]}
              optionalClassname="lc-retirement-form__distribution-group" />
          </div>
        </div>
        {
          distributionType === LUMP_SUM && (
            <div className="lc-row row lc-retirement-form__row--short">
              <div className="lc-column lc-column--left columns small-6">
                <Field name={'lumpSumValue'}
                      component={InputGroup}
                      type={inputTypes.text}
                      mask={fieldMasks.currency}
                      label={_cms('field.lump-sum-value.label')}
                      placeholder={cms['dollarSign.placeholder']}
                      validate={[required]} />
              </div>
              <div className="lc-column columns small-6">
                <Field name={'lumpSumDate'}
                      component={InputGroup}
                      type={inputTypes.text}
                      mask={fieldMasks.dateTwoDigitYear}
                      label={_cms('field.lump-sum-date.label')}
                      placeholder={cms['ddmmyy.placeholder']}
                      validate={[required]} />
              </div>
            </div>
          )
        }
        {
          distributionType === DISTRIBUTIONS && (
            <div>
              <div className="lc-row row lc-retirement-form__row--short">
                <div className="lc-column lc-column--left columns small-6">
                  <Field name={'monthlyDistributionValue'}
                        component={InputGroup}
                        type={inputTypes.text}
                        mask={fieldMasks.currency}
                        label={_cms('field.monthly-distribution-value.label')}
                        placeholder={cms['dollarSign.placeholder']}
                        validate={[required]} />
                </div>
                <div className="lc-column columns small-6">
                  <Field name={'distributionDay'}
                        component={InputGroup}
                        type={inputTypes.text}
                        mask={fieldMasks.dayOfMonth}
                        placeholder={cms['doubleZero.placeholder']}
                        label={_cms('field.monthly-distribution-day.label')}
                        validate={[required]} />
                </div>
              </div>
              <div className="lc-row row lc-retirement-form__row">
                <div className="lc-column lc-column--left columns small-6">
                  <Field name={'distributionStartDate'}
                        type={inputTypes.text}
                        component={InputGroup}
                        mask={fieldMasks.dateTwoDigitYear}
                        label={_cms('field.distribution-start-date.label')}
                        placeholder={cms['ddmmyy.placeholder']}
                        validate={[required]} />
                </div>
                <div className="lc-column columns small-6">
                  <Field name={'distributionEndDate'}
                        component={InputGroup}
                        type={inputTypes.text}
                        mask={fieldMasks.dateTwoDigitYear}
                        label={_cms('field.distribution-end-date.label')}
                        placeholder={cms['ddmmyy.placeholder']}
                        validate={[required]} />
                </div>
              </div>
            </div>
          )
        }
        {/* <!--Comments--> */}
        <div className="lc-row row lc-retirement-form__row">
          <div className="lc-column columns medium-12">
            <Field {...commentValidation}
                   name="comments"
                   type={inputTypes.text}
                   label={_cms('field.comments.label')}
                   component={TextArea} />
          </div>
        </div>
        {/* File Upload */}
        <div className="lc-row row lc-retirement-form__row">
          <div className="lc-column columns small-6">
            { filename && (
              <div className="lc-retirment-form__uploaded-file">
                {filename.split('_')[1]}
              </div>
            )}
          </div>
          <div className="lc-column columns small-6">
            <ReactS3Uploader
                signingUrl="s3/sign"
                className="lc-file-uploader"
                id="file"
                signingUrlMethod="GET"
                onError={::this._onUploadError}
                onFinish={::this._onUploadFinish}
                contentDisposition="auto"
                server={apiUrl} />
            <label htmlFor="file"
                   className="lc-button">
              {cms['file-upload']}
            </label>
          </div>
        </div>
        {/* <!--Buttons -->*/}
        <div className="lc-fin-plan__buttons">
          <GenericButton className="lc-button lc-button--left lc-button--white"
                         text={cms['button.previous']}
                         onClick={() => { onCancel(); this.props.reset(); }} />
          <GenericButton className="lc-button lc-button--right lc-button--blue"
                         type="submit"
                         text={id ?
                           cms['button.update'] : cms['finPlanAssets.retirement-submit-button']}
                         isDisabled={invalid || submitting} />
        </div>
      </Form>
    );
  }
}

const decoratedForm = reduxForm({
  form: reduxForms.retirementForm,
  enableReinitialize: true
})(RetirementForm);


const selector = formValueSelector(reduxForms.retirementForm);

const connectedForm = connect(
  (state) => {
    // can select values individually
    const makingAdditions = selector(state, 'makingAdditions');
    const additionFrequency = selector(state, 'additionFrequency');
    const distributionType = selector(state, 'distributionType');
    const employerContribution = selector(state, 'employerContribution');
    // or together as a group
    return {
      currentFormValues: {
        makingAdditions,
        additionFrequency,
        distributionType,
      },
      apiUrl: state.globalReducer.apiUrl,
      fieldTypes: state.finPlanAssets.fieldTypes,
      hasEmployerContribution: !!employerContribution,
      currentFileName: state.finPlanAssets.currentFileName,
    };
  }
)(decoratedForm);

export default connectedForm;
