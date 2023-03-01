import React, { useState } from 'react'

interface WalletNavProps {
  onTabClick: (tabName: string) => void
}

const navItems: string[] = ['Tokens', 'NFTs']

function WalletNav (props: WalletNavProps) {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0])

  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem)
    props.onTabClick(navItem)
  }

  return (
    <>
      {navItems.map((navItem) => (
        <div
          className={`navItem ${
            navItem === activeNavItem ? 'navItemActive' : ''
          }`}
          key={navItem}
          onClick={() => handleNavItemClick(navItem)}
        >
          {navItem}
        </div>
      ))}
    </>
  )
}

export default WalletNav
