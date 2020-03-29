import styled from 'styled-components';

const $creamWhite = '#f4f7f6';
const $gray = '#E0E0E0';
const $white = '#fff';
const $lightgreen = '#b5c8b8';

const theme = {
  oneCol: '100%',
  twoCols: '50% 50%',
  threeCols: '33% 33% 33%',
  fourCols: '25% 25% 25% 25%'
};
const mapTableSize = size => {
  if (!size) return;

  if (size === 1) return theme.oneCol;
  else if (size === 3) return theme.threeCols;
  else if (size === 4) return theme.fourCols;
  else return theme.twoCols;
};

export const TableWrapper = styled.ol`
  padding: 0;
  margin: 0 auto;

  text-align: center;
  @media screen and (min-width: 880px) {
  }

  li {
    display: grid;
    grid-template-columns: ${({ tableSize }) => mapTableSize(tableSize)};
    list-style-type: none;
  }
  li.header {
    position: sticky;
    top: 0;
    border-bottom: 1px solid #666;
    background-color: ${$white};
  }
  li div {
    padding: 1rem;
    text-align: center;
    border-bottom: 0.05rem solid ${$gray};
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
    font-size: 1rem;
    text-align: left;
  }

  @media (max-width: 860px) {
    width: 100%;
    li div {
      padding: 0.75rem;
    }
  }

  .header__title {
    cursor: pointer;

    &.active {
      background: ${$lightgreen};
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
