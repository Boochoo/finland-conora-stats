import { useState } from 'react';

const CountriesTableComponent = (props) => {
  return (
    <li className='header'>
      <div>
        <strong>Country</strong>
      </div>
      {props.tableList.map((table, index) => {
        return (
          <div
            role='button'
            tabIndex='0'
            className={`header__title ${table.state ? 'active' : ''}`}
            onClick={table.clickHandler}
            key={`table-${index}`}
            id={`table-${index}`}
          >
            <strong>{table.name}</strong>
          </div>
        );
      })}
    </li>
  );
};

export default CountriesTableComponent;
