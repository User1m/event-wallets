import React from 'react';
import MainNav from './MainNav';
import TopNotif from './topNotif';
import BannerImg from './bannerImg';
import EDBannerImg from '../../../static/img/ed.png';
import WalletComp from './Wallet';
import TopNav from './topNav';

function WalletPage () {
  return (

    <>
      <TopNotif Text="👏 🎉 - Congrats! You just receieved 344.82 $SPORK for creating your Event Wallet!" />
      <TopNav />
      <BannerImg Img={<img src={EDBannerImg}/>} />
      <MainNav />
      <WalletComp />
    </>

  );
}

export default WalletPage;

