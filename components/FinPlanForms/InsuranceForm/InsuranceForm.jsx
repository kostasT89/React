// Global Deps
import React, { PropTypes, Component } from 'react';
import {
  Form,
  Field,
  touch,
  reduxForm,
  formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Local Deps
import {
  number,
  required,
  maxLength2,
  optionSelected,
} from '../../../utils/formValidationUtils';

import {
  lifeInsuranceTypes,
  insuranceTypeOptions,
  insuranceProviderOptions,
  defaultEmptyValueOptionGen
} from '../../../config/formFieldOptions';

import cms from '../../../config/messages';
import Routes from '../../../constants/Routes';
import reduxForms from '../../../config/reduxForms';
import { debounceMS } from '../../../config/properties';
import { lookupMessage } from '../../../utils/cmsUtils';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import { changeFormFieldType } from '../../../actions/finPlan/finPlan';
import { shouldChangeFormFieldType } from '../../../utils/finPlan/finPlanUtils';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
// Components
import GenericButton from '../../GenericButton/GenericButton';
import InputGroup from '../../Form/InputGroup/InputGroup';
import TextArea from '../../Form/TextArea/TextArea';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';

import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';

import './InsuranceForm.scss';
// CONST
const comments = 'comments';
const keyBase = 'finPlanInsurance';
const insuredField = 'insured';
const providerField = 'provider';
const insuranceTypeField = 'insuranceType';
const currentInsurancePolicyId = 'currentInsurancePolicy.id';
const initialInsuranceTypeValue = `initialValues.${insuranceTypeField}`;

const INSURANCE = 'INSURANCE';

const touchReduxFormFields = dispatch =>
  setTimeout(() => {
    dispatch(touch(reduxForms.insuranceForm, comments));
    dispatch(touch(reduxForms.insuranceForm, insuredField));
    dispatch(touch(reduxForms.insuranceForm, providerField));
    dispatch(touch(reduxForms.insuranceForm, insuranceTypeField));
  }, debounceMS);

class InsuranceForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    currentFormValues: PropTypes.any,
    reset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    invalid: PropTypes.any,
    submitting: PropTypes.any,
    showForm: PropTypes.any,
    formType: PropTypes.string,
    clientName: PropTypes.string,
    coClientName: PropTypes.string,
    handleSubmit: PropTypes.func,
    fieldTypes: PropTypes.any,
    nextButtonDisabled: PropTypes.bool.isRequired,
    currentInsurancePolicy: PropTypes.object, // eslint-disable-line
  }

  static _generateLifeInsuranceFields(insuranceFormProps) {
    const { _cms } = InsuranceForm;
    const { clientOptions } = insuranceFormProps;

    return (
      <div className="lc-insurance-form__life-insurance">
        <div className="lc-row row lc-insurance-form__row">
          {/* <!--Life Insurance Ammount--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={'lifeInsuranceAmount'}
                   component={InputGroup}
                   label={_cms('field.life-insurance-amount.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   mask={fieldMasks.currency}
                   validate={[required]} />
          </div>
          {/* <!--Cash Value-->*/}
          <div className="lc-column columns small-6">
            <Field name={'cashValue'}
                   component={InputGroup}
                   label={_cms('field.cash-value.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   mask={fieldMasks.currency} />
          </div>
        </div>
        <div className="lc-row row lc-insurance-form__row">
          {/* <!--Primary Benificiary--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={'primaryBenificiary'}
                   component={SelectGroup}
                   label={_cms('field.primary-benificiary.label')}
                   placeholder={_cms('field.primary-benificiary.placeholder')}
                   options={[
                     defaultEmptyValueOptionGen(_cms('field.primary-benificiary.placeholder')),
                     ...clientOptions
                   ]} />
          </div>
          {/* <!--Secondary Benificiary-->*/}
          <div className="lc-column columns small-6">
            <Field name={'secondaryBenificiary'}
                   component={SelectGroup}
                   label={_cms('field.secondary-benificiary.label')}
                   placeholder={_cms('field.secondary-benificiary.placeholder')}
                   options={[
                     defaultEmptyValueOptionGen(_cms('field.secondary-benificiary.placeholder')),
                     ...clientOptions
                   ]} />
          </div>
        </div>
      </div>
    );
  }

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, currentInsurancePolicyId);
    const currentId = get(this.props, currentInsurancePolicyId);
    if (nextId && nextId !== currentId) {
      touchReduxFormFields(this.props.dispatch);
      if (shouldChangeFormFieldType(get(nextProps, initialInsuranceTypeValue),
          insuranceTypeOptions)) {
        this._dispatchChangeFormFieldTypeActions();
      }
    }
  }

  _dispatchChangeFormFieldTypeActions() {
    this.props.dispatch(changeFormFieldType(insuranceTypeField));
  }

  _handleChange(event, newValue) {
    const { target: { name } } = event;
    if (newValue === OTHER_PLEASE_TYPE) {
      this.props.dispatch(changeFormFieldType(name));
      event.preventDefault();
    }
  }

  _generateForm() {
    const {
      dispatch,
      fieldTypes,
      clientName,
      coClientName,
      currentFormValues: { insuranceType },
    } = this.props;

    const { _cms, _generateLifeInsuranceFields } = InsuranceForm;

    let clientNames = { clientName };
    if (coClientName) { clientNames = { ...clientNames, coClientName }; }

    const clientOptions = createSameKeyValueOptionsFromEnums(clientNames);
    const isLifeInsurance = lifeInsuranceTypes.includes(insuranceType);

    return (
      <div className="lc-insurance-form lc-insurance-form--padding">
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-insurance-form__row">
          {/* <!--Provider--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={providerField}
                   component={SelectGroup}
                   label={_cms('field.insurance-provider.label')}
                   placeholder={_cms('field.insurance-provider.placeholder')}
                   options={[
                     defaultEmptyValueOptionGen(_cms('field.insurance-provider.placeholder')),
                     ...insuranceProviderOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Type-->*/}
          <div className="lc-column columns small-6">
            {/* <!--Other Please Type--> */}
            {
              fieldTypes[insuranceTypeField] && (
              <Field name={insuranceTypeField}
                     component={InputGroup}
                     onCancelCB={() => dispatch(changeFormFieldType(insuranceTypeField))}
                     label={_cms('field.insurance-type.label')}
                     validate={[required]} />
              )
            }
            {
              !fieldTypes[insuranceTypeField] && (
                <Field hasOther
                       name={insuranceTypeField}
                       component={SelectGroup}
                       label={_cms('field.insurance-type.label')}
                       placeholder={_cms('field.insurance-type.placeholder')}
                       options={[
                         defaultEmptyValueOptionGen(_cms('field.insurance-type.placeholder')),
                         ...insuranceTypeOptions
                       ]}
                       onChange={::this._handleChange}
                       validate={[required, optionSelected]} />
              )
            }
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-insurance-form__row">
          {/* <!--Company--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={'insuranceCompany'}
                   component={InputGroup}
                   label={_cms('field.insurance-company.label')}
                   placeholder={_cms('field.insurance-company.placeholder')}
                   validate={[required]} />
          </div>
          {/* <!--Insured Person-->*/}
          <div className="lc-column columns small-6">
            <Field name={insuredField}
                   component={SelectGroup}
                   label={_cms('field.insured-person.label')}
                   placeholder={_cms('field.insured-person.placeholder')}
                   options={[defaultEmptyValueOptionGen(_cms('field.insured-person.placeholder')),
                     ...clientOptions]}
                   validate={[required, optionSelected]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row lc-insurance-form__row">
          {/* <!--Monthly Premium--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={'monthlyPremium'}
                   component={InputGroup}
                   label={_cms('field.monthly-insurance-premium.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   mask={fieldMasks.currency}
                   validate={[required]} />
          </div>
          {/* <!--Day of Month-->*/}
          <div className="lc-column columns small-6">
            <Field name={'dayOfMonth'}
                   component={InputGroup}
                   mask={fieldMasks.dayOfMonth}
                   label={_cms('field.monthly-insurance-due.label')}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required, number, maxLength2]}
                   hideGuide />
          </div>
        </div>
        {/* <!--Lif Insuracnce Fields --> */}
        {isLifeInsurance && _generateLifeInsuranceFields({ clientOptions })}
        {/* <!--ROW 4--> */}
        <div className="lc-row row lc-insurance-form__row__comments">
          {/* <!--Comments--> */}
          <div className="lc-column lc-column--left columns small-12">
            <Field name={'comments'}
                   component={TextArea}
                   label={_cms('field.comments.label')}
                   placeholder={_cms('field.comments.placeholder')} />
          </div>
        </div>
      </div>
    );
  }

  _onSubmit(formValues, formDispatch, formProps) {
    const { reset, onSubmit } = this.props;
    reset();
    return onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      reset,
      onCancel,
      invalid,
      submitting,
      showForm,
      formType,
      handleSubmit,
      nextButtonDisabled
    } = this.props;

    const { _cms } = InsuranceForm;

    const selectedFormType = 'lc-insurance-button__selected';

    return (
      <Form className="lc-insurance-form"
            onSubmit={handleSubmit(::this._onSubmit)}>
        {/* ROW 1 */}
        <div className="lc-row row lc-form__selection-buttons">
          <div className="lc-column columns small-offset-4 small-4">
            <GenericButton
              className={cx('lc-insurance-button', { [selectedFormType]: formType === INSURANCE })}
              text={_cms('button1')}
              onClick={() => (showForm(INSURANCE))}
            />
          </div>
        </div>
        {/* Insurance FORM */}
        {formType && this._generateForm(formType) }
        {/* FORM CONTROLS */}
        {formType ?
          <div className="lc-row row lc-column--buttons__form">
            <div className="lc-column columns small-4">
              <GenericButton className="lc-button--white"
                             text={cms['button.previous']}
                             onClick={() => { onCancel(); reset(); }} />
            </div>
            <div className="lc-column columns small-4 ">
              <GenericButton className="lc-button--blue-secondary"
                             text={cms['button.saveAdd']}
                             type="submit"
                             isDisabled={invalid || submitting} />
            </div>
            <div className="lc-column columns small-4 ">
              <GenericButton className="lc-button--blue lc-button--blue--primary"
                               text={cms['button.next']}
                               type="submit"
                               onClick={() => { setTimeout(() => onCancel(), 100); }}
                               isDisabled={invalid || submitting} />
            </div>
          </div>
        :
          <div className="lc-row row lc-column--buttons">
            <GenericButton className="lc-button--white"
                            text={cms['button.previous']}
                            onClick={() => { onCancel(); reset(); }} />
            <GenericNavButton className="lc-button--blue"
                              route={Routes.finPlanAssets}
                              text={cms['button.finished']}
                              isDisabled={nextButtonDisabled} />
          </div>
        }
      </Form>
    );
  }
}

const decoratedForm = reduxForm({
  form: reduxForms.insuranceForm,
  enableReinitialize: true
})(InsuranceForm);

const selector = formValueSelector(reduxForms.insuranceForm);

const connectedForm = connect(
  (state) => {
    const insuranceType = selector(state, 'insuranceType');

    const firstName = get(state, 'finPlan.finPlanPersonalDetails.firstName', '');
    const lastName = get(state, 'finPlan.finPlanPersonalDetails.lastName', '');
    const coClient = get(state, 'finPlan.finPlanPersonalDetails.coClient', {});

    const { finPlanInsurance: { fieldTypes, currentInsurancePolicy } } = state;

    let nameInfo = { clientName: `${firstName} ${lastName}` };

    if (!isEmpty(coClient) && coClient.firstName) {
      nameInfo = { ...nameInfo, coClientName: `${coClient.firstName} ${coClient.lastName}` };
    }

    return {
      ...nameInfo,
      fieldTypes,
      initialValues: currentInsurancePolicy,
      currentFormValues: { insuranceType }
    };
  }
)(decoratedForm);

export default connectedForm;
