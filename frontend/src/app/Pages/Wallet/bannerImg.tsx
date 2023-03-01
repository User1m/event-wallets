import React from 'react';

interface Props {
  Img: JSX.Element
}

function BannerImg ({ Img }: Props) {
  return (
    <div className='bannerImg'>

        {Img}

    </div>
  );
};

export default BannerImg;
