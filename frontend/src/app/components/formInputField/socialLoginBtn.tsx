import React from 'react';
import styled from 'styled-components';

interface StageOneStyleProps {
  text: string
  image: string
}

const OnboardingStageOne = ({ text, image }: StageOneStyleProps) => {
  return (
    <StageOneStyle>
      <div className="social-login">
        <img src={image} alt="google" />
        <p>{text}</p>
      </div>
    </StageOneStyle>
  );
};

export default OnboardingStageOne;

const StageOneStyle = styled.div`
  width: 100%;
  .social-login {
    height: 44px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #eaebec;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    border-radius: 22px;
    flex: none;
    /* align-self: stretch; */
    display: flex;
    justify-content: flex-start;
    padding-left: 1rem;
    gap: 15%;
    img {
      width: 20px;
    }
    p {
      margin-top: 0.8rem;
      font-family: 'Nunito Sans';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      color: #222222;
    }
  }
`;
