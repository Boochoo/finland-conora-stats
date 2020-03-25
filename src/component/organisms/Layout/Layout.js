import Link from 'next/link';
import { MainContainer, GlobalStyle } from './Layout.style';
import Meta from '../../../partials/head';

const Layout = props => {
  return (
    <MainContainer>
      <Meta title={props.title} />
      <GlobalStyle />
      <Link href={props.path}>
        <a>{`Click to see ${props.page}'s stats`}</a>
      </Link>
      {props.children}
      <footer>
        <p>
          Last update: <i>{props.lastUpdate}</i>{' '}
        </p>
        Source:{' '}
        <Link href={props.source}>
          <a>{props.author}</a>
        </Link>{' '}
      </footer>
    </MainContainer>
  );
};

export default Layout;
