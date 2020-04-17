import styled from 'styled-components';

import { themeColors } from '../../organisms/Layout/Layout.style';

const Section = styled.section`
  margin-top: 2.5rem;

  .header {
    top: 14% !important;
  }

  ol li div:nth-of-type(1),
  ul li div:nth-of-type(1) {
    font-size: 1.2rem;
    font-weight: 800;
  }

  @media (max-width: 860px) {
    width: 100%;

    ol li {
      grid-template-columns: 34% 33% 33%;
      grid-template-rows: auto auto;
    }

    ol li div:nth-of-type(1),
    ul li div:nth-of-type(1) {
      text-align: center;
    }

    ol li div:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: ${themeColors.creamWhite};
  padding: 1rem 0;
  label {
    display: block;
    margin-bottom: 1rem;
  }

  input,
  label {
    font-size: 1.35rem;
    cursor: pointer;
  }

  input {
    padding: 0.5rem;
    width: 100%;
    border: solid 0.1rem ${themeColors.gray};
    background-color: ${themeColors.creamWhite};
    &:focus {
      border: solid 0.125rem ${themeColors.blue};
      border-top: none;
      outline: none;
    }
  }
`;

module.exports = {
  Section,
  InputWrapper,
};
