import styled from 'styled-components';
import { themeColors } from '../Layout/Layout.style';

export const Container = styled.div`
  grid-column-gap: 10px;
  background: ${themeColors.creamWhite};
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: ${themeColors.black};
    text-align: left;
  }

  div {
    margin: 0.25rem 0;
    color: ${themeColors.creamWhite};
    strong {
      font-size: 3.5rem;
    }

    p {
      display: flex;
      justify-content: center;
      flex-direction: column-reverse;
      padding: 1rem;
      margin: 0;
    }
  }

  .hero-wrapper div {
    &:nth-of-type(1) {
      background-color: ${themeColors.blue};
    }

    &:nth-of-type(2) {
      background-color: ${themeColors.green};
    }
    &:nth-of-type(3) {
      background-color: ${themeColors.red};
    }
  }
`;

export const ContentWrapper = styled.div`
  @media screen and (min-width: 880px) {
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    width: 600px;
    height: 100vh;
    max-width: 90%;
    background: ${themeColors.creamWhite};
    overflow: hidden;
    z-index: 99999;
    .hero-mobile {
      display: none;
    }
  }

  @media screen and (max-width: 880px) {
    margin: 1rem;
    .hero-desktop {
      display: none;
    }
  }

  .chart-area {
    min-width: 0;
    overflow: hidden;
  }

  .chart-container {
    display: grid;
    grid-auto-flow: column;
    min-width: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
`;

export const ContentContainer = styled.div`
  @media screen and (min-width: 880px) {
    overflow-x: scroll;
    max-height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MenuBar = styled.div`
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  background: ${themeColors.black};
  @media screen and (min-width: 880px) {
    position: fixed;
    top: 0.15rem;
    left: 603px;
    width: 8rem;
    text-align: center;
    border-radius: 50%;
    z-index: 9999;
  }

  a {
    color: ${themeColors.creamWhite};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 880px) {
    a {
      font-size: 1.24rem;
    }
  }
`;

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
