import React from 'react';
import LoginCard from './Login/loginCard';

function LandingPage () {
  return (

    <div className="lr-container">
    <div className="child-left">
      <div className="login">
        <LoginCard></LoginCard>
      </div>
    </div>
    <div className="child-right"></div>
  </div>

  );
}

export default LandingPage;
