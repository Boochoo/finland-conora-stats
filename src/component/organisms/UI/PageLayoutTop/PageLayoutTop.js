import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header/Header';

import {
  ContentContainer,
  ContentWrapper,
  MenuBar,
} from '../../HeroContainer/HeroContainer.style';

const PageLayoutTop = ({ children, page, path }) => {
  return (
    <>
      <MenuBar>
        <Header path={path} page={page} />
      </MenuBar>
      <ContentWrapper>
        <ContentContainer>
          <div className='hero-mobile'>{children}</div>
        </ContentContainer>
      </ContentWrapper>
    </>
  );
};

PageLayoutTop.propTypes = {
  children: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default PageLayoutTop;
