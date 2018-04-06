import React, { PropTypes, Component } from 'react';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
// Local Deps:
import cms from '../../../config/messages';
import { NUMBER_ZERO } from '../../../config/properties';
import attrs from '../../../config/preferencesAttributes';
import FinPlanSummaryPageType from '../../../config/finPlanSummaryPageType';
// Components
import FinPlanHOC from '../../../hoc/FinPlanHOC/FinPlanHOC';
import GenericError from '../../../components/GenericError/GenericError';
import LoadingHexagon from '../../../components/LoadingHexagon/LoadingHexagon';
import FinancialSnapshot from '../../../components/FinancialSnapshot/FinancialSnapshot';
import FinancialPlanBreadcrumb
  from '../../../components/FinancialPlanBreadcrumb/FinancialPlanBreadcrumb';
import FinancialPlanSummaryNavMenu from '../../../components/FinancialPlanSummaryNavMenu/FinancialPlanSummaryNavMenu';
import PersonalDetailsInfoForm
  from '../../../components/FinPlanForms/PersonalDetailsInfoForm/PersonalDetailsInfoForm';
// Actions
import { updateFinPlanBreadcrumb } from '../../../actions/global/finPlan/finPlanBreadcrumbs';
// Utils
import {
        showNoTaxFiledError,
        hideNoTaxFiledError,
        setCoClientVisibility,
        changeNumberOfChildren,
        submitPersonalDetailsForm,
        updatePersonalDetailsForm,
      } from '../../../actions/finPlan/finPlanPersonalDetails';
// Utils
import {
        hasAnyCoClientValues,
        createUserRepresentation,
        createUserRepresentationForSave
      } from '../../../utils/settingsUtils';

// Constants
const yes = 'yes';
const debounceMS = 500;
const personalDetailsInfoForm = 'personalDetailsInfoForm';

class FinPlanPersonalDetails extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    finPlanId: PropTypes.number,
    furthestStep: PropTypes.object,
    currentStep: PropTypes.object,
    isFetchingFinPlan: PropTypes.bool.isRequired,
    finPlanPersonalDetails: PropTypes.object,
    isFinPlanSubmitted: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      finPlanId,
      currentStep,
      finPlanPersonalDetails
    } = nextProps;
    // i.e. if there was no fin plan (it was undefined) and then we fetch the fin plan data and
    // there was either a value (an object) or it was null (the default state);
    if (isUndefined(this.props.finPlanPersonalDetails) && !isUndefined(finPlanPersonalDetails)) {
      if (finPlanPersonalDetails) {
        const numberOfChildren = finPlanPersonalDetails ?
          finPlanPersonalDetails.children.length : NUMBER_ZERO;
        dispatch(changeNumberOfChildren(numberOfChildren));
        // We need to let the form register first, before we change the value
        setTimeout(() =>
          dispatch(change(personalDetailsInfoForm, attrs.numberOfChildren, `${numberOfChildren}`)),
          debounceMS);

        dispatch(setCoClientVisibility(hasAnyCoClientValues(finPlanPersonalDetails.coClient)));
      }
    }
    // If we haven't updated this page's breadcrumb status, we do so now:
    const pageHasNeverBeenVisited = currentStep && !currentStep.isVisited;
    if (finPlanId && pageHasNeverBeenVisited) {
      dispatch(updateFinPlanBreadcrumb({
        ...currentStep,
        isVisited: true,
      }, finPlanId));
    }
  }

   _onSubmit(formValues) {
    const {
      data: {
        shouldShowCoClientFields
      },
      dispatch,
      finPlanId,
      finPlanPersonalDetails
    } = this.props;

    const userDetails = createUserRepresentationForSave(formValues, shouldShowCoClientFields, {});

    dispatch(hideNoTaxFiledError());

    if (formValues.hasSubmitedTaxReturnsInLastTwoYears !== yes) {
      dispatch(showNoTaxFiledError());
    }
    else if (finPlanPersonalDetails && finPlanPersonalDetails.id) {
      dispatch(updatePersonalDetailsForm(userDetails, finPlanPersonalDetails.id, finPlanId));
    }
    else {
      dispatch(submitPersonalDetailsForm(userDetails, finPlanId));
    }
  }

  render() {
    const {
      data: {
        userData,
        numberOfChildren,
        hasNoTaxFiledError,
        shouldShowCoClientFields,
      },
      currentStep,
      furthestStep,
      isFetchingFinPlan,
      finPlanPersonalDetails,
      isFinPlanSubmitted
    } = this.props;

    const initialValues = finPlanPersonalDetails ?
      createUserRepresentation(finPlanPersonalDetails) : userData;

    const formProps = {
      onSubmit: ::this._onSubmit,
      initialValues,
      numberOfChildren,
      shouldShowCoClientFields
    };

    return (
      <div className="lc-personal-details-info lc-fin-plan-page animated fadeIn">
        {/* <!--FINANCIAL SNAPSHOT--> */}
        <FinancialSnapshot />
        {/* <!--FORM--> */}
        <div className="lc-personal-details-info__content">
          {/* <!--NAV MENU -->  */}
          { isFinPlanSubmitted &&
            <FinancialPlanSummaryNavMenu pageType={FinPlanSummaryPageType.finPlanDataPage} /> }
          {/* <!--BREADCRUMB -->  */}
          { !isFetchingFinPlan &&
            <FinancialPlanBreadcrumb furthestStep={furthestStep}
                                     currentStep={currentStep} />
          }
          <div className="lc-row row">
            <h1 className="lc-personal-details-info__header lc-fin-plan__header">
              {cms['personalDetails.header']}
            </h1>
            <div className="lc-column columns small-12 lc-column--no-padding">
              { isFetchingFinPlan ?
                <LoadingHexagon />
                :
                <PersonalDetailsInfoForm {...formProps} />
              }
            </div>
            {hasNoTaxFiledError &&
              <div className="lc-column columns small-12 lc-column--no-padding">
                <GenericError message={cms['personalDetailsInfo.error.noTaxReturnFiled']}
                              className="fin-plan-personal-details--error" />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    data: state.finPlanPersonalDetails,
    isFinPlanSubmitted: state.finPlan.isFinPlanSubmitted
  };
}

export default FinPlanHOC(connect(mapStateToProps)(FinPlanPersonalDetails));
