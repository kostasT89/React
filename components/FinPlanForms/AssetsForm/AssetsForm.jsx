// Global Deps
import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import cx from 'classnames';
// Local Deps
import cms from '../../../config/messages';
import { lookupMessage } from '../../../utils/cmsUtils';
// Components
import AnnuityForm from '../AnnuityForm/AnnuityForm';
import PropertyForm from '../PropertyForm/PropertyForm';
import BusinessForm from '../BusinessForm/BusinessForm';
import GenericButton from '../../GenericButton/GenericButton';
import RetirementForm from '../RetirementForm/RetirementForm';
import BankAccountsForm from '../BankAccountsForm/BankAccountsForm';
// Styles
import './AssetsForm.scss';

const keyBase = 'finPlanAssets.assetsForm';

const BANK = 'BANK ACCOUNT';
const ANNUITY = 'ANNUITY';
const BUSINESS = 'BUSINESS';
const PROPERTY = 'PROPERTY';
const RETIREMENT = 'RETIREMENT';

class AssetsForm extends Component {

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  _generateForm(type) {
    const {
      props: {
        accounts,
        loanAccounts,
        onSubmit,
        onCancel,
        dispatch,
        finPlanId,
        clientName,
        coClientName,
        currentAsset,
        creationInProgress
      },
    } = this;

    const clientNames = coClientName ? { clientName, coClientName } : { clientName };

    let form;
    switch (type) {
      case RETIREMENT:
      form = (<RetirementForm onSubmit={onSubmit}
                              onCancel={onCancel}
                              clientNames={clientNames}
                              initialValues={currentAsset} />);
        break;
      case PROPERTY:
        form = (<PropertyForm onSubmit={onSubmit}
                              onCancel={onCancel}
                              loanAccounts={loanAccounts}
                              clientNames={clientNames}
                              initialValues={currentAsset} />);
        break;
      case ANNUITY:
        form = (<AnnuityForm onCancel={onCancel}
                             onSubmit={onSubmit}
                             accounts={accounts}
                             clientNames={clientNames}
                             initialValues={currentAsset} />);
        break;
      case BUSINESS:
        form = (<BusinessForm onCancel={onCancel}
                              onSubmit={onSubmit}
                              clientNames={clientNames}
                              initialValues={currentAsset} />);
        break;
      case BANK:
        form = (<BankAccountsForm accounts={accounts}
                                  dispatch={dispatch}
                                  finPlanId={finPlanId}
                                  creationInProgress={creationInProgress} />);
        break;
      default:
        form = <div className="lc-assets-form__empty" />;
        break;
    }

    return <div className="lc-row row"> {form} </div>;
  }

  render() {
    const {
      invalid,
      onCancel,
      showForm,
      formType,
      submitting,
    } = this.props;

    const { _cms } = AssetsForm;

    const selectedFormType = 'lc-asset-button__selected';
    return (
      <div className="lc-assets-form">
        <div className="lc-row row lc-form__selection-header">
          {_cms('selection-header')}
        </div>
        {/* ROW 1 */}
        <div className="lc-row row lc-form__selection-buttons">
          <div className="lc-column columns small-12 no-padding-columns">
            <GenericButton
              className={cx('lc-asset-button', { [selectedFormType]: formType === BANK })}
              text={_cms('bank-button')}
              onClick={() => showForm(BANK)} />
            <GenericButton
              className={cx('lc-asset-button', { [selectedFormType]: formType === ANNUITY })}
              text={_cms('annuity-button')}
              onClick={() => showForm(ANNUITY)} />
            <GenericButton
              className={cx('lc-asset-button', { [selectedFormType]: formType === PROPERTY })}
              text={_cms('property-button')}
              onClick={() => showForm(PROPERTY)} />
            <GenericButton
              className={cx('lc-asset-button', { [selectedFormType]: formType === BUSINESS })}
              text={_cms('business-button')}
              onClick={() => showForm(BUSINESS)} />
            <GenericButton
              className={cx('lc-asset-button', { [selectedFormType]: formType === RETIREMENT })}
              text={_cms('retirement-button')}
              onClick={() => showForm(RETIREMENT)}
              name={RETIREMENT} />
          </div>
        </div>
        {/* ASSETS FORM */}
        {formType && this._generateForm(formType) }
        {/* FORM CONTROLS */}
        {!formType && (
          <div className="lc-row row lc-column--buttons">
            <div className="lc-column columns small-4">
              <GenericButton
                className="lc-button--left lc-button--white"
                text={cms['button.previous']}
                onClick={onCancel}
              />
            </div>
            <div className="lc-column columns small-6 small-offset-2 ">
              <GenericButton
                className="lc-button--right lc-button--blue"
                text={cms['button.next']}
                isDisabled={invalid || submitting} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

AssetsForm.propTypes = {
  clientName: PropTypes.string,
  coClientName: PropTypes.string,
  accounts: PropTypes.array,
  loanAccounts: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
  finPlanId: PropTypes.any,
  showForm: PropTypes.func,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formType: PropTypes.string,
  currentAsset: PropTypes.object,
  creationInProgress: PropTypes.bool.isRequired,
};

export default reduxForm({ form: 'assetsForm' })(AssetsForm);
