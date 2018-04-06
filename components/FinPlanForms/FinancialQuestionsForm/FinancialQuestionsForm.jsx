// Global Deps
import React, { PropTypes, Component } from 'react';
import {
        Form,
        Field,
        reduxForm,
      } from 'redux-form';
// Local Deps
import Routes from '../../../constants/Routes';
import cms from '../../../../app/config/messages';
import reduxForms from '../../../config/reduxForms';
import { lookupFinPlanQuestion } from '../../../utils/cmsUtils';
import finPlanSchemaTypes from '../../../constants/enums/finPlanSchemaTypes';
import {
          ADD_MAJOR_EXPENSE_EVENT,
          ADD_MAJOR_INCOME_EVENT,
        } from '../../../constants/AppConstants';
import {
          addMajorEvent,
          updateMajorEvent,
          deleteMajorEvent,
        } from '../../../actions/finPlan/finPlanQuestions';

import { required } from '../../../utils/formValidationUtils';

import {
          idMapping,
          rowHeight,
          tableHeight,
          majorIncomeEventsColumns,
          majorExpenseEventsColumns
        } from '../../../config/finPlan/finPlanFinancialQuestions';
// Components
import TextArea from '../../Form/TextArea/TextArea';
import FinancialQuestion from './components/FinancialQuestion';
import GenericButton from '../../GenericButton/GenericButton';
import GenericNavButton from '../../GenericNavButton/GenericNavButton';
import InlineEditTable from '../../../components/Form/InlineEditTable/InlineEditTable';

const comments = 'comments';
const whyQuestion = 'whyQuestion';

class FinancialQuestionsForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    reset: PropTypes.func,
    onSubmit: PropTypes.func,
    invalid: PropTypes.any,
    submitting: PropTypes.any,
    handleSubmit: PropTypes.any,
    initialValues: PropTypes.any
  }

  static _generateQuestions({
    questions,
    clientName,
    coClientName,
    clientAnswers = {},
    coClientAnswers = {},
  }) {
    const questionConfig = {
      clientName,
      coClientName,
      clientAnswers,
      coClientAnswers
    };
    return (
      <div className="lc-financial-questions">
        {questions.map((question, idx) => (
          <FinancialQuestion key={idx}
                             question={question}
                             index={idx}
                             {...questionConfig} />
        ))}
      </div>
    );
  }

  _updateItem(data, type) {
    const { dispatch } = this.props;
    dispatch(updateMajorEvent({ ...data, type }));
  }

  _deleteItem(id, type) {
    const { dispatch } = this.props;
    dispatch(deleteMajorEvent({ id, type }));
  }

  _onSubmit = (formValues, formDispatch, formProps) => {
    const { reset, onSubmit } = this.props; reset();
    return onSubmit(formValues, formDispatch, formProps);
  }

  _addMajorEvent(type) {
    const { dispatch } = this.props;
    dispatch(addMajorEvent(type));
  }

  render() {
    const {
      invalid,
      dispatch,
      handleSubmit,
      submitting,
      initialValues: {
        questions,
        clientName,
        coClientName,
        clientAnswers,
        coClientAnswers,
        majorIncomeEvents,
        majorExpenseEvents,
      }
    } = this.props;

    const { _generateQuestions } = FinancialQuestionsForm;
    const incomeTableHeight = tableHeight(majorIncomeEvents && majorIncomeEvents.length);
    const expenseTableHeight = tableHeight(majorExpenseEvents && majorExpenseEvents.length);

    const majorIncomeEventsConfig = {
      items: majorIncomeEvents,
      containerHeight: incomeTableHeight,
      columns: majorIncomeEventsColumns,
      idMapping,
      dispatch,
      rowHeight,
      updateItem: data => this._updateItem(data, ADD_MAJOR_INCOME_EVENT),
      canEdit: true,
      onCellClick: data => this._deleteItem(data, ADD_MAJOR_INCOME_EVENT),
      allowEmpty: true,
      ignoreManualValues: true,
      schemaType: finPlanSchemaTypes.majorIncomeEvent
    };

    const majorExpenseEventsConfig = {
      items: majorExpenseEvents,
      containerHeight: expenseTableHeight,
      columns: majorExpenseEventsColumns,
      idMapping,
      rowHeight,
      dispatch,
      updateItem: data => this._updateItem(data, ADD_MAJOR_EXPENSE_EVENT),
      canEdit: true,
      onCellClick: data => this._deleteItem(data, ADD_MAJOR_EXPENSE_EVENT),
      allowEmpty: true,
      ignoreManualValues: true,
      schemaType: finPlanSchemaTypes.majorExpenseEvent
    };

    return (
      <Form className="lc-financial-questions-form"
            onSubmit={handleSubmit(this._onSubmit)}>
        {/* <!--HEADERS IF CO-CLIENT FOUND--> */}
        { coClientName && (
          <div className="lc-financial-question-form__header">
            <div className="lc-column columns small-offset-8 small-2">
              {cms.client}
            </div>
            <div className="lc-column columns small-2">
              {cms['co-client']}
            </div>
          </div>
        )}
        {/* <!--FINANCIAL QUESTIONS--> */}
        <div className="lc-financial-question-form__questions">
          {_generateQuestions({
            questions,
            clientName,
            coClientName,
            clientAnswers,
            coClientAnswers,
          })}
        </div>
        {/* <!--WHY ARE YOU HERE TEXT AREA--> */}
        <div className="lc-column columns small-10 small-offset-1">
          <Field name={whyQuestion}
                 component={TextArea}
                 label={lookupFinPlanQuestion('field.why-seek.label')}
                 placeholder={lookupFinPlanQuestion('field.why-seek.placeholder')}
                 validate={[required]} />
        </div>
        {/* <!--MAJOR EVENTS TABLES--> */}
        <div className={'lc-column columns small-10 small-offset-1' +
          ' lc-inline-table-dimensions-parent--width lc-inline-table-dimensions-parent--height'}>
          <p className="lc-financial-questions-form__question-blurb">
            {lookupFinPlanQuestion('major-events')}
          </p>
          <div className="lc-fin-plan-page__table">
            <InlineEditTable {...majorIncomeEventsConfig} />
          </div>
          <div className="lc-financial-questions-form__add-income">
            <GenericButton className="lc-button--white"
              text={lookupFinPlanQuestion('button.add-income')}
              onClick={() => this._addMajorEvent(ADD_MAJOR_INCOME_EVENT)} />
          </div>
          <div className="lc-fin-plan-page__table">
            <InlineEditTable {...majorExpenseEventsConfig} />
          </div>
          <div className="lc-financial-questions-form__add-income">
            <GenericButton
              className="lc-button--white"
              text={lookupFinPlanQuestion('button.add-expense')}
              onClick={() => {
                this._addMajorEvent(ADD_MAJOR_EXPENSE_EVENT);
              }}
            />
          </div>
        </div>
        {/* <!--COMMENTS TEXT AREA--> */}
        <div className="lc-column columns small-10 small-offset-1 lc-financial-questions-form__comments">
          <Field name={comments}
                 component={TextArea}
                 label={lookupFinPlanQuestion('field.comments.label')}
                 placeholder={lookupFinPlanQuestion('field.comments.placeholder')} />
        </div>
        {/* <!--FORM CONTROLS--> */}
        <div className="lc-fin-plan__buttons">
          <GenericNavButton className="lc-button--left lc-button--white"
                            route={Routes.finPlanBills}
                            text={cms['button.previous']} />
          <GenericButton className="lc-button--right lc-button--blue-secondary"
                         type="submit"
                         isDisabled={invalid || submitting}
                         text={cms['button.next']} />
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: reduxForms.financialQuestionsForm,
  destroyOnUnmount: false
})(FinancialQuestionsForm); // eslint-disable-line
