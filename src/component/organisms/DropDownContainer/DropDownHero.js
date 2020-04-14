import React from 'react';

const getPercentage = (totalResponse, response) =>
  `${Number(Math.round((response * 100) / totalResponse).toFixed(2))}%`;

const readableNumber = value => Number(value).toLocaleString();

const DropDownHero = props => {
  const { Population, responses } = props.rowData;
  return (
    <div>
      <p>
        {' '}
        Population: <strong>{readableNumber(Population)}</strong>
      </p>
      <p>
        {' '}
        Responses: <strong>{readableNumber(responses)}</strong>
        {` (${getPercentage(Population, responses)} of the population)`}
      </p>
    </div>
  );
};

export default DropDownHero;
