import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoadingWave from './LoadingWave';

describe('Components', () => {
  describe('LoadingWave', () => {
    it('should render a loading wave animation', () => {
      const wrapper = shallow(<LoadingWave />);
        expect(wrapper.find('.sk-wave')).to.have.length(1);
    });
  });
});
