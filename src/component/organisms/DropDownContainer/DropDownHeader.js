import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const DropDownHeader = (props) => {
  return (
    <div>
      <h2>Coronavirus symptoms survey collected by Symptomradar(Oiretutka) </h2>

      <div>
        <p>{props.description}</p>
        <p>
          You can fill the form by heading to{' '}
          <Link href='//www.oiretutka.fi/embed/v1/index.en.html'>
            <a target='_blank'>Oiretutka.fi</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

DropDownHeader.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DropDownHeader;
