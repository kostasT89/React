import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import cx from 'classnames';
// Local Deps
import cms from '../../../../config/messages';
import { lookupMessage } from '../../../../utils/cmsUtils';
import InputGroup from '../../../Form/InputGroup/InputGroup';
import fieldMasks from '../../../../constants/enums/fieldMasks';
import { required } from '../../../../utils/formValidationUtils';
import attrs from '../../../../constants/enums/finPlanGoalAttributes';

import './ChildFields.scss';

const keyBase = 'educationGoals';

function _cms(key) {
  return lookupMessage(keyBase, key);
}

const ChildFields = ({ index, schoolType, isRemoving, hasAnimation }) => (
  <div key={index}
       className={cx('lc-row row lc-child-fields', {
         'animated fadeIn': hasAnimation && !isRemoving })}>
    {/* <!--ROW 1--> */}
    <div>
      <div className="lc-child-fields__row">
        {/* <!--Name of Child--> */}
        <div className="lc-column columns small-6">
          <Field name={`${attrs.name}-${index}`}
                   component={InputGroup}
                   type="text"
                   label={cms['nameOfChild.label']}
                   placeholder={cms['name.placeholder']}
                   validate={[required]} />
        </div>
        {/* <!--Childs Birthday--> */}
        <div className="lc-column lc-column--right columns small-6">
          <Field name={`${attrs.birthdate}-${index}`}
                   component={InputGroup}
                   mask={fieldMasks.dateTwoDigitYear}
                   label={_cms('field.childsBirthday.label')}
                   placeholder={cms['birthdate.placeholder']}
                   validate={[required]} />
        </div>
      </div>
      {/* <!--ROW 2--> */}
      <div className="lc-row row lc-education-goals-form__row">
        {/* <!--Age of Child at Start of College--> */}
        <div className="lc-column lc-column--left columns small-6">
          <Field name={`${attrs.ageOfChildAtStartOfCollege}-${index}`}
                   component={InputGroup}
                   mask={fieldMasks.age}
                   hideGuide
                   label={`${_cms('field.ageOfChildAtStartOfCollege.label')} ${schoolType}`}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required]} />
        </div>
        {/* <!--Amount Covered--> */}
        <div className="lc-column columns small-6">
          <Field name={`${attrs.amountCovered}-${index}`}
                   component={InputGroup}
                   mask={fieldMasks.currency}
                   label={_cms('field.yearlyAmountCovered.label')}
                   subtext={_cms('field.yearlyAmountCovered.subtext')}
                   placeholder={cms['dollarSign.placeholder']}
                   validate={[required]} />
        </div>
      </div>
      {/* <!--ROW 3--> */}
      <div className="lc-row row lc-education-goals-form__row lc-years-margin-top">
        {/* <!--Years of Coverage--> */}
        <div className="lc-column columns small-6">
          <Field name={`${attrs.yearOfCoverage}-${index}`}
                   component={InputGroup}
                   mask={fieldMasks.age}
                   hideGuide
                   label={_cms('field.yearsOfCoverage.label')}
                   subtext={_cms('field.yearsOfCoverage.subtext').replace('%school%', schoolType)}
                   placeholder={cms['doubleZero.placeholder']}
                   validate={[required]} />
        </div>
      </div>
    </div>
  </div>
  );

ChildFields.propTypes = {
  index: PropTypes.number.isRequired,
  isRemoving: PropTypes.bool.isRequired,
  schoolType: PropTypes.string.isRequired,
  hasAnimation: PropTypes.bool.isRequired
};

export default ChildFields;
