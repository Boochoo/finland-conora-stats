import { Component, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { getConfirmedByCountry } from '../utils/utils';
import Layout from '../component/organisms/Layout/Layout';
import paths from '../utils/path';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';

const $creamWhite = '#f4f7f6';
const $gray = '#E0E0E0';
const Section = styled.section`
  margin-top: 2.5rem;
  ol li {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;

    list-style-type: none;
  }
  ol li.header {
    position: sticky;
    top: 0;
    background-color: #fff;
    border-bottom: 1px solid #666;
  }
  ol li div {
    text-align: center;
    padding: 1rem 0;
  }

  ol,
  ul {
    padding: 0;
  }

  ul li:nth-child(even) {
    background: ${$gray};
  }
  ul li:nth-child(odd) {
    background: ${$creamWhite};
  }

  ol li div:nth-of-type(1),
  ul li div:nth-of-type(1) {
    font-size: 1.24rem;
  }

  @media (max-width: 672px) {
    ol li {
      grid-template-columns: 34% 33% 33%;
      grid-template-rows: auto auto;
    }

    ol li div:nth-of-type(1),
    ul li div:nth-of-type(1) {
      margin-top: 0.5rem;
    }

    ol li div:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }

  .header__title {
    cursor: pointer;

    &.active {
      background: #b5c8b8;
    }
  }
`;

const World = props => {
  const { data, confirmedData } = props;
  const { confirmed, deaths, recovered, lastUpdate } = data;
  const confirmedResponses = getConfirmedByCountry(confirmedData);
  const uniqueConfirmed = [...new Set(confirmedResponses)];

  const sortedConfrimed = uniqueConfirmed.sort(
    (a, b) => b.confirmed - a.confirmed
  );
  const [sortedList, setSorted] = useState(sortedConfrimed);
  const [active, setActive] = useState({ isByConfirmed: true });

  const source = `//github.com/mathdroid/covid-19-api`;
  const lastUpdatedAt = new Date(lastUpdate).toGMTString();

  const sortByConfirmed = () => {
    const sorted = [...sortedList].sort((a, b) => b.confirmed - a.confirmed);
    setSorted(sorted);
    setActive({ isByConfirmed: true });
  };

  const sortByRecovered = e => {
    const sorted = [...sortedList].sort((a, b) => b.recovered - a.recovered);
    setSorted(sorted);
    setActive({ isByRecovered: true });
  };

  const sortByDeaths = () => {
    const sorted = [...sortedList].sort((a, b) => b.deaths - a.deaths);
    setSorted(sorted);
    setActive({ isByDeaths: true });
  };

  return (
    <Layout
      title={`World's coronavirus stats`}
      path={paths.home}
      page='Finland'
      source={source}
      author='Mathdroid'
      lastUpdate={lastUpdatedAt}
    >
      <HeroContainer
        title='World'
        confirmed={confirmed.value}
        recovered={recovered.value}
        deaths={deaths.value}
      />

      <Section>
        <h2>
          You can sort the table by clicking on the table's sub headers, except
          the country sub header.
        </h2>
        <p>
          Currently sorted by:{' '}
          <strong>{`${
            active.isByConfirmed
              ? 'confirmed'
              : active.isByRecovered
              ? 'recovered'
              : 'death'
          } cases`}</strong>
        </p>
        <ol>
          <li className='header'>
            <div>
              <strong>Country</strong>
            </div>
            <div
              className={`header__title ${
                active.isByConfirmed ? 'active' : ''
              }`}
              onClick={sortByConfirmed}
            >
              <strong>Confirmed</strong>
            </div>
            <div
              className={`header__title ${
                active.isByRecovered ? 'active' : ''
              }`}
              onClick={sortByRecovered}
            >
              <strong>Recovered</strong>
            </div>
            <div
              className={`header__title ${active.isByDeaths ? 'active' : ''}`}
              onClick={sortByDeaths}
            >
              <strong>Deaths</strong>
            </div>
          </li>
          <ul>
            {sortedList.length > 0 &&
              sortedList.map((d, i) => (
                <li key={i}>
                  <div>
                    <strong>{d.countryRegion}</strong>
                  </div>
                  <div>{d.confirmed}</div>
                  <div>{d.recovered}</div>
                  <div>{d.deaths}</div>
                </li>
              ))}
          </ul>
        </ol>
      </Section>
    </Layout>
  );
};

World.getInitialProps = async () => {
  const response = await fetch('https://covid19.mathdro.id/api');
  const data = await response.json();
  const fetchDets = await fetch(data.confirmed.detail);
  const confirmedData = await fetchDets.json();

  return { data, confirmedData };
};

export default World;
