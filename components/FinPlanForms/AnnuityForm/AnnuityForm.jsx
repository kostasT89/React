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
// Lodash
import get from 'lodash/get';
// Local Deps
import {
        yesNoOptions,
        distributionOptions,
        yearlyMonthlyOptions,
        defaultEmptyValueOptionGen,
      } from '../../../config/formFieldOptions';
import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupMessage } from '../../../utils/cmsUtils';
import { debounceMS, retirementTerm } from '../../../config/properties';
import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import { annuityOptions } from '../../../constants/enums/finPlanAnnuityTypes';
import { changeFormFieldType } from '../../../actions/finPlan/finPlan';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { shouldChangeFormFieldType } from '../../../utils/finPlan/finPlanUtils';
import { createSameKeyValueOptionsFromEnums } from '../../../utils/formConfigUtils';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import RadioGroup from '../../Form/RadioGroup/RadioGroup';
import GenericButton from '../../GenericButton/GenericButton';
// Styles
import './AnnuityForm.scss';
// Constants
const comments = 'comments';
const annuityType = 'annuityType';
const annuityOwner = 'annuityOwner';
const initialId = 'initialValues.id';
const initialAnnuityType = `initialValues.${annuityType}`;
const YES = 'yes';
const YEARLY = 'yearly';
const MONTHLY = 'monthly';
const LUMP_SUM = 'lumpSum';
const DISTRIBUTIONS = 'distributions';
const keyBase = `finPlanAssets.${reduxForms.annuityForm}`;

// These filds are not correctly rendering and we need to touch them mantually
const touchFields = (dispatch, initialValues) =>
  setTimeout(() => {
    /* eslint-disable */
    initialValues[comments] && dispatch(touch(reduxForms.annuityForm, comments));
    initialValues[annuityType] && dispatch(touch(reduxForms.annuityForm, annuityType));
    initialValues[annuityOwner] && dispatch(touch(reduxForms.annuityForm, annuityOwner));
    /* eslint-enable */
  }, debounceMS);

class AnnuityForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func,
    invalid: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    fieldTypes: PropTypes.object.isRequired,
    clientNames: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    currentFormValues: PropTypes.object,
  };

  static defaultProps = { initialValues: { retirementTerm } };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  componentDidMount() {
    // i.e. if the page was initialized by clicking the edit button
    if (get(this.props, initialId)) {
      touchFields(this.props.dispatch, this.props.initialValues);
      if (shouldChangeFormFieldType(get(this.props, initialAnnuityType), yearlyMonthlyOptions)) {
        this._dispatchChangeFormFieldTypeActions();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    // i.e. if they have clicked the edit button while already on the annuity form
    if (nextId && nextId !== currentId) {
      touchFields(this.props.dispatch, nextProps.initialValues);
      if (shouldChangeFormFieldType(get(nextProps, initialAnnuityType), yearlyMonthlyOptions)) {
        this._dispatchChangeFormFieldTypeActions();
      }
    }
  }

  _dispatchChangeFormFieldTypeActions() {
    this.props.dispatch(changeFormFieldType(annuityType));
  }

  _handleChange(event, newValue) {
    const { target: { name } } = event;
    if (newValue === OTHER_PLEASE_TYPE) {
      event.preventDefault();
      this.props.dispatch(changeFormFieldType(name));
    }
  }

  _onSubmit(formValues, formDispatch, formProps) {
    const { onSubmit, reset } = this.props;
    reset();
    onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      invalid,
      onCancel,
      dispatch,
      submitting,
      fieldTypes,
      clientNames,
      handleSubmit,
      currentFormValues: {
        makingAdditions,
        distributionType,
        additionFrequency,
      }
    } = this.props;

    const { _cms } = AnnuityForm;

    return (
      <Form className="lc-annuity-form" onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-annuity-form__row">
          {/* <!--Owner--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={annuityOwner}
                    component={SelectGroup}
                    label={_cms('field.annuity-owner.label')}
                    placeholder={_cms('field.annuity-owner.placeholder')}
                    options={[defaultEmptyValueOptionGen(_cms('field.annuity-owner.placeholder')),
                      ...createSameKeyValueOptionsFromEnums(clientNames)]}
                    validate={[required, optionSelected]} />
          </div>
          {/* <!--Description-->*/}
          <div className="lc-column columns small-6">
            <Field name={'assetDescription'}
                   component={InputGroup}
                   type={inputTypes.textArea}
                   label={_cms('field.annuity-description.label')}
                   placeholder={_cms('field.annuity-description.placeholder')}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-annuity-form__row">
          {/* <!---Annuity Type-> */}
          <div className="lc-column lc-column--left columns small-6">
            {
              fieldTypes[annuityType] ? (
                <Field name={annuityType}
                       component={InputGroup}
                       onCancelCB={() => dispatch(changeFormFieldType(annuityType))}
                       label={_cms('field.annuity-type.label')} />
              )
              :
              (<Field hasOther
                      name={annuityType}
                      component={SelectGroup}
                      onChange={::this._handleChange}
                      label={_cms('field.annuity-type.label')}
                      placeholder={_cms('field.annuity-description.placeholder')}
                      options={[defaultEmptyValueOptionGen(_cms('field.annuity-type.placeholder')),
                        ...annuityOptions]}
                      validate={[optionSelected]} />)
            }
          </div>
          {/* <!--Annuity Value-->*/}
          <div className="lc-column columns small-6">
            <Field name={'assetValue'}
                   component={InputGroup}
                   mask={fieldMasks.currency}
                   label={_cms('field.annuity-value.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row lc-annuity-form__row--short">
          {/* <!--Additions--> */}
          <div className="lc-column lc-column--left columns small-6">
            <RadioGroup name="makingAdditions"
                        fields={yesNoOptions}
                        label={_cms('field.annuity-additions.label')}
                        validate={[required]}
                        optionalClassname="fin-plan-radio-group" />
          </div>
          {makingAdditions === YES && (
            <div className="lc-column columns small-6">
              <RadioGroup name="additionFrequency"
                          fields={yearlyMonthlyOptions}
                          label={_cms('field.annuity-addition-frequency.label')}
                          validate={[required]}
                          optionalClassname="fin-plan-radio-group" />
            </div>
          )}
        </div>
        {/* <!--ROW 4--> */}
        {makingAdditions === YES && additionFrequency &&
          <div className="lc-row row lc-annuity-form__row--short">
            {(makingAdditions === YES && additionFrequency === YEARLY) &&
                (
                  <div>
                    <div className="lc-column lc-column--left columns small-6">
                      <Field name={'yearlyAnnuityValue'}
                             component={InputGroup}
                             type={inputTypes.text}
                             label={_cms('field.yearly-annuity-value.label')}
                             mask={fieldMasks.currency}
                             placeholder={cms['dollarSign.placeholder']}
                             validate={[required]} />
                    </div>
                    <div className="lc-column columns small-6">
                      <Field name={'yearlyAnnuityDueDate'}
                             component={InputGroup}
                             type={inputTypes.text}
                             label={_cms('field.yearly-annuity-due-date.label')}
                             mask={fieldMasks.yearDate}
                             placeholder={cms['year.placeholder']}
                             validate={[required]} />
                    </div>
                  </div>
                )
            }
            {(makingAdditions === YES && additionFrequency === MONTHLY) &&
              (
                <div>
                  <div className="lc-column lc-column--left columns small-6">
                    <Field name={'monthlyAnnuityValue'}
                           component={InputGroup}
                           type={inputTypes.text}
                           label={_cms('field.monthly-annuity-value.label')}
                           mask={fieldMasks.currency}
                           placeholder={cms['dollarSign.placeholder']}
                           validate={[required]} />
                  </div>
                  <div className="lc-column columns small-6">
                    <Field name={'monthlyDueDate'}
                           component={InputGroup}
                           type={inputTypes.text}
                           label={_cms('field.monthly-annuity-due-date.label')}
                           placeholder={cms['doubleZero.placeholder']}
                           mask={fieldMasks.age}
                           validate={[required]} />
                  </div>
                </div>
              )
            }
          </div>
        }
        {/* <!--ROW 5-->*/}
        {(makingAdditions === YES && additionFrequency) && (
          <div className="lc-row row lc-annuity-form__row--short">
            <div className="lc-column lc-column--left columns small-6">
              <Field name={'additionEndDate'}
                     component={InputGroup}
                     type={inputTypes.text}
                     mask={fieldMasks.dateFourDigitYear}
                     label={_cms('field.addition-end-date.label')}
                     placeholder={cms['ddmmyy.placeholder']}
                     validate={[required]} />
            </div>
          </div>
        )
        }
        {/* <!--ROW 6-->*/}
        <div className="lc-row row lc-annuity-form__row--medium">
          <div className="lc-column columns small-offset-3 small-6">
            <div className="lc-annuity-form__distribution--header">
              {_cms('distribution-header')}
            </div>
            <RadioGroup name="distributionType"
                        fields={distributionOptions}
                        validate={[required]}
                        optionalClassname="lc-annuity-form__distribution-group" />
          </div>
        </div>
        {
          distributionType === LUMP_SUM && (
            <div className="lc-row row lc-annuity-form__row--bottom">
              <div className="lc-column lc-column--left columns small-6">
                <Field name={'lumpSumValue'}
                       component={InputGroup}
                       type={inputTypes.text}
                       mask={fieldMasks.currency}
                       label={_cms('field.annuity-lump-sum-value.label')}
                       placeholder={cms['dollarSign.placeholder']}
                       validate={[required]} />
              </div>
              <div className="lc-column columns small-6">
                <Field name={'lumpSumDate'}
                       component={InputGroup}
                       mask={fieldMasks.dateTwoDigitYear}
                       type={inputTypes.text}
                       label={_cms('field.annuity-lump-sum-date.label')}
                       placeholder={cms['ddmmyy.placeholder']}
                       validate={[required]} />
              </div>
            </div>
          )
        }
        {
          distributionType === DISTRIBUTIONS && (
            <div>
              <div className="lc-row row lc-annuity-form__row--bottom">
                <div className="lc-column lc-column--left columns small-6">
                  <Field name={'monthlyDistributionValue'}
                         component={InputGroup}
                         type={inputTypes.text}
                         mask={fieldMasks.currency}
                         label={_cms('field.monthly-annuity-distribution-value.label')}
                         placeholder={cms['dollarSign.placeholder']}
                         validate={[required]} />
                </div>
                <div className="lc-column columns small-6">
                  <Field name={'distributionDay'}
                         component={InputGroup}
                         type={inputTypes.text}
                         mask={fieldMasks.dayOfMonth}
                         placeholder={cms['doubleZero.placeholder']}
                         label={_cms('field.monthly-annuity-distribution-day.label')}
                         validate={[required]} />
                </div>
              </div>
              <div className="lc-row row lc-annuity-form__row--bottom">
                <div className="lc-column lc-column--left columns small-6">
                  <Field name={'distributionStartDate'}
                         type={inputTypes.text}
                         component={InputGroup}
                         mask={fieldMasks.dateTwoDigitYear}
                         label={_cms('field.annuity-distribution-start-date.label')}
                         placeholder={cms['ddmmyy.placeholder']}
                         validate={[required]} />
                </div>
                <div className="lc-column columns small-6">
                  <Field name={'distributionEndDate'}
                         component={InputGroup} type={inputTypes.text}
                         mask={fieldMasks.dateTwoDigitYear}
                         placeholder={cms['ddmmyy.placeholder']}
                         label={_cms('field.annuity-distribution-end-date.label')}
                         validate={[required]} />
                </div>
              </div>
            </div>
          )
        }
        {/* <!--ROW 7-->*/}

        <div className="lc-row row lc-annuity-form__row--comment">
          <div className="lc-column lc-column--left columns small-12">
            <Field name={comments}
                   props={{ className: 'lc-annuity-form__comment' }}
                   component={TextArea}
                   type={inputTypes.text}
                   label={_cms('field.comment.label')}
                   placeholder={_cms('field.comment.placeholder')} />
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

// Decorate with reduxForm()
const decoratedForm = reduxForm({
  form: reduxForms.annuityForm,
  enableReinitialize: true
})(AnnuityForm);

// Decorate with connect to read form values
const selector = formValueSelector(reduxForms.annuityForm);
const connectedForm = connect(
  (state) => {
    // can select values individually
    const makingAdditions = selector(state, 'makingAdditions');
    const additionFrequency = selector(state, 'additionFrequency');
    const distributionType = selector(state, 'distributionType');
    // or together as a group
    return {
      currentFormValues: {
        makingAdditions,
        additionFrequency,
        distributionType,
      },
      fieldTypes: state.finPlanAssets.fieldTypes
    };
  }
)(decoratedForm);

export default connectedForm;
