import PropTypes from 'prop-types';
import Link from 'next/link';

import { MainContainer, GlobalStyle } from './Layout.style';
import Meta from '../../../partials/head';

const Layout = (props) => {
  return (
    <MainContainer>
      <Meta title={props.title} desc={props.desc} keywords={props.keywords} />
      <GlobalStyle />
      {props.children}
    </MainContainer>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Layout;
