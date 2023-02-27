import React from 'react';
import styled from 'styled-components';

interface Props {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  label: string
}

const CustomCheckbox: React.FC<Props> = ({ checked, onChange, label }) => (
  <CheckboxContainer>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label>{label}</label>
  </CheckboxContainer>
);

export default CustomCheckbox;

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
