import React from 'react';
import matic from '../../../static/img/matic.png';

function TopNav () {
  return (
    <div className="topNav">
      <div className="navBtns">

      <div className="navBtn network">
          <div className="text">
          Network
          </div>

          <div className="icon">
          <img src={matic}/>
          </div>
        </div>
        <div className="navBtn logout">

          Log Out

        </div>

      </div>
    </div>
  );
}

export default TopNav;
