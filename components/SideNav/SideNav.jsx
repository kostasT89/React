// Global Deps
import React, { PropTypes, Component } from 'react';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
// Local Deps
import { schema } from '../../schemas/sideNavSchema';
import UserSnapshot from '../UserSnapshot/UserSnapshot';
import Routes from '../../constants/Routes';
import cms from '../../config/messages';
import ModalType from '../../config/modalType';
import SideNavHOC from '../../hoc/SideNavHOC';
import AccountTypes from '../../../app/constants/enums/accountTypes';
import { signalAccountsRendered } from '../../actions/sideNav';
import {
  toggleAddAdditionalAssetModal,
  resetRequestSuccess,
  setAdditionalAssetModalType,
  setSelectedAdditionalAsset
} from '../../actions/global/finPlan/finPlanAssets';
// Components
import SideNavElement from './components/SideNavElement';
import AddAccount from './components/AddAccount';
import Networth from './components/Networth';

class SideNav extends Component {

  static _generateSideNavElements(accountsObject, dispatch) {
    const sideNavElements = schema.map((parentElement, idx) => {
      const config = {
        subNavElements: accountsObject[parentElement.navKey] || [],
        icon: parentElement.icon || '',
        navClass: parentElement.navClass || '',
        title: parentElement.title || '',
        accountType: parentElement.navKey
      };

      return (
        <div className="lc-side-nav__element-group" key={idx}>
          <SideNavElement {...config}
              handleClick={(id, property, amount) => {
                dispatch(setSelectedAdditionalAsset(id, property, amount));
                dispatch(toggleAddAdditionalAssetModal(true));
                dispatch(setAdditionalAssetModalType(ModalType.additionalAssetUpdate));
                dispatch(resetRequestSuccess());
              }} />
          {
            parentElement.navKey === AccountTypes.additionalAsset &&
            <AddAccount
                handleClick={() => {
                  dispatch(setSelectedAdditionalAsset());
                  dispatch(toggleAddAdditionalAssetModal(true));
                  dispatch(setAdditionalAssetModalType(ModalType.additionalAssetAdd));
                  dispatch(resetRequestSuccess());
                }}
                text={cms['side_nav.addAdditionalAsset']} />
          }
        </div>
      );
    });
    return sideNavElements;
  }

  componentDidMount() {
    const { dispatch, accounts } = this.props;

    /*
    * The side nav displays the accounts and dictates the height of
    * the page wrapper and the application.  When the account data
    * comes through, we dispatch an action notifying the rest of the
    * application that it has rendered.
    */
    if (flatten(values(accounts)).length > 1) {
      dispatch(signalAccountsRendered());
    }
  }

  render() {
    const { userData, accounts, dispatch, disabledFinPlan } = this.props;
    const { _generateSideNavElements } = SideNav;

    return (
      <div className="lc-side-nav">
        <div className="lc-side-nav__content">
          <UserSnapshot userName={userData.userName} disabledFinPlan={disabledFinPlan} />
          <AddAccount linkTo={Routes.connect} text={cms['side_nav.addAccount']} />
          {_generateSideNavElements(accounts, dispatch)}
          <Networth accounts={accounts} />
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  dispatch: PropTypes.func,
  accounts: PropTypes.object,
  userData: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired
  }).isRequired,
  disabledFinPlan: PropTypes.bool
};

export default SideNavHOC(SideNav);
