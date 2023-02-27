import React from 'react';
import styled from 'styled-components';

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  label: string
  name?: string
}

const RadioInput: React.FC<Props> = ({ value, onChange, label, name }) => (
  <CheckboxContainer>
    <input type="radio" value={value} onChange={onChange} name={name} />
    <label>{label}</label>
  </CheckboxContainer>
);

export default RadioInput;

const CheckboxContainer = styled.label`
  display: flex;
  gap: 5px;
  align-items: center;
  input {
    width: 20px;
    height: 20px;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  label {
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    color: #111111;
  }
`;
