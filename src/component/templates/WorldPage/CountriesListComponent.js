import Link from 'next/link';

import { TableLayoutContainer } from '../../organisms/TableLayout/TableLayout';

const CountriesListComponent = (props) => {
  return (
    <ul>
      {props.searchResults.length > 0 &&
        props.searchResults.map((d, i) => (
          <Link
            href={`/country?id=${d.countryRegion.toLowerCase()}`}
            key={`country-${i}`}
          >
            <a>
              <TableLayoutContainer
                key={i}
                tableRows={[
                  d.countryRegion,
                  d.confirmed,
                  d.recovered,
                  d.deaths,
                ]}
              />
            </a>
          </Link>
        ))}
    </ul>
  );
};

export default CountriesListComponent;
