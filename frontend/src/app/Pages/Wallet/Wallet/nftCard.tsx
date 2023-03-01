import React from 'react';

interface NFTCardProps {
  NFTImg: JSX.Element
  Name: string
}

function NFTCard ({ NFTImg, Name }: NFTCardProps) {
  return (
    <>
      <div className="imgContainer">
        {NFTImg}
      </div>
      <div className="textContainer">
        <div className="name">
          {Name}
        </div>
      </div>
    </>
  );
}

export default NFTCard;
