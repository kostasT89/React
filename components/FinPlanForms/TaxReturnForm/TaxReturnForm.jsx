// Global Deps
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field, touch, reduxForm } from 'redux-form';
import get from 'lodash/get';
import cx from 'classnames';

// Local Deps
import finPlanDefaultTaxFields from '../../../constants/enums/finPlanTaxForm';
import cms from '../../../config/messages';
import fieldMasks from '../../../constants/enums/fieldMasks';
import finPlanAssetTypes from '../../../constants/enums/finPlanAssetTypes';

import { lookupMessage } from '../../../utils/cmsUtils';
import inputTypes from '../../../constants/enums/inputTypes';
import {
  optionSelected,
  required
} from '../../../utils/formValidationUtils';
import {
        filingStatusTypeOptions,
        propertyTypes
      } from '../../../config/formFieldOptions';
import reduxForms from '../../../config/reduxForms';
import taxReturnAttrs from '../../../config/taxReturnAttributes';

// Components
import SelectGroup from '../../../components/Form/SelectGroup/SelectGroup';
import InputGroup from '../../../components/Form/InputGroup/InputGroup';
import GenericButton from '../../GenericButton/GenericButton';
import ReactTooltipWithIcon from '../../ReactTooltipWithIcon/ReactTooltipWithIcon';

import {
  updateMajorEvent,
  deleteMajorEvent
} from '../../../actions/finPlan/finPlanQuestions';
import { getFinPlan } from '../../../actions/finPlan/finPlan';
import {
        toggleTaxReturnFormRequest,
        updateFinPlanPaymentSuccess
      } from '../../../actions/finPlan/finPlanTaxReturn';

import './TaxReturnForm.scss'; // eslint-disable-line import/newline-after-import
const keyBase = 'finPlanIncome.taxReturnForm';

class TaxReturnForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    reset: PropTypes.func,
    dispatch: PropTypes.func,
    finPlanCoClient: PropTypes.object,
    finPlanSaveSuccess: PropTypes.bool,
    isTaxReturnFormActive: PropTypes.bool,
    finPlanAssets: PropTypes.array,
    finPlanIncome: PropTypes.array,
    finPlanId: PropTypes.any,
    isFinPlanSubmitted: PropTypes.bool
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _generateClientFields() {
    const { _cms } = TaxReturnForm;
    const clientFields = [];
    finPlanDefaultTaxFields.forEach((fieldName, index) => {
      clientFields.push((
        <div key={`${fieldName}_${index}`} className="lc-column columns small-12 lc-tax-return-form__dynamic-row">
          <div className="lc-column columns small-4 lc-tax-return-form__field-label">
            <div className="lc-tax-return-form__dynamic-row-icon-container">
              <ReactTooltipWithIcon icon={'info-circle'}
                optionalClass="lc-tax-return-form__dynamic-row-icon"
                message={_cms(`${fieldName}.icon`)}
                id={index} />
            </div>
            {_cms(`field.${fieldName}.label`)}
          </div>
          <div className="lc-column columns small-4 lc-tax-return-form__field-content">
            <Field name={`${fieldName}_${index}`}
              component={InputGroup}
              mask={fieldMasks.currency}
              type={inputTypes.text}
              placeholder={_cms('field.interestIncome.placeholder')}
              validate={[required]} />
          </div>
        </div>
      ));
    });

    return (
      <div>
        <div className="lc-column column small-12">
          {clientFields}
        </div>
      </div>
    );
  }

  static _generateFieldsBasedOnFinPlan(incomes, assets, coClient) {
    const { _cms } = TaxReturnForm;
    const finPlanDynamicRows = [];
    incomes.forEach((income, index) => {
      const hasCoClientField =
        coClient &&
        income.data.employedIndividual.includes(coClient.firstName) &&
        income.data.employedIndividual.includes(coClient.lastName);
      const fieldName = income.data.otherIncomeType || income.data.type;
      finPlanDynamicRows.push((
        <div key={`${fieldName}_${index}`} className="lc-column columns small-12 lc-tax-return-form__dynamic-row">
          <div className="lc-column columns small-4 lc-tax-return-form__field-label">
            <div className="lc-tax-return-form__dynamic-row-icon-container">
              <ReactTooltipWithIcon icon={'info-circle'}
                optionalClass="lc-tax-return-form__dynamic-row-icon"
                message={_cms(`${fieldName}.icon`)}
                id={index} />
            </div>
            {_cms(`field.${fieldName}.label`)}
          </div>
          <div className="lc-column columns small-4 lc-tax-return-form__field-content">
            <Field name={`${fieldName}_${index}`}
              component={InputGroup}
              mask={fieldMasks.currency}
              type={inputTypes.text}
              placeholder={_cms('field.interestIncome.placeholder')}
              validate={[required]} />
          </div>
          { hasCoClientField &&
            <div className="lc-column columns small-4 lc-tax-return-form__field-content">
              <Field name={`${fieldName}-coCLient`}
                component={InputGroup}
                mask={fieldMasks.currency}
                type={inputTypes.text}
                validate={[required]} />
            </div>
          }
        </div>
      ));
    });

    return (
      <div>
        <div className="lc-column columns small-12">
          {finPlanDynamicRows}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(touch(reduxForms.taxReturnForm, taxReturnAttrs.filingStatus));
    dispatch(touch(reduxForms.taxReturnForm, taxReturnAttrs.investmentRealEstateAssociatedLoan));
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      finPlanAssets,
      finPlanIncome,
      finPlanId
    } = nextProps;
    const nextId = get(nextProps, 'initialValues.id');
    const currentId = get(this.props, 'initialValues.id');
    if (currentId && nextId && (nextId !== currentId)) {
      nextProps.reset();
    }
    if (finPlanAssets.length === 0 && finPlanIncome.length === 0) {
      dispatch(getFinPlan(finPlanId));
    }
  }

  // values, dispatch, and props supplied by redux-form:
  _onSubmit = (formValues, formDispatch, formProps) => {
    const { reset, onSubmit, dispatch } = this.props;
    const finPlanId = get(formProps, 'finPlanIncome[0].finPlanId')
      || get(formProps, 'finPlanAssets[0].finPlanId');
    const updatedFormValues = {
      ...formValues,
      finPlanId
    };
    dispatch(updateFinPlanPaymentSuccess());
    reset();
    return onSubmit(updatedFormValues, formDispatch, formProps);
  }

  _updateItem(data, type) {
    const {
      dispatch,
    } = this.props;
    // eslint-disable-next-line no-param-reassign
    data.type = type;
    dispatch(updateMajorEvent(data));
  }

  _deleteItem(id, type) {
    const { dispatch } = this.props;
    dispatch(deleteMajorEvent({
      id,
      type,
    }));
  }

  _toggleTaxReturnForm(isTaxReturnFormActive) {
    const { dispatch } = this.props;
    const updatedIsTaxReturnFormActive = !isTaxReturnFormActive;
    dispatch(toggleTaxReturnFormRequest(updatedIsTaxReturnFormActive));
  }

  render() {
    const {
      handleSubmit,
      finPlanIncome,
      finPlanAssets,
      isTaxReturnFormActive,
      finPlanSaveSuccess,
      finPlanCoClient,
      isFinPlanSubmitted
    } = this.props;

    const {
      _cms,
      _generateClientFields,
      _generateFieldsBasedOnFinPlan
    } = TaxReturnForm;

    return (
      <Form className="lc-tax-return-form"
            onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        { !isFinPlanSubmitted &&
          <div>
            <div className="lc-row row">
              <br />
              <div className="lc-column columns small-12">
                <p className="lc-tax-return-form__blurb">{_cms('blurb1')}</p>
                <br />
                <p className="lc-tax-return-form__blurb">{_cms('blurb2')}</p>
                <br />
                <p className="lc-tax-return-form__blurb">{_cms('blurb3')}</p>
              </div>
            </div>
            <div className="lc-row row">
              <div className="lc-tax-return-form__show-form-button-container">
                <GenericButton name={taxReturnAttrs.addTaxReturnInfo}
                  className={cx('lc-tax-return-form__button--input-style',
                      { 'lc-tax-return-form-button': isTaxReturnFormActive })}
                  text={cms['finPlanIncome.finPlanInfoForm.taxReturnInfo']}
                  onClick={() => this._toggleTaxReturnForm(isTaxReturnFormActive)}
                />
              </div>
              <div className="lc-column columns small-12">
                <div className={cx({
                  'lc-tax-return-form__save-error-message': !finPlanSaveSuccess,
                  'lc-tax-return-form__save-success-message': finPlanSaveSuccess })}>
                  { finPlanSaveSuccess && cms['settings.saved'] }
                </div>
              </div>
            </div>
          </div>
        }
        { (isTaxReturnFormActive || isFinPlanSubmitted) &&
          <div className={isFinPlanSubmitted ? 'lc-tax-info-fields-container' : ''}>
            <div className="lc-column columns small-12 lc-tax-return-form__pre-dynamic-field-container">
              <div className="lc-column column small-12">
                <div className="lc-column columns small-12 lc-tax-return-form__dynamic-row">
                  <div className="lc-column columns small-4 lc-tax-return-form__section-label">
                    {_cms('field.filingStatus.label')}
                  </div>
                  <div className="lc-column columns small-8 lc-tax-return-form__section-field-container">
                    <Field name={taxReturnAttrs.filingStatus}
                      className="lc-column columns small-6 lc-tax-return-form__section-field"
                      component={SelectGroup}
                      options={[...filingStatusTypeOptions]}
                      validate={[optionSelected]} />
                  </div>
                </div>
              </div>
            </div>
            <div className="lc-column columns small-12 lc-tax-return-form__pre-dynamic-field-container">
              <div className="lc-column column small-12">
                <div className="lc-column columns small-12 lc-tax-return-form__dynamic-row">
                  <div className="lc-column columns small-4 lc-tax-return-form__section-label">
                    {_cms('field.interestIncome.label')}
                  </div>
                  <div className="lc-tax-return-form__section-field-container small-8">
                    <div className="lc-column columns small-6">
                      <div className="lc-column columns small-6">
                        <div className="lc-tax-return-form__icon-field-container">
                          <Field name={taxReturnAttrs.taxableInterest}
                            className="lc-tax-return-form__section-field"
                            component={InputGroup}
                            mask={fieldMasks.currency}
                            type={inputTypes.text}
                            label={_cms('field.taxableInterest.label')}
                            placeholder={_cms('field.taxableInterest.placeholder')}
                            validate={[required]}
                            toolTipConfig={{
                              icon: 'info-circle',
                              message: _cms(`field.${taxReturnAttrs.taxableInterest}.icon`),
                              id: 1
                            }} />
                        </div>
                      </div>
                      <div className="lc-column columns small-6">
                        <div className="lc-tax-return-form__icon-field-container">
                          <Field name={taxReturnAttrs.taxExemptInterest}
                            component={InputGroup}
                            mask={fieldMasks.currency}
                            type={inputTypes.text}
                            label={_cms('field.taxExemptInterest.label')}
                            placeholder={_cms('field.taxExemptInterest.placeholder')}
                            validate={[required]}
                            toolTipConfig={{
                              icon: 'info-circle',
                              message: _cms(`field.${taxReturnAttrs.taxExemptInterest}.icon`),
                              id: 1
                            }} />
                        </div>
                      </div>
                    </div>
                    <div className="lc-column columns small-6">
                      <div className="lc-column columns small-6">
                        <div className="lc-tax-return-form__icon-field-container">
                          <Field name={taxReturnAttrs.ordinaryDividends}
                            component={InputGroup}
                            mask={fieldMasks.currency}
                            type={inputTypes.text}
                            label={_cms('field.ordinaryDividends.label')}
                            placeholder={_cms('field.ordinaryDividends.placeholder')}
                            validate={[required]}
                            toolTipConfig={{
                              icon: 'info-circle',
                              message: _cms(`field.${taxReturnAttrs.ordinaryDividends}.icon`),
                              id: 1
                            }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Dynamic fields--> */}
            <div className="">
              <div className="lc-column columns small-12 lc-dynamic-fields-container">
                {_generateClientFields()}
              </div>
            </div>
            <div className="">
              <div className="lc-column columns small-12 lc-dynamic-fields-container">
                {_generateFieldsBasedOnFinPlan(
                  finPlanIncome,
                  finPlanAssets,
                  finPlanCoClient)
                }
              </div>
            </div>
            {/* Loop through assets and show based on type */}
            <div className="lc-column column small-12">
              { finPlanAssets.map((asset) => {
                  if (asset.data.formType === finPlanAssetTypes.annuity) {
                    return (
                      <div key={asset.id} className="lc-column column small-12">
                        <div className="lc-tax-return-form__bottom-section-label">
                          {_cms('soleProprietor.label')}
                        </div>
                        <div className="lc-column column small-12 lc-tax-return-form-fileds-container">
                          <div className="lc-column columns small-2">
                            <Field name={taxReturnAttrs.soleProprietorBusinessName}
                              component={InputGroup}
                              type={inputTypes.text}
                              label={_cms('field.businessName.label')}
                              placeholder={_cms('field.businessName.placeholder')}
                              validate={[required]} />
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.soleProprietorIncomeLoss}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.incomeLoss.label')}
                                placeholder={_cms('field.incomeLoss.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.soleProprietorIncomeLoss}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.soleProprietorDepreciationAmortization}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('business.field.depreciationAmortization.label')}
                                placeholder={_cms('field.depreciationAmortization.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.soleProprietorInterestExpense}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.soleProprietorInterestExpense}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.interestExpense.label')}
                                placeholder={_cms('field.interestExpense.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.soleProprietorInterestExpense}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowAssociatedLoan}
                                component={SelectGroup}
                                options={[...propertyTypes]}
                                label={_cms('field.associatedLoan.label')}
                                placeholder={_cms('field.associatedLoan.placeholder')}
                                validate={[optionSelected]} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  else if (asset.data.formType === finPlanAssetTypes.property) {
                    return (
                      <div key={asset.id} className="lc-column column small-12">
                        <div className="lc-tax-return-form__bottom-section-label">
                          {_cms('investmentRealEstate.label')}
                        </div>
                        <div className="lc-column column small-12 lc-tax-return-form-fileds-container">
                          <div className="lc-column columns small-2">
                            <Field name={taxReturnAttrs.investmentRealEstatePropertyDescription}
                              component={InputGroup}
                              type={inputTypes.text}
                              label={_cms('field.propertyDescription.label')}
                              placeholder={_cms('field.propertyDescription.placeholder')}
                              validate={[required]} />
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.investmentRealEstateIncomeLoss}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.incomeLoss.label')}
                                placeholder={_cms('field.incomeLoss.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.investmentRealEstateIncomeLoss}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.investmentRealEstateDepreciationAmortization} // eslint-disable-line
                              component={InputGroup}
                              mask={fieldMasks.currency}
                              type={inputTypes.text}
                              label={_cms('business.field.depreciationAmortization.label')}
                              placeholder={_cms('field.depreciationAmortization.placeholder')}
                              validate={[required]}
                              toolTipConfig={{
                                icon: 'info-circle',
                                message: _cms(`${taxReturnAttrs.investmentRealEstateDepreciationAmortization}.icon`),
                                id: asset.id
                              }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-2">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.investmentRealEstateInterestExpense}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.interestExpense.label')}
                                placeholder={_cms('field.interestExpense.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.investmentRealEstateInterestExpense}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.investmentRealEstateAssociatedLoan}
                                component={SelectGroup}
                                options={[...propertyTypes]}
                                label={_cms('field.associatedLoan.label')}
                                placeholder={_cms('field.associatedLoan.placeholder')}
                                validate={[optionSelected]} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  else if (asset.data.formType === finPlanAssetTypes.business) {
                    return (
                      <div key={asset.id} className="lc-column column small-12">
                        <div className="lc-tax-return-form__bottom-section-label">
                          {_cms('businessCashFlow.label')}
                        </div>
                        <div className="lc-column column small-12 lc-tax-return-form-fileds-container">
                          <div className="lc-column columns small-4">
                            <Field name={taxReturnAttrs.businessCashFlowBusinessName}
                              component={InputGroup}
                              type={inputTypes.text}
                              label={_cms('field.businessName.label')}
                              placeholder={_cms('field.businessName.placeholder')}
                              validate={[required]} />
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowIncomeLoss}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.incomeLoss.label')}
                                placeholder={_cms('field.incomeLoss.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.businessCashFlowIncomeLoss}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowDepreciationAmortization}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('business.field.depreciationAmortization.label')}
                                placeholder={_cms('field.depreciationAmortization.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.businessCashFlowDepreciationAmortization}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowInterestExpense}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.interestExpense.label')}
                                placeholder={_cms('field.interestExpense.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.businessCashFlowInterestExpense}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowContributions}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.contributions.label')}
                                placeholder={_cms('field.contributions.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.businessCashFlowContributions}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-3">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowDistributions}
                                component={InputGroup}
                                mask={fieldMasks.currency}
                                type={inputTypes.text}
                                label={_cms('field.distributions.label')}
                                placeholder={_cms('field.distributions.placeholder')}
                                validate={[required]}
                                toolTipConfig={{
                                  icon: 'info-circle',
                                  message: _cms(`${taxReturnAttrs.businessCashFlowDistributions}.icon`),
                                  id: asset.id
                                }} />
                            </div>
                          </div>
                          <div className="lc-column columns small-5">
                            <div className="lc-tax-return-form__icon-field-container">
                              <Field name={taxReturnAttrs.businessCashFlowAssociatedLoan}
                                component={SelectGroup}
                                options={[...propertyTypes]}
                                label={_cms('field.associatedLoan.label')}
                                placeholder={_cms('field.associatedLoan.placeholder')}
                                validate={[optionSelected]} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return <div />;
                })
              }
            </div>
            <div className="lc-column columns small-12">
              <div className={cx({
                'lc-tax-return-form__save-error-message': !finPlanSaveSuccess,
                'lc-tax-return-form__save-success-message': finPlanSaveSuccess })}>
                { finPlanSaveSuccess && cms['settings.saved'] }
              </div>
            </div>
            <div className="lc-tax-return-form__button-container">
              <GenericButton
                className="lc-button--right lc-button--blue"
                text={cms['finPlan.dashboardButton']}
                isDisabled={false}
                type="submit"
                onClick={handleSubmit(::this._onSubmit)} />
            </div>
          </div>
        }
      </Form>
    );
  }
}

// eslint-disable-next-line no-class-assign
const DecoratedForm = reduxForm({
  form: reduxForms.taxReturnForm,
  enableReinitialize: true
})(TaxReturnForm);

// eslint-disable-next-line no-class-assign
const ConnectedForm = connect(
  (state) => {
    const {
      finPlan: {
        finPlanTaxReturns,
        id
      }
    } = state;
    const data =
      finPlanTaxReturns && finPlanTaxReturns.data ? finPlanTaxReturns.data : {};

    const initialValues = {
      ...finPlanTaxReturns,
      ...data,
      finPlanId: id
    };
    return {
      initialValues
    };
  }
)(DecoratedForm);

export default ConnectedForm;
