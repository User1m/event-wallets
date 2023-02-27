import React from 'react';
import styled from 'styled-components';

interface Props {
  label?: string
  type?: string
  name: string
  value?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => any
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any
  error?: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  defaultValue,
  disabled,
  required = false
}: Props) => {
  return (
    <StyledInput>
      {label && (
        <label htmlFor={name} className="form-font form-label">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      <input
        data-testid="input"
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value || defaultValue || ''}
        className="form-font"
        disabled={disabled}
      />
      {error && <div className="form-error">{error}</div>}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  font-size: 1rem;
  width: 100%;
  input {
    display: inline-block;
    background: white;
    -webkit-appearance: none;
    width: 100%;
    border: none;
    border-radius: 8px;
    height: 52px;
    padding-bottom: 0rem;
    padding-left: 1rem;
    border: 0.5px solid rgba(33, 51, 79, 0.15) !important;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  /* target placeholder */
  input::-webkit-input-placeholder {
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input:disabled {
    background: rgba(0, 0, 0, 0.1);
  }

  input:active {
    border: 1px solid green !important;
  }
  input:focus {
    border: 1px solid #34a853 !important;
  }
  @media only screen and (max-width: 405px) {
    input {
      min-width: 100%;
    }
  }
  .form-error {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
  /* move placeholder up the input field when typing starts */

  /* input:not(:placeholder-shown) + label,
  input:focus  {
    transform: translateY(-1.5rem);
  } */

  /* if input not empty */

  input[value=''] ~ input::-webkit-input-placeholder {
    transform: translateY(-1rem);
  }
`;

export default Input;
