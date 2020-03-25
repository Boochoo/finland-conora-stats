import styled from 'styled-components';

const $creamWhite = '#f4f7f6';
const $gray = '#E0E0E0';

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
  margin-bottom: 3rem;
  width: 770px;
  li {
    display: grid;
    grid-template-columns: ${({ tableSize }) => mapTableSize(tableSize)};
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
    font-size: 1rem;
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
