// Global Deps
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'redux-form';
// Local Deps:
import { lookupFinPlanQuestion } from '../../../../utils/cmsUtils';
import { isFinPlanQuestionChecked } from '../../../../utils/finPlan/finPlanQuestionUtils';
import {
    finPlanQuestionTypes,
    defaultEmptyValueOptionGen
  } from '../../../../config/formFieldOptions';
import { required, optionSelected } from '../../../../utils/formValidationUtils';
// Components
import SelectGroup from '../../../Form/SelectGroup/SelectGroup';

const FinancialPlanQuestion = ({
  question,
  index,
  clientAnswers,
  coClientName,
  coClientAnswers,
}) => {
  const isChecked = isFinPlanQuestionChecked(
    index,
    clientAnswers,
    coClientName,
    coClientAnswers
  );
  return (
    <div className="lc-financial-question"
         key={question.name}>
      <div className="lc-column columns small-1">
        <div className={cx(
          'lc-financial-question__check-mark',
          { 'lc-financial-question__check-mark--is-checked': isChecked }
        )}>
          {index + 1}
        </div>
      </div>
      <div className="lc-column columns small-7">
        <p className="lc-financial-question__text">
          {lookupFinPlanQuestion(`q${index + 1}`)}
        </p>
      </div>
      {
        coClientName ? (
          <div>
            <div className="lc-column columns small-5">
              <Field name={`clientAnswers.response${index + 1}`}
                      component={SelectGroup}
                      options={[defaultEmptyValueOptionGen(), ...finPlanQuestionTypes]}
                      validate={[optionSelected, required]} />
            </div>
            <div className="lc-column columns small-5 small-offset-1">
              <Field name={`coClientAnswers.response${index + 1}`}
                      component={SelectGroup}
                      options={[defaultEmptyValueOptionGen(), ...finPlanQuestionTypes]}
                      validate={[optionSelected, required]} />
            </div>
          </div>
        ) : (
          <div className="lc-column columns small-4">
            <Field name={`clientAnswers.response${index + 1}`}
                    component={SelectGroup}
                    options={[defaultEmptyValueOptionGen(), ...finPlanQuestionTypes]}
                    validate={[optionSelected, required]} />
          </div>
        )

      }
    </div>
  );
};

FinancialPlanQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  coClientName: PropTypes.string,
  coClientAnswers: PropTypes.object.isRequired,
  clientAnswers: PropTypes.object.isRequired
};

export default FinancialPlanQuestion;
