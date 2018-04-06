/* eslint-disable no-unused-expressions */

import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import { formatMomentAsTime } from '../../../utils/dateUtils';
import Appointment from './Appointment';
import AppointmentForm from '../../AppointmentForm/AppointmentForm';

describe('Components', () => {
  describe('Appointment', () => {
    // Initialize
    const ARBITRARY_STRING = 'ARBITRARY_STRING';
    const ARBITRARY_STRING_2 = 'ARBITRARY_STRING_2';
    const ARBITRARY_STRING_3 = 'ARBITRARY_STRING_3';
    const arbitraryFunc = () => [];
    const date = moment();
    const formattedDate = formatMomentAsTime(date);
    const appointmentText = `${formattedDate} - ${formattedDate}`;

    // Mock Appointments
    const appt1 = {
      dateStart: date,
      dateEnd: date,
      id: 'moo'
    };
    const appt2 = Object.assign({}, appt1);
    appt2.isActive = true;

    // Mock Store
    const createMockStore = configureMockStore([]);
    const mockStore = createMockStore({
      appointments: [appt1]
    });

    it('should render an Appointment component', () => {
      const wrapper = shallow(
        <Appointment text={ARBITRARY_STRING}
                     id={ARBITRARY_STRING_2}
                     value={ARBITRARY_STRING_3} />
      );
      expect(wrapper.find('.lc-appointment')).to.have.length(1);
    });

    it('should have necessary props', () => {
      const wrapper = shallow(
        <Appointment text={ARBITRARY_STRING}
                     id={ARBITRARY_STRING_2}
                     value={ARBITRARY_STRING_3} />
      );
      expect(wrapper.props().text).to.be.defined;
      expect(wrapper.props().id).to.be.defined;
      expect(wrapper.props().value).to.be.defined;
      expect(wrapper.props().isActive).to.be.defined;
    });

    it('should have an input', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm appointments={[appt1]}
            date={date}
            onSubmit={arbitraryFunc} />
        </Provider>
      );
      const appointment = wrapper.find('.lc-appointment');
      expect(appointment.find('input')).to.have.length(1);
      expect(appointment.find('.lc-appointment__input')).to.have.length(1);
    });

    it('should have a label', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm appointments={[appt1]}
            date={date}
            onSubmit={arbitraryFunc} />
        </Provider>
      );
      const appointment = wrapper.find('.lc-appointment');
      expect(appointment.find('label')).to.have.length(1);
      expect(appointment.find('.lc-appointment__label')).to.have.length(1);
    });

    it('should render text', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm appointments={[appt1]}
            date={date}
            handleSubmit={arbitraryFunc} />
        </Provider>
      );
      const appointment = wrapper.find('.lc-appointment');
      const text = appointment.find('.lc-appointment__text');
      expect(text).to.have.length(1);
      expect(text.text()).to.equal(appointmentText);
    });

    /*
    *  TODO -- SKIPPING TEST(S) BELOW:
    *  Waiting on a better way to test <Field> components:
    *    https://github.com/erikras/redux-form/issues/849
    */
    xit('should reflect active state', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm appointments={[appt2]}
            date={date}
            handleSubmit={arbitraryFunc} />
        </Provider>
      );
      const appointment = wrapper.find('.lc-appointment');
      expect(appointment.find('.lc-appointment--active')).to.have.length(1);
    });
  });
});
