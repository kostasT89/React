import React from 'react';
import PropTypes from 'prop-types';
import cms from '../../config/messages';
import Title from '../Title/Title';
import Subtext from '../Subtext/Subtext';
import SignupForm from '../SignupForm/SignupForm';
import './SignupGroup.scss';

const SignupGroup = ({
  toggleTOC,
  acceptedTOC,
  onSignupSubmit,
  onSignupChange,
  verifyCallback,
  signupFormState,
  recaptchaLoaded,
  recaptchaAccepted,
  signupCurrentlySending,
  onRecaptchaLoadCallback
}) => (
  <div className="lc-signup-group">
    <div className="lc-signup-group__text">
      <Title title={cms['signup.title']}
             titleClassName="lc-signup-group__title" />
      <Subtext text={cms['signup.subtext']}
               subtextClassName="lc-signup-group__subtext" />
    </div>
    <SignupForm data={signupFormState}
                onSubmit={onSignupSubmit}
                onChange={onSignupChange}
                toggleTOC={toggleTOC}
                acceptedTOC={acceptedTOC}
                verifyCallback={verifyCallback}
                recaptchaLoaded={recaptchaLoaded}
                recaptchaAccepted={recaptchaAccepted}
                currentlySending={signupCurrentlySending}
                onRecaptchaLoadCallback={onRecaptchaLoadCallback} />
  </div>
);

SignupGroup.propTypes = {
  toggleTOC: PropTypes.func.isRequired,
  acceptedTOC: PropTypes.bool.isRequired,
  onSignupSubmit: PropTypes.func.isRequired,
  onSignupChange: PropTypes.func.isRequired,
  verifyCallback: PropTypes.func.isRequired,
  recaptchaLoaded: PropTypes.bool.isRequired,
  signupFormState: PropTypes.object.isRequired,
  recaptchaAccepted: PropTypes.bool.isRequired,
  signupCurrentlySending: PropTypes.bool.isRequired,
  onRecaptchaLoadCallback: PropTypes.func.isRequired,
};

export default SignupGroup;
