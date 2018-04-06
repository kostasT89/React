import React from 'react';
import PropTypes from 'prop-types';
import cms from '../../config/messages';
import Title from '../Title/Title';
import Subtext from '../Subtext/Subtext';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import ResetPasswordMessage from '../ResetPasswordMessage/ResetPasswordMessage';
import './ResetPasswordGroup.scss';

const ResetPasswordGroup = ({
  error,
  currentlySending,
  onResetPasswordSubmit,
  onResetPasswordChange,
  resetPasswordFormState,
}) => (
  <div className="lc-reset-password-group">
    <div className="lc-reset-password-group__text">
      <Title title={cms['reset_password.title']}
             titleClassName="lc-reset-password-group__title" />
      <Subtext text={cms['reset_password.subtext']}
              subtextClassName="lc-reset-password-group__subtext" />
    </div>
    <ResetPasswordMessage errorMessage={error} />
    <ResetPasswordForm data={resetPasswordFormState}
                       onSubmit={onResetPasswordSubmit}
                       onChange={onResetPasswordChange}
                       currentlySending={currentlySending} />
  </div>);

ResetPasswordGroup.propTypes = {
  error: PropTypes.string,
  currentlySending: PropTypes.bool.isRequired,
  onResetPasswordSubmit: PropTypes.func.isRequired,
  onResetPasswordChange: PropTypes.func.isRequired,
  resetPasswordFormState: PropTypes.object.isRequired
};

export default ResetPasswordGroup;
