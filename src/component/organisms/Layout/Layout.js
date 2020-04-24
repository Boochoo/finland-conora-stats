import PropTypes from 'prop-types';
import Link from 'next/link';

import { MainContainer, GlobalStyle } from './Layout.style';
import Meta from '../../../partials/head';

const Layout = ({ title, desc, keywords, children }) => {
  return (
    <MainContainer>
      <Meta title={title} desc={desc} keywords={keywords} />
      <GlobalStyle />
      {children}
    </MainContainer>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

export default Layout;
