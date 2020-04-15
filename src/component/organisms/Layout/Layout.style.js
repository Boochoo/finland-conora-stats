import styled, { createGlobalStyle } from 'styled-components';

const themeColors = {
  creamWhite: '#f4f7f6',
  blue: '#0b1560',
  green: '#2B482B',
  red: '#762536',
  white: '#fff',
  gray: '#666',
  lightGray: '#E0E0E0',
  lightRed: '#c02739',
  lightGreen: '#29c7ac',
  black: '#12181b',
  orange: '234, 98, 39',
};

const rgbaColors = {
  orange1: `rgba(${themeColors.orange}, 0.25)`,
  orange2: `rgba(${themeColors.orange}, 0.5)`,
  orange3: `rgba(${themeColors.orange}, 0.75)`,
  orange4: `rgba(${themeColors.orange}, 1)`,
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
  }
  body {
    font-family: 'Raleway', Arial, Helvetica, sans-serif;
    color: #333;
    padding: 0;
    margin: 0;
    background: ${themeColors.creamWhite}
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  footer {
    margin-top: 3rem;
    text-align: center;
  }
`;

export const MainContainer = styled.div``;
export const Container = styled.div`
  display: grid;
  display: inline-grid;
  grid-column-gap: 10px;
  grid-template-columns: 100%;
  grid-template-rows: 20%;

  div {
    color: ${themeColors.creamWhite};
    margin: 0.25rem 0;
    strong {
      font-size: 3.5rem;
    }

    p {
      margin: 0;
      padding: 1rem;
      display: flex;
      justify-content: center;
      flex-direction: column-reverse;
    }
  }

  div:nth-child(1) {
    background-color: ${themeColors.blue};
  }

  div:nth-child(2) {
    background-color: ${themeColors.green};
  }
  div:nth-child(3) {
    background-color: ${themeColors.red};
  }
`;

module.exports = {
  Container,
  MainContainer,
  GlobalStyle,
  themeColors,
  rgbaColors,
};
