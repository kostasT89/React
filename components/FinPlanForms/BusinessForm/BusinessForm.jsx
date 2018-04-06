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
import { lookupMessage } from '../../../utils/cmsUtils';
import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { debounceMS, retirementTerm } from '../../../config/properties';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
import { yesNoOptions, defaultEmptyValueOptionGen } from '../../../config/formFieldOptions';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';

// Styles
import './BusinessForm.scss';
// CONST
const YES = 'yes';
const initialId = 'initialValues.id';
const buisnessOwner = 'buisnessOwner';
const businessComments = 'businessComments';
const keyBase = 'finPlanAssets.businessForm';

// These filds are not correctly rendering and we need to touch them mantually
const touchFields = (dispatch, initialValues) =>
  setTimeout(() => {
    /* eslint-disable */
    initialValues[buisnessOwner] && dispatch(touch(reduxForms.businessForm, buisnessOwner));
    initialValues[businessComments] && dispatch(touch(reduxForms.businessForm, businessComments));
    /* eslint-enable */
  }, debounceMS);

const selector = formValueSelector(reduxForms.businessForm);

class BusinessForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = { initialValues: { retirementTerm } };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  componentDidMount() {
    // i.e. if the page was initialized by clicking the edit button
    if (get(this.props, initialId)) {
      touchFields(this.props.dispatch, this.props.initialValues);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    // i.e. if they have clicked the edit button while already on the annuity form
    if (nextId && nextId !== currentId) {
      touchFields(this.props.dispatch, nextProps.initialValues);
    }
  }

  _onSubmit(formValues, formDispatch, formProps) {
    this.props.onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      invalid,
      onCancel,
      policies,
      submitting,
      clientNames,
      handleSubmit,
      currentFormValues: {
        hasInsurance,
        personalGuarantee,
      }
    } = this.props;

    const { _cms } = BusinessForm;

    const ownerOptions = createSameKeyValueOptionsFromEnums(clientNames);

    const insuranceOptions = policies.map(policy => ({
      text: policy.insuranceType,
      value: policy.insuranceType,
    }));

    return (
      <Form className="lc--business-form" onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-buisness-form__row">
          {/* <!--Owner--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={buisnessOwner}
                   component={SelectGroup}
                   label={_cms('field.business-owner.label')}
                   placeholder={_cms('field.business-owner.placeholder')}
                   options={[defaultEmptyValueOptionGen(_cms('field.buisness-owner.placeholder')),
                     ...ownerOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Property-->*/}
          <div className="lc-column columns small-6">
            <Field name={'assetDescription'}
                   component={InputGroup}
                   label={_cms('field.business-description.label')}
                   placeholder={_cms('field.business-description.placeholder')}
                   validate={[required]} />
          </div>
        </div>

        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-business-form__row">
          {/* <!--Value--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={'assetValue'}
                   component={InputGroup}
                   label={_cms('field.business-value.label')}
                   mask={fieldMasks.currency}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
          {/* <!--Year Of Sale-->*/}
          <div className="lc-column columns small-6">
            <Field name="plannedYearOfSale"
                   component={InputGroup}
                   label={_cms('field.business-planned-year-of-sale.label')}
                   mask={fieldMasks.year}
                   placeholder={cms['4year.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row lc-row-tall lc-business-form__row--short">
          {/* <!--Personal--> */}
          <div className="lc-column lc-column--left columns small-6">
            <RadioGroup name="personalGuarantee"
                        fields={yesNoOptions}
                        label={_cms('field.business-personal-guarantee.label')}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
          {/* <!--How Much-->*/}
          <div className="lc-column columns small-6">
            {
              personalGuarantee === YES && (
                <Field name="personalGuaranteeAmount"
                       component={InputGroup}
                       label={_cms('field.business-personal-guarantee-amount.label')}
                       placeholder={cms['dollarSign.placeholder']}
                       mask={fieldMasks.currency}
                       validate={[required]} />
              )
            }
          </div>
        </div>
        {/* <!--ROW 4--> */}
        <div className="lc-row row lc-row-tall lc-business-form__row--short">
          {/* <!--Insurance--> */}
          <div className="lc-column lc-column--left columns small-6">
            <RadioGroup name="businessInsurancePolicy"
                        fields={yesNoOptions}
                        label={_cms('field.business-insurance.label')}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
          <div className="lc-column columns small-6">
            {
              hasInsurance === YES && (
                <Field name={'insurancePolicy'}
                       component={SelectGroup}
                       label={_cms('field.insurance-policy.label')}
                       options={[defaultEmptyValueOptionGen(_cms('field.buisness-owner.placeholder')),
                         ...insuranceOptions]}
                       validate={[required]} />
              )
            }
          </div>

        </div>
        {/* <!--ROW 5--> */}
        <div className="lc-row row lc-business-form__row">
          {/* <!--Comments--> */}
          <div className="lc-column lc-column--left columns small-12">
            <Field name={businessComments}
                   component={TextArea}
                   label={_cms('field.business-comments.label')}
                   inputType={inputTypes.textArea}
                   placeholder={_cms('field.business-comments.placeholder')} />
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
                             text={cms.button}
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

BusinessForm.propTypes = {
  policies: PropTypes.array,
  clientNames: PropTypes.object,
  currentFormValues: PropTypes.object,
};

const BusinessFormReduxForm = reduxForm({
  form: reduxForms.businessForm,
  enableReinitialize: true,
})(BusinessForm);


const BusinessFormReduxFormWithState = connect(
  (state) => {
    const hasInsurance = selector(state, 'businessInsurancePolicy');
    const personalGuarantee = selector(state, 'personalGuarantee');

    return {
      currentFormValues: {
        hasInsurance,
        personalGuarantee,
      },
      initialValues: {
        ...state.finPlanAssets.currentAsset,
      },
      policies: state.finPlanInsurance.policies,
    };
  }
)(BusinessFormReduxForm);

export default BusinessFormReduxFormWithState;
