import React from 'react';
import styled from 'styled-components';

interface Props {
  label?: string
  type?: string
  name?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => any
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any
  error?: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  text?: string
  src?: string
  increment?: any
  decrement?: any
  value?: any
}

const Input = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  defaultValue,
  disabled,
  text,
  src,
  increment,
  decrement
}: Props) => {
  return (
    <StyledInput>
      <img
        onClick={decrement}
        className="minus"
        src="/images/minus-a.svg"
        alt="minus"
      />
      <div className="input-wrapper">
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className="inputText"
          disabled={disabled}
        />
        <label className="text">{text}</label>
      </div>
      <img
        onClick={increment}
        className="plus"
        src="/images/increment.svg"
        alt="plus"
      />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 0.5px solid rgba(33, 51, 79, 0.15) !important;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 0px 12px;
  .input-wrapper {
    position: relative;
  }
  input {
    background: white;
    -webkit-appearance: none;
    border: none;
    outline: none;
    border-radius: 8px;
    height: 3.5rem;
    background: #f8f8f8;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #222222;
    text-align: center;
  }
  .text {
    position: absolute;
    top: 60%;
    left: 25%;
    width: 100%;
    /* transform: translate(-50%, -50%); */
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 18px;
    color: #717171;
  }
  @media only screen and (max-width: 500px) {
    input {
      min-width: 100%;
    }
  }
  .form-error {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
`;

export default Input;
