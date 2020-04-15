import React from 'react';
import styled from 'styled-components';

import { themeColors } from '../Layout/Layout.style';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 13.5rem;
  height: 2.75rem;
  line-height: 3;
  background: ${themeColors.gray};
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 0.7rem solid transparent;
    border-right: 0.7rem solid transparent;
    border-top: 0.7rem solid ${themeColors.creamWhite};
    pointer-events: none;
    cursor: pointer;
  }

  select {
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0;
    background: ${themeColors.black};
    background-image: none;

    flex: 1;
    padding: 0 0.5rem;
    cursor: pointer;
    border-radius: 0;
    font-size: 1.2rem;
    color: ${themeColors.creamWhite};
  }
`;

const DropDownContainer = (props) => {
  return (
    <Wrapper>
      <select
        name='survey'
        value={props.city}
        id='survey'
        onChange={props.handleCityChange}
      >
        {props.citiesList.map((city, index) => (
          <option value={city} key={`city-${index}`}>
            {city}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

export default DropDownContainer;
