import React from 'react';

interface TokenCardProps {
  TokenImg: JSX.Element
  Ticker: string
  Price: string
  Amount: string
  Value: string
}

function TokenCard ({ TokenImg, Ticker, Price, Amount, Value }: TokenCardProps) {
  return (
    <>
      <div className="icon">
        {TokenImg}
      </div>
      <div className="info info1">
        <div className="top">
          {Ticker}
        </div>
        <div className="btm">
          {Price}
        </div>
      </div>
      <div className="info info2">
        <div className="top">
          {Amount}
        </div>
        <div className="btm">
          {Value}
        </div>
      </div>
    </>
  );
}

export default TokenCard;
