import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import moment from 'moment';
import { defaultTimeFormat, defaultDateFormat } from '../../config/properties';

import AppointmentGroup from './AppointmentGroup';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

describe('Components', () => {
  describe('AppointmentGroup', () => {
    // Initialize
    const arbitraryFunc = () => [];
    const date = moment();

    // Mock Appointments
    const appt1 = {
      dateStart: date,
      dateEnd: date,
      id: 'moo'
    };
    const appointments = [appt1, appt1];

    // Mock Store
    const createMockStore = configureMockStore([]);
    const mockStore = createMockStore({
      appointments
    });

    it('should render an AppointmentGroup component', () => {
      const wrapper = shallow(
        <AppointmentGroup appointments={[appt1, appt1]} />
      );
      expect(wrapper.find('.lc-appointment-group')).to.have.length(1);
    });

    it('should have the necessary props', () => {
      const wrapper = shallow(
        <AppointmentGroup appointments={[appt1, appt1]} />
      );
      expect(wrapper.props().appointments).to.be.defined; // eslint-disable-line no-unused-expressions,max-len
      expect(wrapper.props().dateFormat).to.be.defined; // eslint-disable-line no-unused-expressions,max-len
    });

    it('should generate the correct number of appointments', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm handleSubmit={arbitraryFunc}
            date={date}
            appointments={appointments}
          />
        </Provider>
      );
      expect(wrapper.find('.lc-appointment')).to.have.length(2);
    });

    /*
    *  TODO -- SKIPPING TESTS BELOW:
    *  Waiting on a better way to test <Field> components:
    *    https://github.com/erikras/redux-form/issues/849
    */
    xit('will use the default date format if no format is passed in', () => {
      const wrapper = mount(
        <Provider store={mockStore}>
          <AppointmentForm handleSubmit={arbitraryFunc}
            date={date}
            appointments={appointments} />
        </Provider>
      );
      const formattedTime = moment(appt1.date).format(defaultTimeFormat);
      expect(wrapper.find('.lc-appointment').node.textContent).to.equal(`${formattedTime} - ${formattedTime}`);
    });

    xit('will format appointments according to date format passed in', () => {
      const wrapper = mount(
        <AppointmentGroup appointments={[appt1, appt1]} dateFormat={defaultDateFormat} />
      );
      const formattedDate = moment(appt1.dateStart).format(defaultDateFormat);
      expect(wrapper.find('.lc-appointment').node.textContent).to.equal(`${formattedDate} - ${formattedDate}`);
    });
  });
});
