import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
// Actions
import { getUserData } from '../../actions/global/users';
import {
        getStripePaymentInfo,
        getEditableFieldSets,
        getStripeSubscriptionInfo,
        setUserDataUpdatedStatus
       } from '../../actions/settings';

function PreferencesSettingsHOC(WrappedComponent) {
  class WrappedPreferencesSettingsComponent extends Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      userId: PropTypes.number,
      userData: PropTypes.object,
      fieldTypes: PropTypes.object.isRequired,
      stripeInfo: PropTypes.object,
      userUpdated: PropTypes.bool,
      isLoadingUser: PropTypes.bool,
      submissionError: PropTypes.string,
      numberOfChildren: PropTypes.number.isRequired,
      editableFieldSets: PropTypes.array,
      isStripeSubCancelled: PropTypes.bool,
      stripePlanPaymentName: PropTypes.any,
      stripePlanPaymentAmount: PropTypes.any,
      verificationInProgress: PropTypes.bool.isRequired,
      shouldShowCoClientFields: PropTypes.bool,
      showAdvisorCallInformation: PropTypes.bool.isRequired,
      hasPasswordVerificationError: PropTypes.bool.isRequired,
    };

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getUserData());
      dispatch(getStripePaymentInfo());
      dispatch(getEditableFieldSets());
      dispatch(getStripeSubscriptionInfo());
    }

    componentWillUnmount() {
      const { dispatch } = this.props;
      dispatch(setUserDataUpdatedStatus({ userUpdated: false }));
    }

    render() {
      const {
        userId,
        userData,
        stripeInfo,
        fieldTypes,
        userUpdated,
        isLoadingUser,
        submissionError,
        numberOfChildren,
        editableFieldSets,
        isStripeSubCancelled,
        verificationInProgress,
        stripePlanPaymentName,
        stripePlanPaymentAmount,
        shouldShowCoClientFields,
        showAdvisorCallInformation,
        hasPasswordVerificationError
      } = this.props;

      const updatedCardData = (!isEmpty(stripeInfo)
        && !isEmpty(stripeInfo.data)
        ? stripeInfo.data[0]
        : { brand: '', exp_year: '', exp_month: '', last4: '' });

      const updatedEditableFieldSets = filter(editableFieldSets, field =>
        field.originalName !== field.name || field.originalCategory !== field.category
      );

      const massagedProps = {
        formData: {
          userId,
          cardData: updatedCardData,
          fieldTypes,
          userUpdated,
          initialValues: userData,
          submissionError,
          numberOfChildren,
          editableFieldSets: updatedEditableFieldSets,
          isStripeSubCancelled,
          verificationInProgress,
          stripePlanPaymentName,
          stripePlanPaymentAmount,
          shouldShowCoClientFields,
          showAdvisorCallInformation,
          hasPasswordVerificationError,
        },
        isLoadingUser
      };
      return (
        <WrappedComponent {...massagedProps} />
      );
    }
  }

  function mapStateToProps({
    settings: {
      userId,
      userData,
      stripeInfo,
      fieldTypes,
      userUpdated,
      isLoadingUser,
      submissionError,
      numberOfChildren,
      editableFieldSets,
      isStripeSubCancelled,
      verificationInProgress,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      shouldShowCoClientFields,
      showAdvisorCallInformation,
      hasPasswordVerificationError,
    } }) {
    return {
      userId,
      userData,
      stripeInfo,
      fieldTypes,
      userUpdated,
      isLoadingUser,
      submissionError,
      numberOfChildren,
      editableFieldSets,
      isStripeSubCancelled,
      verificationInProgress,
      stripePlanPaymentName,
      stripePlanPaymentAmount,
      shouldShowCoClientFields,
      showAdvisorCallInformation,
      hasPasswordVerificationError,
    };
  }

  return connect(mapStateToProps)(WrappedPreferencesSettingsComponent);
}

export default PreferencesSettingsHOC;
