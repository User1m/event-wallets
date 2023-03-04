import React from 'react'
import matic from '../../../static/img/matic.png'

interface PropType {
  user: string
  setNetwork: (val: string) => void
}

const TopNav = (props: PropType) => {
  return (
    <div className="topNav">
      <p>{props?.user || ''}</p>
      <div className="navBtns">
        <div className="navBtn network">
          <div className="text">Network</div>
          <select
            name="networks"
            id="networks"
            style={{ backgroundColor: '#633ab0' }}
            onChange={(e) => {
              const network = e.target.value
              // console.log('network', network)
              props.setNetwork(network)
            }}
          >
            <option value="goerli" selected>
              Goerli
            </option>
            <option value="mumbai">Polygon</option>
            <option value="base">Base</option>
          </select>
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
