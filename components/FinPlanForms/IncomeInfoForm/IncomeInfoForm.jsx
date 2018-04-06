import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';
import OtherIncomeSourcesForm from '../OtherIncomeSourcesForm/OtherIncomeSourcesForm';
import EmployerSelfEmploymentForm from '../EmployerSelfEmploymentForm/EmployerSelfEmploymentForm';
import { toggleFinPlanIncomeForm } from '../../../actions/finPlan/finPlanIncome';
// Local Deps:
import Routes from '../../../constants/Routes';
import cms from '../../../config/messages';
import formTypes from '../../../constants/enums/finPlanIncomeFormTypes';

import { lookupMessage } from '../../../utils/cmsUtils';

import './IncomeInfoForm.scss';

const {
  incomeInfoForm,
  incomeSourcesForm,
  employmentInfoForm,
} = formTypes;

const keyBase = 'finPlanIncome.finPlanInfoForm';

export default class IncomeInfoForm extends Component { // eslint-disable-line

  static propTypes = {
    incomes: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    formType: PropTypes.string,
    clientName: PropTypes.string.isRequired,
    toggleStates: PropTypes.object.isRequired,
    coClientName: PropTypes.string,
    initialValues: PropTypes.object
  }

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  _generateForm({
    formType,
    onSubmit,
    onCancel,
    options,
    incomes,
    initialValues
  }) {
    const { dispatch, toggleStates } = this.props;

    const formConfig = {
      incomes,
      options,
      onCancel,
      onSubmit,
      dispatch,
      formType,
      toggleStates,
      initialValues
    };

    switch (formType) {
      case employmentInfoForm:
        return (
          <EmployerSelfEmploymentForm {...formConfig} />
        );
      default:
        return (
          <OtherIncomeSourcesForm {...formConfig} />
        );
    }
  }

  _toggleVisibleForm(formType) {
    const { dispatch } = this.props;
    dispatch(toggleFinPlanIncomeForm(formType));
  }

  render() {
    const {
      clientName,
      coClientName,
      onSubmit,
      onCancel,
      formType,
      incomes,
      initialValues
    } = this.props;

    const showIncomeForm = (formType === incomeSourcesForm || formType === incomeInfoForm);
    const showEmployerForm = formType === employmentInfoForm;

    const options = {
      employedIndividualNameOptions: coClientName ?
        { clientName, coClientName } : { clientName }
      };

    return (
      <div className="lc-income-form">
        {/* <!--Select Form Type Buttons--> */}
        <div className="lc-row row">
          <div className="columns small-6 first-button-container">
            <div className={cx('lc-income-form__button--input-style text-center button-left',
                { 'lc-active-income-info-form-button': showEmployerForm })}
                 onClick={() => this._toggleVisibleForm(employmentInfoForm)}>
              {IncomeInfoForm._cms('addEmployer')}
            </div>
          </div>
          <div className="columns small-6 second-button-container">
            <div className={cx('lc-income-form__button--input-style text-center button-right',
                { 'lc-active-income-info-form-button': showIncomeForm })}
                 onClick={() => this._toggleVisibleForm(incomeSourcesForm)}>
              {IncomeInfoForm._cms('addOtherIncome')}
            </div>
          </div>
        </div>
        {/* <!--Dynamic form for Income Info--> */}
        {formType &&
          this._generateForm({
            incomes,
            formType,
            onSubmit,
            onCancel,
            options,
            initialValues
          })
        }
        {/* <!--NAVIGATION BUTTONS--> */}
        { !showIncomeForm && !showEmployerForm &&
          <div className="lc-row row lc-fin-plan__buttons">
            <GenericNavButton className="lc-button--left lc-button--white"
                              route={Routes.finPlanGoals}
                              text={cms['button.previous']} />
            <GenericNavButton className="lc-button--right lc-button--blue"
                route={Routes.finPlanInsurance}
                text={cms['button.next']}
                isDisabled={isEmpty(incomes)} />
          </div>
        }
      </div>
    );
  }
}
