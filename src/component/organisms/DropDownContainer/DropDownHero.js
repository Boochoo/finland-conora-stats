import React from 'react';
import PropTypes from 'prop-types';

const getPercentage = (totalResponse, response) =>
  `${Number(Math.round((response * 100) / totalResponse).toFixed(2))}%`;

const readableNumber = (value) => Number(value).toLocaleString();

const DropDownHero = (props) => {
  const { population, responses } = props.rowData;
  return (
    <div>
      <p>
        {' '}
        Population: <strong>{readableNumber(population)}</strong>
      </p>
      <p>
        {' '}
        Responses: <strong>{readableNumber(responses)}</strong>
        {` (${getPercentage(population, responses)} of the population)`}
      </p>
    </div>
  );
};

DropDownHero.propTypes = {
  rowData: PropTypes.object.isRequired,
};

export default DropDownHero;
