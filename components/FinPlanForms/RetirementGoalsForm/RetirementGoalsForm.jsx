// Global Deps
import React, { PropTypes, Component } from 'react';
import { Field, Form, reduxForm, touch } from 'redux-form';
import get from 'lodash/get';
// Local Deps
import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupMessage } from '../../../utils/cmsUtils';
import attrs from '../../../constants/enums/finPlanGoalAttributes';
import fieldMasks from '../../../../app/constants/enums/fieldMasks';
import inputTypes from '../../../../app/constants/enums/inputTypes';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { priorityOptions, defaultEmptyValueOptionGen } from '../../../config/formFieldOptions';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';

import './RetirementGoalsForm.scss';

const keyBase = 'retirementGoals';
const initialId = 'initialValues.id';

const touchReduxFormFields = (dispatch) => {
  dispatch(touch(reduxForms.retirementGoalsForm, attrs.priority));
  dispatch(touch(reduxForms.retirementGoalsForm, attrs.comments));
};

class RetirementGoalsForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    type: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    dispatch: PropTypes.func // eslint-disable-line react/no-unused-prop-types
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _scrollToTop() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    if (get(this.props, initialId)) {
      touchReduxFormFields(this.props.dispatch);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, initialId);
    const currentId = get(this.props, initialId);
    if (nextId && nextId !== currentId) {
      touchReduxFormFields(this.props.dispatch);
    }
  }

  _onSubmit(formValues, formDispatch, formProps) {
    const { onSubmit } = this.props;
    RetirementGoalsForm._scrollToTop();
    return onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      reset,
      invalid,
      onCancel,
      submitting,
      handleSubmit
    } = this.props;

    const { _cms } = RetirementGoalsForm;

    return (
      <Form className="lc-retirement-goals-form"
            onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-retirement-goals-form__row">
          {/* <!--Priority--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.priority}
                   component={SelectGroup}
                   label={cms['goalPriority.label']}
                   placeholder={cms['pleaseMakeSelection.placeholder']}
                   options={[defaultEmptyValueOptionGen(), ...priorityOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Percent of Total Income Desired At Retirement-->*/}
          <div className="lc-column columns small-6">
            <Field name={attrs.desiredIncomePercent}
                   component={InputGroup}
                   mask={fieldMasks.percentage}
                   type={inputTypes.text}
                   label={_cms('field.desiredIncomePercent.label')}
                   placeholder={cms['zeroPercent.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-retirement-goals-form__row">
          {/* <!--Planned Retirement Age--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.plannedRetirementAge}
                   component={InputGroup}
                   mask={fieldMasks.age}
                   type={inputTypes.number}
                   label={_cms('field.plannedRetirementAge.label')}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required]} />
          </div>
          {/* <!--Desired Retirement Term--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.retirementTerm}
                   component={InputGroup}
                   type={inputTypes.number}
                   mask={fieldMasks.age}
                   label={_cms('field.retirementTerm.label')}
                   subtext={_cms('field.retirementTerm.subtext')}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 3--> */}
        <div className="lc-row row lc-retirement-goals-form__row--short">
          {/* <!--Expected Monthly Social Security Income--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.monthlySocialSecurityIncome}
                   component={InputGroup}
                   mask={fieldMasks.currency}
                   type={inputTypes.text}
                   label={_cms('field.monthlySocialSecurityIncome.label')}
                   subtext={_cms('field.monthlySocialSecurityIncome.subtext')}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 4--> */}
        {/* <!--Comments--> */}
        <div className="lc-row row lc-retirement-goals-form__row--long">
          <div className="lc-column columns small-12">
            <Field name={attrs.comments}
                   component={TextArea}
                   type={inputTypes.text}
                   label={cms['comments.label']} />
          </div>
        </div>
        {/* <!--ROW 5-->*/}
        {/* <!--Buttons -->*/}
        <div className="lc-fin-plan__buttons">
          <GenericButton className="lc-button--left lc-button--white"
                         text={cms['button.previous']}
                         onClick={() => { onCancel(); reset(); }} />
          <GenericButton className="lc-button--right lc-button--blue"
                         text={cms['goals.button.submit']}
                         type="submit"
                         isDisabled={invalid || submitting} />
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: reduxForms.retirementGoalsForm,
  enableReinitialize: true
})(RetirementGoalsForm);
