import React from 'react';
import {ReactComponent as GoogleLogo} from './google.svg';
import Email from './email';

function LoginCard () {
  return (

    <div className="loginCard">
      <div className="logo">EthDenver</div>
      <div className="cta">Sign In To Access Your Wallet</div>
      <div className="authBtns">
        <div className="authBtn google">
          <div className="icon">
            <GoogleLogo />
          </div>
          <div className="text">Sign In with Google</div>
        </div>
      </div>
      <div className="divider">
        
      </div>
      <Email></Email>

  </div>

  );
}

export default LoginCard;
