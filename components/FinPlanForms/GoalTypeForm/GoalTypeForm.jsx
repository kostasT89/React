// Global Deps
import React, { PropTypes, Component } from 'react';
import {
  Form,
  Field,
  touch,
  change,
  reduxForm
} from 'redux-form';
import get from 'lodash/get';
// Local Deps
import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { selectOptions } from '../../../config/finPlan/finPlanGoals';
import { changeFormFieldType } from '../../../actions/finPlan/finPlan';
import { updateSelectedOption } from '../../../actions/finPlan/finPlanGoals';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { shouldChangeFormFieldType } from '../../../utils/finPlan/finPlanUtils';
// Components
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
// Constants
import { OTHER_PLEASE_TYPE } from '../../../constants/AppConstants';
// Loal Constants
const goalType = 'goalType';
const initialValues = 'initialValues';
const initialId = `${initialValues}.id`;
const otherPleaseType = 'otherPleaseType';
const initialGoalType = `${initialValues}.goalType`;

class GoalTypeForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fieldTypes: PropTypes.object,
    initialValues: PropTypes.object, // eslint-disable-line
    selectedOptionKey: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const nextGoalType = get(nextProps, initialGoalType);
    const currentGoalType = get(this.props, initialGoalType);

    if (nextGoalType && nextGoalType !== currentGoalType) {
      const { dispatch } = this.props;

      const nextId = get(nextProps, initialId);
      const currentId = get(this.props, initialId);

      dispatch(touch(reduxForms.goalTypeForm, goalType));
      // i.e. if the user selects other please type we want to clear the goal type text away
      if (nextGoalType === otherPleaseType) {
        dispatch(change(reduxForms.goalTypeForm, goalType, ' '));
      }
      // i.e. the user is editing an existing other please type goal
      if (shouldChangeFormFieldType(nextGoalType, selectOptions) &&
          (nextId && (currentId !== nextId))) {
        this._dispatchChangeFormFieldTypeActions();
        // i.e. we need to change the actual value of the other please type field to NOT be a
        // camelCase version of the name, since we pass in a camelCase version in the initialValues
        dispatch(change(reduxForms.goalTypeForm, goalType, nextProps.selectedOptionKey));
      }
    }
  }

  _dispatchChangeFormFieldTypeActions() {
    this.props.dispatch(changeFormFieldType(goalType));
  }

  _handleChange(event) {
    const { target: { value } } = event;
    const { dispatch, selectedOptionKey } = this.props;

    if (value === OTHER_PLEASE_TYPE) {
      event.preventDefault();
      dispatch(updateSelectedOption(value));
      return dispatch(changeFormFieldType(goalType));
    }
    if (value !== selectedOptionKey) {
      dispatch(updateSelectedOption(value));
    }
  }

  render() {
    const { dispatch, fieldTypes } = this.props;
    return (
      <Form onSubmit={e => e.preventDefault()}>
        {
          fieldTypes[goalType] ?
            (<Field name={goalType}
                    label={cms['finPlanGoals.label']}
                    component={InputGroup}
                    autoFocus
                    validate={[required]}
                    onCancelCB={() => dispatch(changeFormFieldType(goalType))} />)
          :
          (<Field hasOther
                  name={goalType}
                  component={SelectGroup}
                  onChange={::this._handleChange}
                  label={cms['finPlanGoals.label']}
                  validate={[required, optionSelected]}
                  options={[...selectOptions]} />)
        }
      </Form>
    );
  }
}

export default reduxForm({
  form: reduxForms.goalTypeForm,
  enableReinitialize: true
})(GoalTypeForm);
