import Link from 'next/link';

const Header = props => {
  return (
    <Link href={props.path}>
      <a>{`Click to see ${props.page}'s stats`}</a>
    </Link>
  );
};

export default Header;
