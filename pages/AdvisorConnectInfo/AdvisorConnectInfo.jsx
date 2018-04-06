// NOTE: Note this page was deemed duplicative as a result of conversations with Lou on 11/14/2017
// an is in a state of hold until further notice and is not being used

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import cms from '../../config/messages';
import Routes from '../../constants/Routes';
import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import AdvisorConnectInfoForm from '../../components/AdvisorConnectInfoForm/AdvisorConnectInfoForm';
import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import { submitAdvisorConnectInfoForm } from '../../actions/advisorConnect';

class AdvisorConnectInfo extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static _onSubmitConnectInfoForm(formValues, formDispatch) {
    formDispatch(submitAdvisorConnectInfoForm([...formValues]));
    return browserHistory.push(Routes.advisorConnectSuccess);
  }

  render() {
    const {
      user,
      fieldTypes
    } = this.props.data;

    const firstName = user && user.firstName;
    const lastName = user && user.lastName;

    const formProps = {
      firstName,
      lastName,
      fieldTypes,
      onSubmit: AdvisorConnectInfo._onSubmitConnectInfoForm
    };

    return (
      <div className="lc-advisor-connect-info">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />

        {/* <!--FORM--> */}
        <div className="lc-advisor-connect-info__content">
          <div className="lc-row row">
            <h1 className="lc-advisor-connect-info__header">
              {cms['advisorConnectInfo.header']}
            </h1>
            <div className="lc-column columns small-12">
              { user ?
                <AdvisorConnectInfoForm {...formProps}
                                        initialValues={{ gavePermissionToViewFinData: true }} />
                :
                <LoadingHexagon />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.advisorConnectInfo };
}

export default connect(mapStateToProps)(AdvisorConnectInfo);
