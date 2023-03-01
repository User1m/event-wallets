import React from 'react'

interface NavItemProps {
  Icon: JSX.Element
  Text: string
}

function NavItem ({ Icon, Text }: NavItemProps) {
  return (
    <>
      <div className="icon">{Icon}</div>
      <div className="text">{Text}</div>
    </>
  )
}

export default NavItem
