import React, { PropTypes, Component } from 'react';
import {
  Form,
  Field,
  touch,
  reduxForm
} from 'redux-form';
import get from 'lodash/get';
import range from 'lodash/range';
import isNumber from 'lodash/isNumber';
import camelCase from 'lodash/camelCase';

import TextArea from '../../Form/TextArea/TextArea';
import ChildFields from './components/ChildFields';
import GenericButton from '../../GenericButton/GenericButton';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';

import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupMessage, lookupFinPlanGoal } from '../../../utils/cmsUtils';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { defaultEmptyValueOptionGen, priorityOptions } from '../../../config/formFieldOptions';
import attrs from '../../../constants/enums/finPlanGoalAttributes';

import './EducationGoalsForm.scss';

const keyBase = 'educationGoals';
const initialId = 'initialValues.id';
const initialChildren = 'initialValues.numberOfChildren';

const touchReduxFormFields = (dispatch) => {
  dispatch(touch(reduxForms.educationGoalsForm, attrs.comments));
};

class EducationGoalsForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    type: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    reset: PropTypes.func.isRequired,
    children: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    initialValues: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  static _cms(key) {
    return lookupMessage(keyBase, key);
  }

  static _scrollToTop() {
    window.scrollTo(0, 0);
  }

  static _getInitialState(props) {
    // i.e if they already have saved the form we need to use the children that were created
    const numberOfChildren = get(props, initialId) ?
      get(props, initialChildren) : props.children.length;
    return { numberOfChildren, removingChildIdx: null };
  }

  constructor(props) {
    super(props);
    this.state = EducationGoalsForm._getInitialState(props);
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

  _renderChildren(type, children, numberOfChildren) {
    return range(0, numberOfChildren).map(idx =>
      (<ChildFields key={idx}
                    index={idx}
                    child={children[idx]}
                    isRemoving={this.state.removingChildIdx === idx}
                    hasAnimation={idx >= this.props.children.length}
                    schoolType={lookupFinPlanGoal(camelCase(type))} />)
    );
  }

  _addChild() {
    const numberOfChildren = this.state.numberOfChildren + 1;
    this.setState({ numberOfChildren });
  }

  _removeChild() {
    if (!isNumber(this.state.removingChildIdx)) {
      const numberOfChildren = this.state.numberOfChildren - 1;
      this.setState({ removingChildIdx: numberOfChildren },
        () => setTimeout(() => this.setState({
          numberOfChildren,
          removingChildIdx: null
        }), 400));
    }
  }

  _renderRemoveChild() {
    const { _cms } = EducationGoalsForm;
      return this.state.numberOfChildren ? (
        <button className="lc-education-goals-form__button--special
                           lc-education-goals-form__button--remove-child"
                onClick={(e) => { e.preventDefault(); this._removeChild(); }}>
          {_cms('button.removeChild.label')}
        </button>
      ) :
      (<div className="lc-blank__div" />);
  }

  // values, dispatch, and props supplied by redux-form:
  _onSubmit = (formValues, formDispatch, formProps) => {
    const { onSubmit } = this.props;
    EducationGoalsForm._scrollToTop();
    const { numberOfChildren } = this.state;

    onSubmit({ ...formValues, numberOfChildren }, formDispatch, formProps);
    this.setState({ numberOfChildren: 0 });
  }

  render() {
    const {
      type,
      reset,
      invalid,
      onCancel,
      children,
      submitting,
      handleSubmit
    } = this.props;

    const { _cms } = EducationGoalsForm;

    return (
      <Form className="lc-education-goals-form" onSubmit={handleSubmit(this._onSubmit)}>
        {/* <!--ROW1-->*/}
        <div className="lc-row row">
          {/* <!--Priority--> */}
          <div className="lc-column columns small-4 small-offset-4">
            <Field name={attrs.priority}
                  component={SelectGroup}
                  label={cms['goalPriority.label']}
                  validate={[required, optionSelected]}
                  options={[defaultEmptyValueOptionGen(), ...priorityOptions]} />
          </div>
          {/* <!--ROWS 2-4-->*/}
          {::this._renderChildren(type, children, this.state.numberOfChildren)}
          {/* <!--ROW 5-->*/}
          {/* <!--Add Child--> */}
          <div className="lc-education-goals-form__row lc-education-goals-form__row--no-padding">
            {/* <!--Remove Child-->*/}
            <div className="lc-column columns lc-column-right small-6">
              {this._renderRemoveChild()}
            </div>
            <div className="lc-column columns lc-column-right small-6">
              <button className="lc-education-goals-form__button--special lc-education-goals-form__button--add-child"
                      onClick={(e) => { e.preventDefault(); this._addChild(); }}>
                {_cms('button.addChild.label')}
              </button>
            </div>
          </div>
          {/* <!--ROW 6--> */}
          {/* <!--Comments--> */}
          <div className="lc-education-goals-form__row">
            <div className="lc-column columns small-12 lc-comment-margin-top">
              <Field name={attrs.comments}
                    component={TextArea}
                    type="text"
                    label={cms['comments.label']} />
            </div>
          </div>
          {/* <!--ROW 7--> */}
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
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: reduxForms.educationGoalsForm,
  enableReinitialize: true
})(EducationGoalsForm);
