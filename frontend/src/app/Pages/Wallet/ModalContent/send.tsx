import React, { useState } from 'react';

const navItems: string[] = ['Send', 'Send All'];

function SendModal () {
  const [activeNavItem, setActiveNavItem] = useState(navItems[0]);

  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem);
  };

  return (
    <div className="sendModal">
      <div className="mainNav">
        {navItems.map((navItem) => (
          <div
            className={`navItem ${navItem === activeNavItem ? 'navItemActive' : ''}`}
            key={navItem}
            onClick={() => handleNavItemClick(navItem)}
          >
            {navItem}
          </div>
        ))}
      </div>
      <div className="divider"></div>
      {activeNavItem === navItems[0] && (
        <>
          <div className="field">
            <input type="text" name="" id="" placeholder='Address' />
          </div>
          <div className="field">
          </div>
          <div className="sendBtn">
            Send
          </div>
        </>
      )}
      {
        activeNavItem === navItems[1] && (
          <>
            <div className="field">
            </div>
            <div className="field">
            </div>
            <div className="sendBtn">
              Send
            </div>
          </>
        )
      }
    </div>
  );
}

export default SendModal;
