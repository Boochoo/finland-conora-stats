import PropTypes from 'prop-types';
import Link from 'next/link';

const Header = (props) => {
  return (
    <Link href={props.path}>
      <a>{`Click to see ${props.page}'s stats`}</a>
    </Link>
  );
};

Header.propTypes = {
  path: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Header;
