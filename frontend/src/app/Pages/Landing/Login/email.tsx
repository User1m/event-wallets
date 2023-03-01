import React from 'react';

function Email() {
  return (
    <div className="email">
      <input type="email" placeholder="Enter Your Email"/>
      <div className="authBtn" >
        <a href="emailConf">Sign in With Email</a>
      </div>
    </div>
  );
}

export default Email;
