import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getYodleeFastLinkAuthData } from '../../actions/fastLink';
import { createFastLinkExtraParams } from '../../utils/yodleeFastLinkUtils';

import LoadingHexagon from '../../components/LoadingHexagon/LoadingHexagon';
import YodleeFastLink from '../../components/YodleeFastLink/YodleeFastLink';

class Connect extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  static _renderYodleeFastLink({ url, rsession, token, extraParams }) {
    if (!rsession || !token) { return; }
    return (
      <YodleeFastLink url={url}
        rsession={rsession}
        token={token}
        extraParams={extraParams} />
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getYodleeFastLinkAuthData());
  }

  render() {
    const {
      data: { fastLinkAuthData },
    } = this.props;
    const { origin } = window.location;
    const extraParams = createFastLinkExtraParams(origin);
    return (
      <div className="lc-connect-page animated fadeIn">
        {
          fastLinkAuthData ?
          Connect._renderYodleeFastLink({
            url: fastLinkAuthData.url,
            rsession: fastLinkAuthData.rsession,
            token: fastLinkAuthData.token,
            extraParams
          }) :
          <LoadingHexagon />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.connect
  };
}

export default connect(mapStateToProps)(Connect);
