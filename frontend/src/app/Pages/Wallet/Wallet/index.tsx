// import React, { useState } from 'react';
// import WalletNav from './nav';
// import Nfts from './nfts';
// import Tokens from './tokens';


// function WalletComp () {


//   return (

//     <div className="wallet">
//         <div className="main">
//             <div className="mainNav">
//                 <WalletNav></WalletNav>
//             </div>

//             <div className="divider"></div>

//             <div className="mainContainer">
//                 <Tokens></Tokens>
//                 <Nfts></Nfts>
//             </div>
//         </div>
//     </div>

//   );
// };

// export default WalletComp;

import React, { useState } from 'react';
import WalletNav from './nav';
import Nfts from './nfts';
import Tokens from './tokens';

function WalletComp() {
  const [activeTab, setActiveTab] = useState('Tokens');

  const handleTabClick = (tabName: string) => {
    setActiveTab(activeTab === tabName ? '' : tabName);
  };

  return (
    <div className="wallet">
      <div className="main">
        <div className="mainNav">
          <WalletNav onTabClick={handleTabClick}></WalletNav>
        </div>
        <div className="divider"></div>
        <div className="mainContainer">
          {activeTab === 'Tokens' && <Tokens></Tokens>}
          {activeTab === 'NFTs' && <Nfts></Nfts>}
        </div>
      </div>
    </div>
  );
}

export default WalletComp;
