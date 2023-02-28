import React, { useState, useEffect } from 'react';

interface TopNotifProps {
  Text: string;
}

const TopNotif: React.FC<TopNotifProps> = ({ Text }) => {
  const removeAfter = (timeout: number) => { //, callback: () => void) => {
    const timeoutId = setTimeout(() => {
      // callback();
    }, timeout);

    setTimeout(() => {
      const bannerEl = document.querySelector('.banner');
      if (bannerEl) {
        bannerEl.classList.add('disappear');
      }
    }, timeout - 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    removeAfter(10000,);// () => setShowNotif(false));
  }, []);

  return (
    <>

        <div className="banner">
          {Text}
        </div>
  
    </>
  );
};

export default TopNotif;

