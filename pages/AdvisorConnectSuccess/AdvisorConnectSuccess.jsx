import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import FinancialSnapshot from '../../components/FinancialSnapshot/FinancialSnapshot';
import GenericButton from '../../components/GenericButton/GenericButton';

import Routes from '../../constants/Routes';
import cms from '../../config/messages';
import mobileImage from '../../assets/svg/phone.svg';

const AdvisorConnectSuccess = ({ data: { user } }) => {
  const userName = (user && user.firstName) || '';

  return (
    <div className="lc-advisor-connect-success">
      {/* <!--FINANCIAL SNAPSHOT--> */}
      <FinancialSnapshot />

      {/* <!--CONTENT--> */}
      <div className="lc-advisor-connect-success__content">
        <div className="lc-row row">
          <div className="lc-column columns medium-8 medium-offset-2" >
            <h1 className="lc-advisor-connect-success__header">
              {`${cms['advisorConnectSuccess.header']} ${userName}!`}
            </h1>
            <img role="presentation" className="lc-advisor-connect-success__image" src={mobileImage} />
            <div className="lc-advisor-connect-success__text1">
              <strong>{cms['advisorConnectSuccess.text1']}</strong>
            </div>
            <div className="lc-advisor-connect-success__text2">
              {cms['advisorConnectSuccess.text2']}
            </div>
            <Link to={Routes.dashboard}>
              <GenericButton className="lc-advisor-connect-success__button"
                text={cms['advisorConnectSuccess.button']} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

AdvisorConnectSuccess.propTypes = {
  data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { data: state.advisorConnectSuccess };
}

export default connect(mapStateToProps)(AdvisorConnectSuccess);
