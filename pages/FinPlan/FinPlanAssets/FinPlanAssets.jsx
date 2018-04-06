// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatMoney } from 'accounting';
// Lodash
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
// Local Deps
import cms from '../../../config/messages';
import Routes from '../../../constants/Routes';
import {
        updateCurrentAsset,
        updateAssetFormType,
        submitFinPlanAssetForm,
      } from '../../../actions/finPlan/finPlanAssets';
import { lookupMessage } from '../../../utils/cmsUtils';
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import { deleteFinPlanAsset } from '../../../actions/global/finPlan/finPlanAssets';
import { columns, columnKeys, tableHeight } from '../../../config/finPlan/finPlanAssets';
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import SimpleTable from '../../../components/SimpleTable/SimpleTable';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import AssetsForm from '../../../components/FinPlanForms/AssetsForm/AssetsForm';
import GenericNavButton from '../../../components/GenericNavButton/GenericNavButton';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialPlanBreadcrumb from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';

// CONSTS
const BANK = 'BANK ACCOUNT';
const keyBase = 'finPlanAssets.assetsForm';

class FinPlanAssets extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    finPlanId: PropTypes.any,
    dispatch: PropTypes.func,
    clientName: PropTypes.string,
    coClientName: PropTypes.string,
    isFetchingFinPlan: PropTypes.bool,
    formIsLoading: PropTypes.any,
    previousStep: PropTypes.object,
    currentStep: PropTypes.object,
    furthestStep: PropTypes.object,
    policies: PropTypes.array,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  static _cms = key => lookupMessage(keyBase, key);

  static _scrollToTopOfAssetsButtons() {
    window.scrollTo(0, 920);
  }

  componentDidMount() {
    this._displayDefaultForm();
  }

  componentWillReceiveProps(/* nextProps */) {
    const {
      dispatch,
      finPlanId,
      currentStep,
      previousStep
    } = this.props;
    // Update breadcrumb
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    const previousPageIsComplete = previousStep && previousStep.isCompleted;
    if (finPlanId && pageHasNeverBeenVisited && previousPageIsComplete) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
      }, finPlanId));
    }
  }

  _displayDefaultForm() {
    this.props.dispatch(updateAssetFormType(BANK));
  }

  _onAssetsFormSubmit(formValues, formDispatch, formProps) {
    const { finPlanId, data: { assetFormType } } = this.props;
    const initialValues = formProps.initialValues || {};
    return formDispatch(
      submitFinPlanAssetForm({
        isNewAsset: !initialValues.id,
        formValues: { ...formValues, formType: assetFormType },
        formType: assetFormType,
        finPlanId,
      })
    );
  }

  _changeFormType(formType) {
    this.props.dispatch(updateAssetFormType(formType));
    FinPlanAssets._scrollToTopOfAssetsButtons();
  }

  _onCellClick(item, rowIndex, columnKey /* , model */) {
    const { id } = item;

    switch (columnKey) {
      case columnKeys.delete:
        return this._onDeleteAsset(id);
      case columnKeys.edit:
        return this._onEditAsset(item);
      default:
        return;
    }
  }

  _onDeleteAsset(assetId) {
    const { dispatch, finPlanId } = this.props;
    dispatch(deleteFinPlanAsset(assetId, finPlanId));
  }

  _onEditAsset(asset) {
    const { dispatch, finPlanId } = this.props;
    this._changeFormType(asset.formType);
    dispatch(updateCurrentAsset(asset, finPlanId));
  }

  render() {
    const {
      dispatch,
      policies,
      finPlanId,
      clientName,
      currentStep,
      furthestStep,
      coClientName,
      formIsLoading,
      isFetchingFinPlan,
      data: {
        assets,
        accounts,
        loanAccounts,
        currentAsset,
        assetFormType,
        creationInProgress
      },
      isFinPlanSubmitted
    } = this.props;

    const { _cms } = FinPlanAssets;

    // Asset Form Config
    const assetsFormProps = {
      clientName,
      coClientName,
      onSubmit: ::this._onAssetsFormSubmit,
      onCancel: ::this._displayDefaultForm,
      accounts,
      loanAccounts,
      showForm: ::this._changeFormType,
      formType: assetFormType,
      finPlanId,
      policies,
      currentAsset,
      creationInProgress
    };
    // Table Config:
    const tableConfig = {
      items: assets.map(asset => ({
        ...asset,
        assetValue: isNumber(asset.assetValue) ?
        formatMoney(asset.assetValue) : asset.assetValue
      })),
      containerHeight: tableHeight,
      columns,
      dispatch,
      onCellClick: ::this._onCellClick,
      allowEmpty: true,
    };

    return (
      <div className="lc-fin-plan-assets lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--PAGE CONTENT--> */}
        <div className="lc-fin-plan-assets_content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          { !isFetchingFinPlan && <FinancialPlanBreadcrumb furthestStep={furthestStep}
            currentStep={currentStep} />
          }
          {/* <!--HEADER -->  */}
          <div className="lc-row row">
            <h1 className="lc-fin-plan-assets__header lc-fin-plan__header">
              {cms['finPlanAssets.header']}
            </h1>
          </div>
          {/* <!--LOADING HEXAGON--> */}
          { formIsLoading ?
            <LoadingHexagon />
            :
            <div>
              {/* <!--ADDITIONAL ASSETS--> */}
              <div className="lc-row row">
                <div className="lc-column small-12">
                  <div className="lc-assets-form__account__addition-assets__subtitle">
                    {_cms('additional-assets-subtitle')}
                  </div>
                </div>
              </div>
              {/* <!--ASSETS TABLE--> */}
              <div className="lc-row row lc-assets-table">
                <div className="lc-column small-12">
                  <SimpleTable {...tableConfig} />
                </div>
              </div>
            </div>
          }
          {/* <!--ASSETS SELECTION--> */}
          {(!formIsLoading) ?
            <AssetsForm {...assetsFormProps} />
            :
            <LoadingHexagon />
          }
          {/* <!--BUTTONS--> */}
          {
            assetFormType === BANK &&
            (
              <div className="lc-fin-plan__buttons">
                <GenericNavButton
                  className="lc-button--left lc-button--white"
                  text={cms['button.previous']}
                  route={Routes.finPlanInsurance} />
                <GenericNavButton
                  className="lc-button--right lc-button--blue"
                  route={Routes.finPlanLiabilities}
                  text={cms['button.next']} />
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const firstName = get(state, 'finPlan.finPlanPersonalDetails.firstName', '');
  const lastName = get(state, 'finPlan.finPlanPersonalDetails.lastName', '');
  const coClient = get(state, 'finPlan.finPlanPersonalDetails.coClient', {});

  let nameInfo = { clientName: `${firstName} ${lastName}` };

  if (!isEmpty(coClient) && coClient.firstName) {
    nameInfo = { ...nameInfo, coClientName: `${coClient.firstName} ${coClient.lastName}` };
  }

  return {
    data: state.finPlanAssets,
    ...nameInfo,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanAssets));
