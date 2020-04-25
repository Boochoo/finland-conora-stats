import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { InputWrapper } from '../../../organisms/UI/SectionWrapper/Section.style';

const SearchComponent = ({
  handlesearch,
  searchTerm,
  isByConfirmed,
  isByRecovered,
}) => {
  return (
    <Fragment>
      <InputWrapper>
        <label htmlFor='search-input'>Search by country name</label>

        <input
          id='search-input'
          type='text'
          onChange={handlesearch}
          value={searchTerm}
        />
      </InputWrapper>

      <p>
        Currently sorted by:{' '}
        <strong>{`${
          isByConfirmed ? 'confirmed' : isByRecovered ? 'recovered' : 'death'
        } cases`}</strong>
      </p>
    </Fragment>
  );
};

SearchComponent.propTypes = {
  handlesearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  isByConfirmed: PropTypes.bool,
  isByRecovered: PropTypes.bool,
};

export default SearchComponent;
