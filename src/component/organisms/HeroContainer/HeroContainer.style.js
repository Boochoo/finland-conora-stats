import styled from 'styled-components';

const $blue = '#0b1560';
const $green = '#2B482B';
const $red = '#762536';
const $creamWhite = '#f4f7f6';

export const Container = styled.div`
  grid-column-gap: 10px;
  background: ${$creamWhite};
  text-align: center;

  h1 {
    color: #333;
    text-align: left;
  }

  div {
    margin: 0.25rem 0;
    color: ${$creamWhite};
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
      background-color: ${$blue};
    }

    &:nth-of-type(2) {
      background-color: ${$green};
    }
    &:nth-of-type(3) {
      background-color: ${$red};
    }
  }
`;

export const ContentWrapper = styled.div`
  @media screen and (min-width: 880px) {
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    width: 500px;
    height: 100vh;
    max-width: 90%;
    background: ${$creamWhite};
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
  background: #333;
  @media screen and (min-width: 880px) {
    position: fixed;
    top: 0;
    left: 501px;
    width: 8rem;
    text-align: center;
    border-radius: 50%;
    z-index: 9999;
  }

  a {
    color: ${$creamWhite};
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
