import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import YodleeFastLink from './YodleeFastLink';
import { yodleeFastLink } from '../../config/properties';

describe('Components', () => {
  describe('YodleeFastLink', () => {
    const RSESSION = 'some rsession key here';
    const TOKEN = 'some token here';
    const FASTLINK_URL = 'https://node.developer.yodlee.com/authenticate/restserver/';
    const IFRAME_SCROLLING_OPTION = 'no';

    it('should render a YodleeFastLink component', () => {
      const wrapper = shallow(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('.lc-yodlee-fastlink')).to.have.length(1);
    });

    it('should have props for rsession key and token', () => {
      const wrapper = shallow(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.props().rsession).to.be.defined;
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.props().token).to.be.defined;
    });

    it('should have an iframe', () => {
      const wrapper = mount(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('iframe')).to.have.length(1);
      expect(wrapper.find('.lc-yodlee-fastlink__iframe')).to.have.length(1);
    });

    it('should hide the iframe\'s scrollbar', () => {
      const wrapper = mount(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('iframe').props().scrolling).to.equal(IFRAME_SCROLLING_OPTION);
    });

    it('should have a form', () => {
      const wrapper = mount(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('form')).to.have.length(1);
      expect(wrapper.find('.lc-yodlee-fastlink__form')).to.have.length(1);
    });

    it('should have the form configured to the right url', () => {
      const wrapper = mount(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('form').props().action).to.equal(FASTLINK_URL);
    });

    it('should have the necessary form inputs', () => {
      const wrapper = mount(
        <YodleeFastLink url={FASTLINK_URL} rsession={RSESSION} token={TOKEN} />
      );
      expect(wrapper.find('input[name="rsession"]').props().value).to.equal(RSESSION);
      expect(wrapper.find('input[name="token"]').props().value).to.equal(TOKEN);
      expect(wrapper.find('input[name="app"]').props().value).to.equal(yodleeFastLink.finappId);
      expect(wrapper.find('input[name="redirectReq"]').props().value).to.equal(yodleeFastLink.redirectReq);
      expect(wrapper.find('input[name="extraParams"]').props().value).to.equal(yodleeFastLink.extraParams);
    });
  });
});
