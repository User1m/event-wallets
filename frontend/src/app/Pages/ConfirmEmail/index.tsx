// import React from 'react';

// function ConfirmEmail() {
//   return (
//     <div className="confirmEmail">
//       <div className="container">
//         <a href="/">
//         Confirm Email
//         </a>
//       </div>
//     </div>
//   );
// }

// export default ConfirmEmail;

import React, { useEffect, useRef } from 'react';

function ConfirmEmail() {
  const confirmEmailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const confirmEmailTimer = setTimeout(() => {
      if (confirmEmailRef.current) {
        confirmEmailRef.current.click();
      }
    }, 5000);

    return () => clearTimeout(confirmEmailTimer);
  }, []);

  return (
    <div className="confirmEmail">
      <div className="container">
        <a href="/" ref={confirmEmailRef}>
          Go to your email to confirm your event wallet!
        </a>

        <div className="subText">
          This page will refresh in 5 seconds...
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
