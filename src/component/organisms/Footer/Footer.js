import Link from 'next/link';

import { themeColors } from '../Layout/Layout.style';

const Footer = props => {
  return (
    <footer>
      {props.footerElements.map((el, index) => (
        <div
          style={{
            borderTop: `0.1rem solid ${themeColors.gray}`,
            marginTop: '1rem'
          }}
          key={`source-${index}`}
        >
          <p>{el.description}</p>
          {el.lastUpdate && (
            <p>
              Last update: <i>{el.lastUpdate}</i>{' '}
            </p>
          )}
          Source:{' '}
          <Link href={el.source}>
            <a>{el.author}</a>
          </Link>{' '}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
