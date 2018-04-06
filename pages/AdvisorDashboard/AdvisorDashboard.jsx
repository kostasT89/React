import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Local Deps:
import {
  toggleCalendar,
  initiateCoBrowsing,
  fetchAdvisorDashboardData,
} from '../../actions/advisorDashboard';

import { updateUserCurrentStatus } from '../../actions/global/users';

// Components:
import Footer from '../../components/Footer/Footer';
import LoadingWave from '../../components/LoadingWave/LoadingWave';
import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader';
import FisecalUsersTable from '../../components/FisecalUsersTable/FisecalUsersTable';

import cms from '../../config/messages';

import './AdvisorDashboard.scss';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class AdvisorDashboard extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchAdvisorDashboardData());
  }

  _toggleCalendar() {
    this.props.dispatch(toggleCalendar());
  }

  _initiateCoBrowsing(userId) {
    this.props.dispatch(initiateCoBrowsing(userId));
  }

  _changeCurrentStatus(userId, currentStatus) {
    this.props.dispatch(updateUserCurrentStatus(userId, currentStatus));
  }

  render() {
    const {
      data: {
        events,
        showCalendar,
        fisecalUsers,
        requestSending
      }
    } = this.props;

    return (
      <div className="lc-advisor-dashboard-component animated fadeIn">
        <LoggedOutHeader />
        <section className="lc-row lc-row--one">
          <div className="lc-row__form columns small-12">
            {requestSending ?
              <LoadingWave optionalClassName="advisor-dashboard-loading" />
              :
              <div>
                <div className="lc-show-hide-calendar-button-container text-center">
                  <button className="button"
                          onClick={::this._toggleCalendar}>
                    {cms['advisor_dashboard.toggle_calendar']}
                  </button>
                </div>
                {showCalendar &&
                  <BigCalendar events={events}
                               className="lc-calendar-container animated fadeIn" />
                }
                <div className="lc-fisecal-users-table-component-wrapper ">
                  <FisecalUsersTable onClick={::this._initiateCoBrowsing}
                                     onChange={::this._changeCurrentStatus}
                                     fisecalUsers={fisecalUsers} />
                </div>
              </div>
            }
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.advisorDashboard
  };
}

export default connect(mapStateToProps)(AdvisorDashboard);
