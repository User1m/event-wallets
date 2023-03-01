import React from 'react';
import spork from '../../../../static/img/sdnft.png';
import eth from '../../../../static/img/ethLogo.png';
import matic from '../../../../static/img/matic.webp';
import TokenCard from './tokenCard';

interface TokensDict {
  Img: JSX.Element
  Ticker: string
  Price: string
  Amount: string
  Value: string
}

const tokens: TokensDict[] =
  [
    { Img: <img src={spork} />, Ticker: '$SPORK', Price: '$0.029018', Amount: '344.82', Value: '$10.00' },
    { Img: <img src={eth} />, Ticker: '$ETH', Price: '$1,678.00', Amount: '0.00', Value: '$0.00' },
    { Img: <img src={matic} />, Ticker: '$MATIC', Price: '$1.2', Amount: '0.00', Value: '$0.00' }

  ];

function Tokens () {
  return (
    <div className="Tokens">
      {tokens.map((token) => {
        return (
          <div className="tokenCard" key={token.Ticker}>
            <TokenCard TokenImg={token.Img} Ticker={token.Ticker} Price={token.Price} Amount={token.Amount} Value={token.Value} />
          </div>
        );
      })}
    </div>
  );
}

export default Tokens;
