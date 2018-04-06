import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { yodleeFastLink } from '../../config/properties';

class YodleeFastLink extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    rsession: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    extraParams: PropTypes.string
  };

  componentDidMount() {
    this._submitForm();
  }

  _renderContent({ url, rsession, token, extraParams }) {
    return (
      <div className="lc-yodlee-fastlink">
        <iframe className="lc-yodlee-fastlink__iframe"
                id="lc-yodlee-fastlink__iframe"
                name="yodlee-fastlink-iframe"
                scrolling="no" />
        <form action={url}
              method="POST" className="lc-yodlee-fastlink__form"
              target="yodlee-fastlink-iframe"
              ref={(form) => {
                this.fastLinkForm = form;
              }}>
          <input type="hidden" name="rsession" value={rsession} />
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="app" value={yodleeFastLink.finappId} />
          <input type="hidden" name="redirectReq" value={yodleeFastLink.redirectReq} />
          <input type="hidden" name="extraParams" value={extraParams} />
        </form>
      </div>
    );
  }

  _submitForm() {
    this.fastLinkForm.submit();
  }

  render() {
    const {
      url,
      rsession,
      token,
      extraParams
    } = this.props;
    return this._renderContent({
      url,
      rsession,
      token,
      extraParams
    });
  }
}

export default YodleeFastLink;
