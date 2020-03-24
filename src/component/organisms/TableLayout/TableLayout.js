import styled from 'styled-components';

const $creamWhite = '#f4f7f6';
const $gray = '#E0E0E0';
export const TableWrapper = styled.ol`
  padding: 0;
  margin-bottom: 3rem;
  li {
    display: grid;
    grid-template-columns: 34% 33% 33%;

    list-style-type: none;
  }
  li.header {
    position: sticky;
    top: 0;
    background-color: #fff;
    border-bottom: 1px solid #666;
  }
  li div {
    text-align: left;
    padding: 1rem;
  }

  ul {
    padding: 0;
  }

  ul li:nth-child(even) {
    background: ${$gray};
  }
  ul li:nth-child(odd) {
    background: ${$creamWhite};
  }

  li div:nth-of-type(1),
  ul li div:nth-of-type(1) {
    font-size: 1.24rem;
  }

  @media (max-width: 672px) {
    li {
      grid-template-columns: 34% 33% 33%;
      grid-template-rows: auto auto;
    }

    li div:nth-of-type(1),
    ul li div:nth-of-type(1) {
      margin-top: 0.5rem;
    }
  }

  .header__title {
    cursor: pointer;

    &.active {
      background: #b5c8b8;
    }
  }
`;

export const TableHeader = props => (
  <li className='header'>
    {props.headTitle.map((elem, index) => (
      <div key={index}>
        <strong>{elem}</strong>
      </div>
    ))}
  </li>
);

export const TableLayoutContainer = props => {
  return (
    <li>
      {props.tableRows.map((row, index) => (
        <div key={index}>{row}</div>
      ))}
    </li>
  );
};
