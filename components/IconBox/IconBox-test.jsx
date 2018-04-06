/* eslint-disable no-unused-expressions */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import IconBox from './IconBox';

describe('Components', () => {
  describe('IconBox', () => {
    const ARBITRARY_STRING = 'Howdy';
    const ARBITRARY_STRING2 = 'Hello';
    const arbButton = {
      text: ARBITRARY_STRING,
      route: ARBITRARY_STRING2
    };

    it('should render an IconBox component', () => {
      const wrapper = shallow(<IconBox button={arbButton} />);
      expect(wrapper.find('.lc-icon-box')).to.have.length(1);
    });

    it('should have props for button, text, and image', () => {
      const wrapper = shallow(<IconBox button={arbButton} />);
      expect(wrapper.props().button).to.be.defined;
      expect(wrapper.props().text).to.be.defined;
      expect(wrapper.props().image).to.be.defined;
    });

    it('should have a link for its button', () => {
      const wrapper = mount(<IconBox button={arbButton} />);
      expect(wrapper.find('a')).to.have.length(1);
      expect(wrapper.find('.lc-icon-box__link')).to.have.length(1);
    });

    it('should render a button', () => {
      const wrapper = mount(<IconBox button={arbButton} />);
      const button = wrapper.find('.lc-icon-box__button');
      expect(button).to.have.length(1);
      expect(button.text()).to.equal(ARBITRARY_STRING);
    });

    it('should render image content', () => {
      const wrapper = mount(
        <IconBox button={arbButton} image={ARBITRARY_STRING} />
      );
      const image = wrapper.find('.lc-icon-box__image');
      expect(wrapper.find('.lc-icon-box__content')).to.have.length(1);
      expect(image).to.have.length(1);
      expect(image.props().src).to.equal(ARBITRARY_STRING);
    });

    it('should render text', () => {
      const wrapper = mount(
        <IconBox button={arbButton} text={ARBITRARY_STRING} />
      );
      const text = wrapper.find('.lc-icon-box__text');
      expect(text).to.have.length(1);
      expect(text.text()).to.equal(ARBITRARY_STRING);
    });
  });
});
