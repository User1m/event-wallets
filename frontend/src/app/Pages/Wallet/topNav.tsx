import React from 'react'
import matic from '../../../static/img/matic.png'

interface PropType {
  user: string
}

function TopNav (props: PropType) {
  return (
    <div className="topNav">
      <p>{props?.user || ''}</p>
      <div className="navBtns">
        <div className="navBtn network">
          <div className="text">Network</div>
          <div className="icon">
            <img src={matic} />
          </div>
        </div>
        <div className="navBtn logout">
          <a href="/">Log Out</a>
        </div>
      </div>
    </div>
  )
}

export default TopNav
