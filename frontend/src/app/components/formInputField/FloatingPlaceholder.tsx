import React from 'react';
import styled from 'styled-components';

interface Props {
  label?: string
  type?: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any
  error?: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  text?: string
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
  text
}: Props) => {
  return (
    <StyledInput>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value || defaultValue || ''}
        className="inputText"
        disabled={disabled}
      />
      <span className="floating-label">{text}</span>
      {error && <div className="form-error">{error}</div>}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  font-size: 1rem;
  width: 100%;
  position: relative;
  input {
    display: inline-block;
    background: #f8f8f8;
    -webkit-appearance: none;
    width: 100%;
    border: none;
    border-radius: 8px;
    height: 3.5rem;
    /* padding-bottom: 0rem; */
    padding-left: 1rem;
    border: 0.5px solid rgba(33, 51, 79, 0.15) !important;

    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #222222;
  }
  input:not([value='']) ~ .floating-label,
  input:focus ~ .floating-label {
    top: -0.2rem;
    font-size: 0.9rem;
    padding-left: 1rem;
  }
  .floating-label {
    position: absolute;
    pointer-events: none;
    top: 1rem;
    left: 10px;
    transition: 0.2s ease all;
    padding-left: 1rem;
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #717171;
  }

  /* target the value */

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
