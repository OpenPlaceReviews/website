import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ResetPwdForm from "./ResetPwdForm";

export default ({params}) => {
  const [isSuccess, setSuccess] = useState(false);

  if (isSuccess) {
    return <div className="auth-container" id="opr-app">
      <h1>Password reset</h1>
      <p>Password was reset successfully. Try to <Link to="/login">login</Link> with new password.</p>
    </div>;
  }

  return <div className="auth-container" id="opr-app">
    <h1>Reset password</h1>
    <ResetPwdForm params={params} onSuccess={() => setSuccess(true)}/>
  </div>;
}
