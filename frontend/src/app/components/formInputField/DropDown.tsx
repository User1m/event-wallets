import React from 'react';
import styled from 'styled-components';

interface Options {
  label: string
  value: any
}

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
  label?: string
  value?: string
  options?: Options[]
  borderRadius?: string
  height?: string
  labelTop?: string
  required?: boolean
  name?: string
}

const CustomSelect = ({
  onChange,
  label,
  value,
  options,
  borderRadius,
  height,
  labelTop,
  required,
  name
}: Props) => {
  return (
    <StyledInput
      labelTop={labelTop}
      borderRadius={borderRadius}
      height={height}
      className="custom-select"
    >
      <select name={name} required={required} value={value} onChange={onChange}>
        {options && options.length > 0
          ? options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
          ))
          : []}
      </select>
      <span
        className={
          value === ''
            ? 'floating-label select-empty'
            : 'floating-label select-filled'
        }
      >
        {label}
      </span>
    </StyledInput>
  );
};

export default CustomSelect;

interface StyledProp {
  borderRadius?: string
  width?: string
  height?: string
  labelTop?: string
}
const StyledInput = styled.div<StyledProp>`
  position: relative;
  select {
    border: 0.5px solid rgba(33, 51, 79, 0.15) !important;
    background: #f8f8f8;
    border-radius: ${({ borderRadius }) => borderRadius};
    display: block;
    font-size: 16px;
    padding: 1rem;
    width: 100%;
    height: ${({ height }) => height || '3.5rem;'};
  }
  .select-emtpy {
    pointer-events: none;
    top: ${({ labelTop }) => labelTop || '1rem'};
    transition: 0.2s ease all;
  }
  .floating-label {
    position: absolute;
    left: 1.5rem;
    bottom: 1rem;
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #717171;
    transition: 0.2s ease all;
  }
  .select-filled {
    top: -0.2rem;
    font-size: 0.9rem;
    transition: 0.2s ease all;
  }
`;
