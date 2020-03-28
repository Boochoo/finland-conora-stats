import Link from 'next/link';
import { MainContainer, GlobalStyle } from './Layout.style';
import Meta from '../../../partials/head';

const Layout = props => {
  return (
    <MainContainer>
      <Meta title={props.title} />
      <GlobalStyle />
      {props.children}
    </MainContainer>
  );
};

export default Layout;
