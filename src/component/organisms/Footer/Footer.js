import Link from 'next/link';

const Footer = props => {
  return (
    <footer>
      <p>
        Last update: <i>{props.lastUpdate}</i>{' '}
      </p>
      Source:{' '}
      <Link href={props.source}>
        <a>{props.author}</a>
      </Link>{' '}
    </footer>
  );
};

export default Footer;
