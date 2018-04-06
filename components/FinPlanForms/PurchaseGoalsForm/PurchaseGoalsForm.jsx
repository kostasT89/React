// Global Deps
import React, { PropTypes, Component } from 'react';
import {
  Form,
  Field,
  touch,
  reduxForm,
} from 'redux-form';

import cx from 'classnames';
import get from 'lodash/get';
// Local Deps
import cms from '../../../config/messages';
import reduxForms from '../../../config/reduxForms';
import TextArea from '../../Form/TextArea/TextArea';
import { lookupMessage } from '../../../utils/cmsUtils';
import InputGroup from '../../Form/InputGroup/InputGroup';
import SelectGroup from '../../Form/SelectGroup/SelectGroup';
import GenericButton from '../../GenericButton/GenericButton';
import fieldMasks from '../../../constants/enums/fieldMasks';
import attrs from '../../../constants/enums/finPlanGoalAttributes';
import { required, optionSelected } from '../../../utils/formValidationUtils';
import { defaultEmptyValueOptionGen, priorityOptions } from '../../../config/formFieldOptions';

import './PurchaseGoalsForm.scss';
// Constants
const keyBase = 'purchaseGoals';
const initialId = 'initialValues.id';

const touchReduxFormFields = (dispatch) => {
  dispatch(touch(reduxForms.purchaseGoalsForm, attrs.comments));
  dispatch(touch(reduxForms.purchaseGoalsForm, attrs.priority));
};

class PurchaseGoalsForm extends Component {
  /*
  * ReduxForm Note:
  *   Some propTypes are not explicitly used, because they are being returned
  *   in the `formProps` object in the onSubmit function.
  */
  static propTypes = {
    reset: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired, // supplied by redux-form
    type: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    initialValues: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    shouldShowDesiredDownpayment: PropTypes.bool.isRequired
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
    PurchaseGoalsForm._scrollToTop();
    return onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      reset,
      invalid,
      onCancel,
      submitting,
      handleSubmit,
      shouldShowDesiredDownpayment
    } = this.props;

    const { _cms } = PurchaseGoalsForm;

    return (
      <Form className="lc-purchase-goals-form" onSubmit={handleSubmit(::this._onSubmit)}>
        {/* <!--ROW 1--> */}
        <div className="lc-row row lc-purchase-goals-form__row">
          {/* <!--Priority--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.priority}
                   component={SelectGroup}
                   label={cms['goalPriority.label']}
                   placeholder={cms['pleaseMakeSelection.placeholder']}
                   options={[defaultEmptyValueOptionGen(), ...priorityOptions]}
                   validate={[required, optionSelected]} />
          </div>
          {/* <!--Number Of Years until Purchase--> */}
          <div className="lc-column columns small-6">
            <Field name={attrs.yearsToPurchase}
                   component={InputGroup}
                   mask={fieldMasks.age}
                   hideGuide
                   label={_cms('field.yearsToPurchase.label')}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required]} />
          </div>
        </div>
        {/* <!--ROW 2--> */}
        <div className="lc-row row lc-purchase-goals-form__row">
          {/* <!--Current Price--> */}
          <div className="lc-column lc-column--left columns small-6">
            <Field name={attrs.currentPrice}
                   component={InputGroup}
                   mask={fieldMasks.currency}
                   label={_cms('field.currentPrice.label')}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
          </div>
          {/* <!--Desired Downpayment of Purchase Price--> */}
          {shouldShowDesiredDownpayment &&
            <div className="lc-column lc-column--left columns small-6">
              <Field name={attrs.desiredDownpayment}
                     component={InputGroup}
                     mask={fieldMasks.percentage}
                     label={_cms('field.desiredDownpayment.label')}
                     subtext={_cms('field.desiredDownpayment.subtext')}
                     placeholder={cms['zeroPercent.placeholder']}
                     validate={[required]} />
            </div>
          }
        </div>
        {/* <!--ROW 3--> */}
        {/* <!--Comments--> */}
        <div className={cx('lc-row row lc-purchase-goals-form__row', {
            'lc-purchase-goals-form__row--long': !shouldShowDesiredDownpayment })}>
          <div className="lc-column columns small-12 ">
            <Field name={attrs.comments}
                   component={TextArea}
                   type="text"
                   label={cms['comments.label']} />
          </div>
        </div>
        {/* <!--ROW 4--> */}
        {/* <!--Buttons -->*/}
        <div className="lc-fin-plan__buttons">
          <GenericButton className="lc-button--left lc-button--white"
                         text={cms['button.previous']}
                         onClick={() => {
                           onCancel();
                           reset();
                           PurchaseGoalsForm._scrollToTop();
                         }} />
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
  form: reduxForms.purchaseGoalsForm,
  enableReinitialize: true
})(PurchaseGoalsForm);
