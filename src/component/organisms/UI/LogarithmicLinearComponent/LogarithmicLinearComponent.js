import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { themeColors } from '../../Layout/Layout.style';

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  appearance: none;
  width: 9rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: ${themeColors.black};
  color: ${themeColors.creamWhite};
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 0;
    text-decoration: underline;
  }

  &.is-active {
    background-color: ${themeColors.blue};
  }
`;

const LogarithmicLinearComponent = (props) => {
  return (
    <ButtonsWrapper>
      {props.buttons.map((name, index) => (
        <Button
          onClick={props.linearLogHandler}
          id={name.toLowerCase() === 'logarithmic' ? 'logarithmic' : 'linear'}
          className={name.toLowerCase() === props.isActive ? 'is-active' : ''}
          key={`log-linear-${index}`}
        >
          {name}
        </Button>
      ))}
    </ButtonsWrapper>
  );
};

LogarithmicLinearComponent.propTypes = {
  buttons: PropTypes.array.isRequired,
  linearLogHandler: PropTypes.func.isRequired,
  isActive: PropTypes.string,
};

export default LogarithmicLinearComponent;
