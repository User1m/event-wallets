import React, { useState } from 'react';
import styled from 'styled-components';

interface SelectProps {
  options: string[]
  defaultLabel: string
}

export const Select = ({ options, defaultLabel }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    // console.log(value);
  };

  return (
    <>
      <StyledSelect>
        <StyledSelected open={isOpen}>
          {selectedOption || defaultLabel}
          <span onClick={toggling}>
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3378 0.838623C12.7283 0.448099 13.3615 0.448099 13.752 0.838623C14.1426 1.22915 14.1426 1.86231 13.752 2.25284L7.75203 8.25284C7.37345 8.63141 6.76386 8.64466 6.3692 8.28288L0.369198 2.78288C-0.0379212 2.40969 -0.0654237 1.77712 0.307769 1.37001C0.680961 0.962887 1.31353 0.935384 1.72065 1.30858L7.01485 6.16159L12.3378 0.838623Z"
                fill="#222222"
              />
            </svg>
          </span>
        </StyledSelected>
        {isOpen && (
          <StyledSelectListContainer>
            <StyledSelectList>
              {options.map((sortOption) => (
                <StyledSelectListItem
                  key={sortOption}
                  onClick={onOptionClicked(sortOption)}
                >
                  {sortOption}
                </StyledSelectListItem>
              ))}
            </StyledSelectList>
          </StyledSelectListContainer>
        )}
      </StyledSelect>
    </>
  );
};

interface StyledSelectProps {
  open: boolean
}
export const StyledSelect = styled.div`
  width: 100%;
  height: 40px;
  padding: 13px 15px;
  background: #eaebec;
  border-radius: 100px;
  position: relative;
`;
export const StyledSelected = styled.div`
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15); */
  font-weight: 700;
  font-size: 16px;
  line-height: 17px;
  color: #111111;
  width: 100%;
  position: relative;
  span {
    width: 35px;
    height: 36px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -5px;
    top: -11px;
    cursor: pointer;
    background-color: rgba(223, 232, 252, 0.21);

    svg {
      transform: ${({ open }: StyledSelectProps) =>
        !open ? 'rotate(0)' : 'rotate(180deg)'};
    }
  }
`;
export const StyledSelectListContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  min-width: 180px;
  width: 100%;
  z-index: 100;
`;
export const StyledSelectList = styled.ul`
  margin: 0;
  padding: 0;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 23px;
  list-style: none;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  &:first-child {
    padding-top: 0.8em;
  }
`;
export const StyledSelectListItem = styled.li`
  list-style: none;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #dfe8fc;
    cursor: pointer;
  }
`;

export default Select;
