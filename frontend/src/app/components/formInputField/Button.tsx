import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  text?: string
  onClick?: any
  disabled?: boolean | any
  backgroundColor?: string
  borderRadius?: string
  color?: string
  loading?: boolean
  type?: 'submit' | 'button' | 'reset' | undefined
  height?: string
  fontSize?: string
  boxShadow?: string
}

const Button = ({
  loading,
  text,
  onClick,
  disabled,
  backgroundColor,
  color,
  type,
  borderRadius,
  height,
  fontSize,
  boxShadow
}: Props) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={color}
      type={type}
      onClick={onClick}
      disabled={disabled || false}
      borderRadius={borderRadius}
      height={height}
      fontSize={fontSize}
      boxShadow={boxShadow}
    >
      {loading ? (
        <ClipLoader size={20} color={'#fff'} loading={loading} />
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default Button;

interface StyledButtonProps {
  color?: string
  backgroundColor?: string
  borderRadius?: string
  height?: string
  fontSize?: string
  boxShadow?: string
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => props.backgroundColor || '#0E82F6'};
  border: 1px solid #e0e0e0;
  border-radius: 0.4rem;
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: 500;
  height: ${({ height }) => height || '3rem'};
  line-height: 1.5;
  padding: 0 1.6rem;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow};
  width: 100%;
  &:disabled {
    cursor: not-allowed;
    background: #e7e7e7;
  }
  &:hover {
    /* background-color: #393289; */
    /* color: #0E82F6; */
  }
  &:focus {
    outline: none;
  }
  &:active {
    background-color: #e0e0e0;
  }
`;
