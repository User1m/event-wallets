import React from 'react';
import spork from '../../../../static/img/sdnft.png';
import base from '../../../../static/img/basenft.webp';
import TokenCard from './tokenCard';
import NFTCard from './nftCard';

interface NFTDict {
  Img: JSX.Element
  Name: string

}

const nfts: NFTDict[] =
  [
    { Img: <img src={spork} />, Name: 'SporkDAO' },
    { Img: <img src={base} />, Name: 'Base, Introduced' }
  ];

function Nfts () {
  return (
    <div className="nfts">
      {nfts.map((nft) => {
        return (
          <div className="nftCard" key={nft.Name}>
            <NFTCard NFTImg={nft.Img} Name={nft.Name} />
          </div>
        );
      })}
    </div>
  );
}

export default Nfts;
