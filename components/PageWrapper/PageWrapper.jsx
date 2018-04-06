import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Modal } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
// Import Sematic UI Style CSS
import 'semantic-ui-css/semantic.min.css';
// Local Deps
import Routes from '../../constants/Routes';
import { publicPages } from '../../config/properties';
// Components
import SideNav from '../SideNav/SideNav';
import LoggedInHeader from '../LoggedInHeader/LoggedInHeader';
import CoBrowsingHeader from '../CoBrowsingHeader/CoBrowsingHeader';
import AddAssetForm from '../../components/FinPlanForms/AddAssetForm/AddAssetForm';
// Utils
import userAbleToViewRoute from '../../utils/permissionUtils';
import { checkIfSideNavIsDisabled } from '../../utils/sideNavUtils';
import { checkForIncompleteConnectStates } from '../../utils/connectUtils';
// Actions
import { getGoals } from '../../actions/global/goals';
import { getUserData } from '../../actions/global/users';
import { getFinPlan } from '../../actions/finPlan/finPlan';
import { readyToLoadPage } from '../../actions/pageWrapper';
import { toggleAddAdditionalAssetModal, getAdditionalAssets } from '../../actions/global/finPlan/finPlanAssets';
import {
        importAccounts,
        getEnabledAccounts
      } from '../../actions/global/accounts';
import {
        getAppData,
        checkForCoBrowsingToken,
        checkUserAbilityToViewPage
      } from '../../actions/global/app';

class PageWrapper extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isAssetModalOpen: PropTypes.bool.isRequired,
    formIsLoading: PropTypes.bool.isRequired,
    isRequestSuccess: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedAdditionalAsset: PropTypes.object,
    disabledFinPlan: PropTypes.bool
  }

  componentDidMount() {
    // For instance, they refreshed the page while logged in
    const {
      data: {
        userData,
        appDataIsDirty,
        appDataHasBeenFetched,
        enabledAccounts,
      },
      location,
      dispatch
    } = this.props;
    // Pre load the fin plan data for the user
    dispatch(getFinPlan());
    // Get Fisecal Goals for Snapshot
    dispatch(getGoals());
    // Import new accounts
    dispatch(importAccounts());
    if (location.pathname !== Routes.home) {
      // Get User Data if Missing:
      if (isEmpty(userData.displayName)) {
        dispatch(getUserData());
      }
      // Get App Data if Missing
      if (!appDataHasBeenFetched || appDataIsDirty) {
        dispatch(getAppData());
      }
      dispatch(checkForCoBrowsingToken());
    }
    // If the connect flow is incomplete for any accounts, forward to the correct page
    if (this.props.data.hasFetchedEnabledAccounts) {
      checkForIncompleteConnectStates(enabledAccounts, location.pathname);
    }
    // When changing pages, we check a few things:
    browserHistory.listenBefore((nextRoute) => {
      // Check viewing permissions
      const isAbleToViewRoute = userAbleToViewRoute(publicPages, nextRoute.pathname);
      if (!isAbleToViewRoute) {
        dispatch(checkUserAbilityToViewPage(nextRoute.pathname));
      }
      /*
      * This will just kick them back to the homepage if they try and access something
      * They are not supposed to see -- any actual auth/role stuff is handeled by our API
      */
      if (this.props.data.hasFetchedEnabledAccounts) {
        dispatch(readyToLoadPage());
        checkForIncompleteConnectStates(
          this.props.data.enabledAccounts,
          nextRoute.pathname
        );
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { location, dispatch } = nextProps;
    const { data } = this.props;

    // Get Enabled accounts:
    if (nextProps.data.hasAttemptedAccountImport !== data.hasAttemptedAccountImport) {
      dispatch(getEnabledAccounts());
      dispatch(getAdditionalAssets());
    }
    /*
    * NOTE -- We have a history listener that handles all page transitions *after*
    * the initial page load is complete.  For the initial load we repeat
    * the logic below:
    */
    if (nextProps.data.hasFetchedEnabledAccounts !== data.hasFetchedEnabledAccounts) {
      dispatch(readyToLoadPage());
      checkForIncompleteConnectStates(
        nextProps.data.enabledAccounts,
        location.pathname
      );
    }
  }

  // This function will change the state of modal flag and close the modal
  // true : Open Modal
  // false : Close Modal
  onModalClose = (dispatch) => {
    dispatch(toggleAddAdditionalAssetModal(false));
  }

  render() {
    const {
      children,
      location: { pathname },
      data: { shouldDisplayCoBrowsingHeader, enabledAccounts },
      isAssetModalOpen,
      formIsLoading,
      isRequestSuccess,
      modalType,
      selectedAdditionalAsset,
      disabledFinPlan
    } = this.props;
    const isSideNavDisabled = checkIfSideNavIsDisabled(pathname, enabledAccounts);

    const assetFormConfig = {
      isDataSending: formIsLoading,
      isRequestSuccess,
      modalType,
      initialValues: selectedAdditionalAsset
    };

    return (
      <div className="lc-page-wrapper">

        {/* <!--SIDE NAV--> */}
        { !isSideNavDisabled && <SideNav /> }
        <div className="lc-page-wrapper__content content-wrapper">
          {/* <!--CO BROWSING HEADER-->  */}
          {shouldDisplayCoBrowsingHeader && <CoBrowsingHeader />}
          {/* <!--LOGGED IN HEADER--> */}
          <LoggedInHeader disabledFinPlan={disabledFinPlan} />
          {/* <!--WRAPPED CONTENT--> */}
          <div className="lc-page-wrapper__restrictive-cell-wrap">
            <div className="lc-page-wrapper__scrollable-content">
              {children}
            </div>
          </div>
        </div>

        {/* <Add ADDITIONAL ASSET MODAL> */}
        <Modal dimmer={'blurring'}
               size={'large'}
               open={isAssetModalOpen}>
          <Modal.Content>
            <AddAssetForm {...assetFormConfig} />
          </Modal.Content>
        </Modal>
      </div>);
  }

}

function mapStateToProps(state) {
  return {
    data: state.globalReducer,
    isAssetModalOpen: state.finPlanAssets.isAssetModalOpen,
    formIsLoading: state.finPlanAssets.formIsLoading,
    isRequestSuccess: state.finPlanAssets.isRequestSuccess,
    modalType: state.finPlanAssets.modalType,
    selectedAdditionalAsset: state.finPlanAssets.selectedAdditionalAsset,
    disabledFinPlan: isEmpty(state.sideNav.enabledAccounts)
 };
}

export default connect(mapStateToProps)(PageWrapper);
