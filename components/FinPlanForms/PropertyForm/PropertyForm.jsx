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
import get from 'lodash/get';
// Local Deps
import { required, optionSelected } from '../../../utils/formValidationUtils';
import {
  yesNoOptions,
  propertyTypes,
  yearlyMonthlyOptions,
  housingPropertyTypes,
  defaultEmptyValueOptionGen,
} from '../../../config/formFieldOptions';
import cms from '../../../config/messages';
import reduxForms from '../../../config/reduxForms';
import { changeFormFieldType } from '../../../actions/finPlan/finPlan';
import { debounceMS, retirementTerm } from '../../../config/properties';
import { lookupMessage } from '../../../utils/cmsUtils';
import fieldMasks from '../../../constants/enums/fieldMasks';
import inputTypes from '../../../constants/enums/inputTypes';
import yodleeAccountTypes from '../../../constants/enums/yodleeAccountTypes';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import GenericButton from '../../GenericButton/GenericButton';
// Styles
import './PropertyForm.scss';
// CONST
const initialId = 'initialValues.id';
const propertyComments = 'propertyComments';
const keyBase = 'finPlanAssets.propertyForm';
const initialProperty = 'initialValues.property';

const YES = 'yes';

// These filds are not correctly rendering and we need to touch them mantually
const touchFields = (dispatch, initialValues) =>
  setTimeout(() => initialValues[propertyComments] &&
    dispatch(touch(reduxForms.propertyForm, propertyComments)), debounceMS);

class PropertyForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    loanAccounts: PropTypes.any,
    policies: PropTypes.any,
    onSubmit: PropTypes.func,
    fieldTypes: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    clientNames: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    currentFormValues: PropTypes.any,
  };

  static defaultProps = { initialValues: { retirementTerm } };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

 constructor(props) {
   super(props);
   this.state = { showAdditionalFields: false };
 }

  componentDidMount() {
    // i.e. if the page was initialized by clicking the edit button
    if (get(this.props, initialId)) {
      touchFields(this.props.dispatch, this.props.initialValues);
      if (housingPropertyTypes.includes(get(this.props, initialProperty))) {
        this.setState({ showAdditionalFields: true }); // eslint-disable-line
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    // i.e. if they have clicked the edit button while already on the annuity form
    if (nextId && nextId !== currentId) {
      touchFields(this.props.dispatch, nextProps.initialValues);
      if (housingPropertyTypes.includes(get(nextProps, initialProperty))) {
        this.setState({ showAdditionalFields: true });
      }
    }
  }

  _onSubmit(formValues, formDispatch, formProps) {
    const { onSubmit, reset } = this.props;
    reset();
    this.setState({ showAdditionalFields: false });
    onSubmit(formValues, formDispatch, formProps);
  }

  _handlePropertyTypeChange(event, newValue) {
    this.setState({
      showAdditionalFields: housingPropertyTypes.includes(newValue)
    });
    this._handleChange(event, newValue);
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
      loanAccounts,
      onCancel,
      policies,
      submitting,
      fieldTypes,
      dispatch,
      clientNames,
      handleSubmit,
      currentFormValues: {
        hasLien,
        hasInsurance,
      }
    } = this.props;

    const { showAdditionalFields } = this.state;

    const { _cms } = PropertyForm;
    const loans = [].concat(loanAccounts);
    const ownerOptions = createSameKeyValueOptionsFromEnums(clientNames);
    const loanOptions = [];
    const loanAccountTypes = [
      yodleeAccountTypes.installmentLoan,
      yodleeAccountTypes.mortgage,
      yodleeAccountTypes.mortgageLoan,
      yodleeAccountTypes.autoLoan,
      yodleeAccountTypes.personalLoan,
      yodleeAccountTypes.heloc];

    loans.forEach((loan) => {
      if (loanAccountTypes.includes(loan.accountType)) {
        loanOptions.push({
          text: `${loan.providerName} -  ${loan.accountName}`,
          value: loan.id.toString(),
        });
      }
    });

    const insuranceOptions = policies.map(policy => ({
      text: policy.insuranceType,
      value: policy.insuranceType,
    }));

    const property = 'property';

    return (
      <Form className="lc--property-form" onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-property-form__row">
          {/* <!--Owner--> */}
          <div className="lc-column columns small-6">
            <Field name="propertyOwner"
                   component={SelectGroup}
                   label={_cms('field.property-owner.label')}
                   placeholder={_cms('field.property-owner.placeholder')}
                   options={[defaultEmptyValueOptionGen(_cms('field.property-owner.placeholder')),
                     ...ownerOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Property-->*/}
          <div className="lc-column columns small-6">
            {
             fieldTypes[property] ? (
               <Field name={property}
                      component={InputGroup}
                      onCancelCB={() =>
                        dispatch(changeFormFieldType(''))}
                      label={_cms('field.property-property.label')}
                      validate={[required]} />
             )
             :
             (<Field name={property}
                     component={SelectGroup}
                     hasOther
                     onChange={::this._handlePropertyTypeChange}
                     label={_cms('field.property-property.label')}
                     placeholder={cms['pleaseMakeSelection.placeholder']}
                     options={[defaultEmptyValueOptionGen(_cms('field.annuity-property.placeholder')),
                      ...propertyTypes]}
                     validate={[required, optionSelected]} />)
            }
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-property-form__row">
          {/* <!--Description--> */}
          <div className="lc-column columns small-6">
            <Field name={'assetDescription'}
                   component={InputGroup}
                   label={_cms('field.property-description.label')}
                   placeholder={_cms('field.property-description.placeholder')}
                   validate={[required]} />
          </div>
          {/* <!--Property Value-->*/}
          <div className="lc-column columns small-6">
            <Field name={'assetValue'}
                   component={InputGroup}
                   label={_cms('field.property-value.label')}
                   mask={fieldMasks.currency}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        {showAdditionalFields &&
          <div className="lc-row row lc-property-form__row lc-row-tall">
            {/* <!--Frequency of Dues--> */}
            <div className="lc-column columns small-6">
              <RadioGroup name="frequencyOfDues"
                          fields={yearlyMonthlyOptions}
                          label={_cms('field.property-dues-frequency.label')}
                          optionalClassname="fin-plan-radio-group" />
            </div>
            {/* <!--Property Value-->*/}
            <div className="lc-column columns small-6">
              <Field name={'homeAssociationDuesValue'}
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     label={_cms('field.property-dues-value.label')}
                     placeholder={cms['dollarSign.placeholder']} />
            </div>
          </div>
        }
        {/* <!--ROW 4--> */}
        {showAdditionalFields &&
          <div className="lc-row row lc-property-form__row">
            {/* <!--Taxes--> */}
            <div className="lc-column columns small-6">
              <Field name={'realEstateTaxes'}
                      component={InputGroup}
                      mask={fieldMasks.currency}
                      label={_cms('field.property-real-estate-taxes.label')}
                      placeholder={cms['dollarSign.placeholder']}
                      validate={[required]} />
            </div>
            {/* <!--Property Value-->*/}
            <div className="lc-column columns small-6">
              <Field name={'realEstateTaxesFrequency'}
                     component={SelectGroup}
                     label={_cms('field.property-real-estate-taxes-frequency.label')}
                     options={[defaultEmptyValueOptionGen(_cms('field.property-real-estate-taxes-frequency.placeholder')),
                      ...yearlyMonthlyOptions]}
                     validate={[required, optionSelected]} />
            </div>
          </div>
        }
        {/* <!--ROW 5--> */}
        <div className="lc-row row lc-property-form__row lc-row-tall">
          {/* <!--Lien-> */}
          <div className="lc-column columns small-6">
            <RadioGroup name="propertyLien"
                        fields={yesNoOptions}
                        label={_cms('field.property-lien.label')}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
          {/* <!--Property Value-->*/}
          <div className="lc-column columns small-6">
            {
              hasLien === YES && (
                <Field name={'lienAccount'}
                       component={SelectGroup}
                       label={_cms('field.property-lien-account.label')}
                       options={[defaultEmptyValueOptionGen(_cms('field.property-lien-account.placeholder')),
                         ...loanOptions]}
                       validate={[required, optionSelected]} />
              )
            }
          </div>
        </div>
        {/* <!--ROW 6--> */}
        <div className="lc-row row lc-property-form__row lc-row-tall">
          {/* <!--Lien-> */}
          <div className="lc-column columns small-6">
            <RadioGroup name="propertyInsured"
                        fields={yesNoOptions}
                        label={_cms('field.property-insured.label')}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
          {/* <!--Property Value-->*/}
          <div className="lc-column columns small-6">
            {
              hasInsurance === YES && (
                <Field name={'insurancePolicy'}
                       component={SelectGroup}
                       label={_cms('field.insurance-policy.label')}
                       options={[defaultEmptyValueOptionGen(_cms('field.property-lien-account.placeholder')),
                        ...insuranceOptions]}
                       validate={[required, optionSelected]} />
              )
            }
          </div>
        </div>
        <div className="lc-row row lc-property-form__row">
          {/* <!--Comments--> */}
          <div className="lc-column columns small-12">
            <Field name={propertyComments}
                   component={TextArea}
                   label={_cms('field.property-comments.label')}
                   inputType={inputTypes.textArea}
                   placeholder={_cms('field.property-comments.placeholder')} />
          </div>
        </div>
        {/* <!--Buttons -->*/}
        <div className="lc-row row lc-column--buttons">
          <div className="lc-column columns small-10 small-centered">
            <div className="lc-column columns small-3">
              <GenericButton className="lc-button lc-button--white"
                             text={cms['button.previous']}
                             onClick={() => { onCancel(); this.props.reset(); }} />
            </div>
            <div className="lc-column columns small-5 ">
              <GenericButton className="lc-button lc-button--blue-secondary"
                             text={cms['button.saveAdd']}
                             type="submit"
                             isDisabled={invalid || submitting} />
            </div>
            <div className="lc-column columns small-4 ">
              <GenericButton className="lc-button lc-button--blue"
                             text={cms['button.save']}
                             type="submit"
                             onClick={() => { setTimeout(() => onCancel(), 100); }}
                             isDisabled={invalid || submitting} />
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const decoratedForm = reduxForm({
  form: reduxForms.propertyForm,
  enableReinitialize: true
})(PropertyForm);

const selector = formValueSelector(reduxForms.propertyForm);
const connectedForm = connect(
  (state) => {
    const hasInsurance = selector(state, 'propertyInsured');
    const hasLien = selector(state, 'propertyLien');
    return {
      currentFormValues: {
        hasInsurance,
        hasLien,
      },
      initialValues: {
        ...state.finPlanAssets.currentAsset,
      },
      fieldTypes: state.finPlanAssets.fieldTypes,
      policies: state.finPlanInsurance.policies,
    };
  }
)(decoratedForm);

export default connectedForm;
