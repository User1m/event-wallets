import React from 'react';
import styled from 'styled-components';
import './scrollbar.css';
// import FormTitleSection from "./FormTitleSection";

interface FormModalProp {
  children: JSX.Element
  soFar?: string
}
const FormModal = ({ children, soFar }: FormModalProp) => {
  return (
    <StyledHome soFar={soFar}>
      <div className="modal-body">
        {soFar && <div className="percent"></div>}
        <div className="p-4">{children}</div>
      </div>
    </StyledHome>
  );
};
export default FormModal;

interface StyledProp {
  soFar?: string
}
const StyledHome = styled.div<StyledProp>`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease all;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @keyframes modal {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .modal-body {
    background: white;
    width: 35%;
    max-height: 90%;
    border-radius: 10px;
    transition: modal 1s ease-in;
    overflow-y: auto;
  }
  .percent {
    padding: 3px;
    width: ${({ soFar }) => soFar};
    background-color: #50adf4;
  }
  @media only screen and (max-width: 1140px) {
    .modal-body {
      width: 40%;
    }
  }
  @media only screen and (max-width: 952px) {
    .modal-body {
      width: 50%;
    }
  }
  @media only screen and (max-width: 768px) {
    .modal-body {
      width: 60%;
    }
  }
  @media only screen and (max-width: 564px) {
    .modal-body {
      width: 70%;
    }
  }
  @media only screen and (max-width: 480px) {
    .modal-body {
      width: 100%;
    }
  }
`;
