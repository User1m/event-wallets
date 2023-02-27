import React from 'react';
import styled from 'styled-components';

interface Props {
  value?: string
  name?: string
  onChange?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['onChange']
  error?: string
  placeholder?: string
  cols?: number
  rows?: number
  countCharacters?: number
  maxCharacters?: number
}

const TextAreaInput = ({
  name,
  value,
  onChange,
  error,
  placeholder,
  cols,
  rows,
  countCharacters,
  maxCharacters
}: Props) => {
  return (
    <StyledFormInputComponent>
      <textarea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={'form-font'}
        cols={cols || 35}
        rows={rows}
        maxLength={maxCharacters}
      />
      {maxCharacters && (
        <span className={'count-characters'}>
          {countCharacters}/{maxCharacters}
        </span>
      )}
      {error && <div className="form-error">{error}</div>}
    </StyledFormInputComponent>
  );
};

const StyledFormInputComponent = styled.div`
  margin-bottom: 2.4rem;
  textarea {
    display: inline-block;
    background: transparent;
    -webkit-appearance: none;
    width: 100%;
    border: none;
    border: 1px solid rgba(33, 51, 79, 0.15) !important;
    border-radius: 0.4rem;

    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    display: flex;
    align-items: center;
    color: #222222;
    padding: 16px;
  }
  textarea:active {
    border: 1px solid green !important;
  }
  textarea:focus {
    border: 1px solid green !important;
  }

  @media only screen and (max-width: 405px) {
    textarea {
      min-width: 100%;
    }
  }
  .count-characters {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #717171;
    float: right;
  }
`;

export default TextAreaInput;
