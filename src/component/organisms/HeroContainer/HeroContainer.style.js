import styled from 'styled-components';

const $gray = '#f4f7f6';
const $blue = '#0b1560';
const $green = '#2B482B';
const $red = '#762536';

export const Container = styled.div`
  display: grid;
  text-align: center;
  @media screen and (min-width: 880px) {
    display: inline-grid;
    grid-column-gap: 10px;
    grid-template-columns: 250px 250px 250px;
  }

  div {
    color: ${$gray};
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
    background-color: ${$blue};
  }

  div:nth-child(2) {
    background-color: ${$green};
  }
  div:nth-child(3) {
    background-color: ${$red};
  }
`;
