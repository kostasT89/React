// Global Deps
import React, { Component } from 'react';
import {
  Form,
  reduxForm,
  formValueSelector,
} from 'redux-form';
import { connect } from 'react-redux';

// Local Deps
import cms from '../../../config/messages';
import './SuccessPageForm.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SuccessPageForm extends Component {

  render() {
    const {
      handleSubmit,
      onSubmit
    } = this.props;
    return (
      <Form
        className="lc-success-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* SUCCESS FORM */}
        <div className="lc-row row lc-success-form__row">
          <div className="lc-column columns small-12">
            <div>
              <p className="lc-success-form__blurb">{cms['finPlanSuccess.blurb']}</p>
            </div>
          </div>
        </div>
        <div className="lc-success-form__image-container" />
      </Form>
    );
  }
}

SuccessPageForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  onSubmit: React.PropTypes.func
};

const decoratedForm = reduxForm({
  form: 'successPageForm',
})(SuccessPageForm);
const selector = formValueSelector('successPageForm');
const connectedForm = connect(
  (state) => {
    const nameOnCard = selector(state, 'nameOnCard');
    const planType = selector(state, 'planType');
    return {
      nameOnCard,
      planType,
      finPlanId: state.finPlan.id,
    };
  }
)(decoratedForm);
export default connectedForm;
