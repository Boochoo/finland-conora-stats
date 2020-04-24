import PropTypes from 'prop-types';
import Link from 'next/link';

import { themeColors } from '../Layout/Layout.style';

const linkToSource = (source, author) => {
  return (
    <Link href={source}>
      <a>{author}</a>
    </Link>
  );
};

const Footer = (props) => {
  return (
    <footer>
      {props.footerElements.map((el, index) => {
        const { source, author, lastUpdate, description, descSource } = el;
        return (
          <div
            style={{
              borderTop: `0.1rem solid ${themeColors.gray}`,
              marginTop: '1rem',
            }}
            key={`source-${index}`}
          >
            <p>
              {description} {descSource && linkToSource(descSource, author)}{' '}
            </p>
            {lastUpdate && (
              <p>
                Last update: <i>{lastUpdate}</i>{' '}
              </p>
            )}

            {source && <p>Source: {linkToSource(source, author)}</p>}
          </div>
        );
      })}
    </footer>
  );
};

Footer.propTypes = {
  footerElements: PropTypes.array.isRequired,
};

export default Footer;
