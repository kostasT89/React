// Global Deps
import React, { PropTypes, Component } from 'react';
import { Form, Field, reduxForm, reset } from 'redux-form';
// Local Deps
import cms from '../../../../app/config/messages';
import ModalType from '../../../../app/config/modalType';
import { lookupMessage } from '../../../utils/cmsUtils';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';
import fieldMasks from '../../../constants/enums/fieldMasks';
import LoadingWave from '../../LoadingWave/LoadingWave';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import reduxForms from '../../../config/reduxForms';
import { defaultEmptyValueOptionGen, propertyTypes } from '../../../config/formFieldOptions';
import { toggleAddAdditionalAssetModal } from '../../../actions/global/finPlan/finPlanAssets';
import { submitAdditionalAssetForm } from '../../../actions/finPlan/finPlanAssets';
import attrs from '../../../constants/enums/additionalAssetAttributes';
// Styles
import './AddAssetForm.scss';

const keyBase = 'finPlanAssets.additionalAssetForm';

class AddAssetForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    isDataSending: PropTypes.bool.isRequired,
    isRequestSuccess: PropTypes.bool.isRequired,
    initialValues: PropTypes.object,
    modalType: PropTypes.string.required
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  onClickCancel = (dispatch) => {
    dispatch(toggleAddAdditionalAssetModal(false));
  }

  render() {
    const {
      dispatch,
      submitting,
      invalid,
      handleSubmit,
      isDataSending,
      isRequestSuccess,
      modalType,
      initialValues
    } = this.props;
    const { _cms } = AddAssetForm;

    return (
      <Form className="lc-add-additional-asset-form"
            onSubmit={handleSubmit((formValues, formDispatch) =>
              formDispatch(submitAdditionalAssetForm(formValues, modalType, initialValues.id)))} >

        <div className="lc-add-asset-form">
          <div className="lc-row row lc-form__selection-header small-offset-1">
            { _cms(modalType === ModalType.additionalAssetAdd ? 'add-additional-asset-title' : 'update-additional-asset-title') }
          </div>
          {/* ROW 1 */}
          {/* Property */}
          <div className="lc-row row small-offset-1 small-10 lc-form-content">
            <div className="lc-column columns small-5 no-padding-columns">
              <Field name={attrs.assetProperty}
                     component={SelectGroup}
                     label={_cms('select-property')}
                     placeholder={_cms('select-property')}
                     validate={[required, optionSelected]}
                     options={[defaultEmptyValueOptionGen(), ...propertyTypes]}
                     defaultValue={initialValues.property} />
            </div>
            {/* Estimated Value */}
            <div className="lc-column columns small-5 no-padding-columns last-column">
              <Field name={attrs.assetEstimatedValue}
                     component={InputGroup}
                     mask={fieldMasks.currency}
                     label={_cms('input-estimatedValue')}
                     subtext={cms['field.yearlyAmountCovered.subtext']}
                     placeholder={cms['dollarSign.placeholder']}
                     validate={[required]}
                     defaultValue={initialValues.estimatedValue} />
            </div>
          </div>
          <div className="lc-loading-wave-wrapper">
            {
                  isDataSending ?
                    <LoadingWave optionalClassName="lc-additional-asset-form-loading-wave" />
                    :
                    (!isRequestSuccess ? _cms('complete.error') : '')
                }
          </div>
          <div className="lc-row row lc-buttons-group">
            <GenericButton
                className="lc-add-asset-form-buttons small-2"
                text={_cms('button-cancel')}
                onClick={() => this.onClickCancel(dispatch)}
                isDisabled={isDataSending} />
            <GenericButton
                className={`lc-add-asset-form-buttons lc-button--nightsky-blue small-3 ${modalType !== ModalType.additionalAssetAdd ? 'lc-button--hide' : ''}`}
                text={_cms('button-save-and-add')}
                type="submit"
                isDisabled={invalid || submitting || isDataSending} />
            <GenericButton
                className="lc-add-asset-form-buttons lc-button--blue small-2"
                text={modalType === ModalType.additionalAssetAdd ? _cms('button-done') : cms['button.update']}
                type={'submit'}
                onClick={() => { setTimeout(() => this.onClickCancel(dispatch), 100); }}
                isDisabled={invalid || submitting || isDataSending} />
          </div>
        </div>
      </Form>
    );
  }
}

const afterSubmit = (result, dispatch) =>
dispatch(reset(reduxForms.addAssetForm));

export default reduxForm({
  form: reduxForms.addAssetForm,
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true
})(AddAssetForm);
