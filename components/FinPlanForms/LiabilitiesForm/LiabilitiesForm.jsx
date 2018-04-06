// Global Deps
import React, { PropTypes, Component } from 'react';
import { Form, reduxForm } from 'redux-form';
// Local Deps
import {
        createLiability,
        toggleLiabilityAccounts,
      } from '../../../actions/finPlan/finPlanLiabilities';

import cms from '../../../config/messages';
import Routes from '../../../constants/Routes';
import finPlanSchemas from '../../../schemas/finPlanSchemas';
import { lookupFinPlanLiabilities } from '../../../utils/cmsUtils';
import finPlanSchemaTypes from '../../../constants/enums/finPlanSchemaTypes';

import {
        columns,
        tableHeight,
        rowHeight,
        idMapping,
      } from '../../../config/finPlan/finPlanLiabilities';
import { deleteFinPlanLiability } from '../../../actions/global/finPlan/finPlanLiabilities';
// Components
import AccountItem from '../../Form/AccountItem/AccountItem';
import GenericButton from '../../GenericButton/GenericButton';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';
import InlineEditTable from '../../../components/Form/InlineEditTable/InlineEditTable';

import './LiabilitiesForm.scss';

class LiabilitiesForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    accounts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    finPlanId: PropTypes.number.isRequired,
    liabilities: PropTypes.array.isRequired,
    showAccounts: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  };

  static _generateTable({ tableConfig }) {
    return (
      <div className="lc-row row">
        <div className="lc-column small-12">
          <div className={'lc-fin-plan-page__table ' +
            'lc-inline-table-dimensions-parent--width lc-inline-table-dimensions-parent--height'}>
            <InlineEditTable {...tableConfig} />
          </div>
        </div>
      </div>
    );
  }

  _generateAccounts(accounts) {
    return (
      <div className="lc-liabilities-form__account-list">
        <div className="lc-table-body">
          <div className="lc-liabilities-form__account-list__title">
            {lookupFinPlanLiabilities('account-title')}
          </div>
          {/* CONNECT SAVINGS ACCOUNT*/}
          {accounts.map((account, index) => (
            <AccountItem
              accountName={`${account.providerName} ${account.accountName}`}
              accountBalance={account.balance.amount}
              key={index}
              providerId={account.providerId} id={account.id}
              value={account.value}
              fisecalId={account.fisecalId}
              displayImage
              handleToggle={this._handleToggle}
            />))}
        </div>
      </div>
    );
  }

  _generateButtons() {
    return (
      <div>
        <div className="lc-column columns small-6">
          <div className="lc-liabilities-form__add--right">
            <GenericButton
              text={lookupFinPlanLiabilities('add-liability')}
              className="lc-liabilities-form__add__button lc-liabilities-form__add__button--selected"
              onClick={this._toggleExistingLiabilities}
            />
          </div>
        </div>
        <div className="lc-column columns small-6">
          <div className="lc-liabilities-form__add">
            <GenericButton
              text={lookupFinPlanLiabilities('add-button')}
              className="lc-liabilities-form__add__button"
              onClick={this._onAddAccountButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }

  _handleToggle = ({
    value,
    id,
    accountName,
    accountBalance,
    fisecalId,
  }) => {
    const { dispatch, finPlanId } = this.props;
    if (value) {
      dispatch(deleteFinPlanLiability(fisecalId, finPlanId));
    }
    else {
      dispatch(createLiability({
        isNewLiability: true,
        finPlanId,
        formValues: {
          yodleeId: id,
          description: accountName,
          notEditableOveride: true,
          value: accountBalance,
        }
      }));
    }
  }

  _addLiability() {
    const { dispatch, finPlanId } = this.props;
    dispatch(createLiability({
      isNewLiability: true,
      formValues: finPlanSchemas[finPlanSchemaTypes.liability],
      finPlanId,
    }));
  }

  _toggleExistingLiabilities = () => {
    this.props.dispatch(toggleLiabilityAccounts());
  }

  // values, dispatch, and props supplied by redux-form:
  _onSubmit = formValues => (
    this._updateItem(formValues)
  )

  _updateItem = (data) => {
    if (data && typeof data.value === 'string') {
      const { dispatch, finPlanId } = this.props;
      dispatch(createLiability({ formValues: { ...data }, finPlanId }));
    }
  }

  _deleteLiability = (liabilityId) => {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanLiability(liabilityId, finPlanId));
  }

  _onAddAccountButtonClick = () => {
    const { showAccounts } = this.props;
    if (showAccounts) this._toggleExistingLiabilities();
    this._addLiability();
  }

  render() {
    const {
      accounts,
      dispatch,
      liabilities,
      handleSubmit
    } = this.props;

    const { _generateTable } = LiabilitiesForm;
    // Table Config:
    const tableConfig = {
      items: liabilities,
      containerHeight: tableHeight,
      ignoreManualValues: true,
      columns,
      idMapping,
      dispatch,
      updateItem: this._updateItem,
      rowHeight,
      canEdit: true,
      onCellClick: this._deleteLiability,
      allowEmpty: true,
      schemaType: finPlanSchemaTypes.liability
    };

    return (
      <Form
        className="lc-liabilites-form"
        onSubmit={handleSubmit(this._onSubmit)}>
        <div className="lc-row row lc-liabilities-form__row">
          <div className="lc-column small-12">
            {_generateTable({ tableConfig })}
          </div>
        </div>

        {/* ADDITIONAL LIABILITIES TABLE */}
        <div className="lc-row row lc-liabilities-form__table-header">
          <div className="lc-column small-12">
            {lookupFinPlanLiabilities('table-header')}
          </div>
        </div>
        <div className="lc-row row lc-liabilities-form__row">
          {/* <!--BUTTONS--> */}
          {this._generateButtons()}
        </div>
        <div className="lc-row row lc-liabilities-form__row">
          <div className="lc-column small-12">
            {/* <!--ACCOUNTS--> */}
            {this._generateAccounts(accounts)}
          </div>
        </div>
        <div className="lc-fin-plan__buttons">
          <GenericNavButton className="lc-liability-button lc-button--left lc-button--white"
                            text={cms['button.previous']}
                            route={Routes.finPlanAssets} />
          <GenericNavButton className="lc-liability-button lc-button--right lc-button--blue"
                            route={Routes.finPlanTransactions}
                            text={cms['button.next']} />
        </div>
      </Form>
    );
  }
}

export default reduxForm({ form: 'liabilitiesForm', destroyOnUnmount: false })(LiabilitiesForm);
