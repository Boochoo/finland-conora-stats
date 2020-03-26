import { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { getConfirmedByCountry } from '../utils/utils';
import Layout from '../component/organisms/Layout/Layout';
import paths from '../utils/path';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';
import {
  TableWrapper,
  TableLayoutContainer
} from '../component/organisms/TableLayout/TableLayout';

import dynamic from 'next/dynamic';

const WorldMap = dynamic(
  () => import('../component/templates/WorldMap/WorldMap'),
  {
    ssr: false
  }
);

const $creamWhite = '#f4f7f6';
const $gray = '#E0E0E0';
const $blue = '#0b1560';
const Section = styled.section`
  margin-top: 2.5rem;
  /* width: 770px; */

  ol li div:nth-of-type(1),
  ul li div:nth-of-type(1) {
    font-size: 1.2rem;
    font-weight: 800;
  }

  @media (max-width: 860px) {
    width: 100%;

    ol li {
      grid-template-columns: 34% 33% 33%;
      grid-template-rows: auto auto;
    }

    ol li div:nth-of-type(1),
    ul li div:nth-of-type(1) {
      text-align: center;
    }

    ol li div:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 2;
    }
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 2rem;
  label {
    display: block;
    margin-bottom: 1rem;
  }

  input,
  label {
    font-size: 1.35rem;
    cursor: pointer;
  }

  input {
    padding: 0.5rem;
    width: 300px;
    border: solid 0.1rem ${$gray};
    background-color: ${$creamWhite};
    margin: 0.1rem;
    &:focus {
      border: solid 0.125rem ${$blue};
      border-top: none;
      outline: none;
    }
  }

  @media (max-width: 860px) {
    input {
      width: 100%;
    }
  }
`;

const MainWrapper = styled.div`
  @media screen and (min-width: 670px) {
    text-align: center;
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
  const [searchTerm, setSearchTerm] = useState('');
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

  const handlesearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchResults = !searchTerm
    ? sortedList
    : sortedList.filter(cases =>
        cases.countryRegion.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Layout
      title={`World's coronavirus stats`}
      path={paths.home}
      page='Finland'
      source={source}
      author='Mathdroid'
      lastUpdate={lastUpdatedAt}
    >
      <MainWrapper>
        <HeroContainer
          title='World'
          confirmed={confirmed.value}
          recovered={recovered.value}
          deaths={deaths.value}
        />

        <WorldMap data={uniqueConfirmed} />

        <Section>
          <InputWrapper>
            <label htmlFor='search-input'>Search by country name</label>

            <input
              id='search-input'
              type='text'
              onChange={handlesearch}
              value={searchTerm}
            />
          </InputWrapper>
          <p>
            You can sort the table by clicking on the table's sub headers,
            except the country sub header.
          </p>
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
          <TableWrapper tableSize={4}>
            <li className='header'>
              <div>
                <strong>Country</strong>
              </div>
              <div
                role='button'
                tabIndex='0'
                className={`header__title ${
                  active.isByConfirmed ? 'active' : ''
                }`}
                onClick={sortByConfirmed}
              >
                <strong>Confirmed</strong>
              </div>
              <div
                role='button'
                tabIndex='0'
                className={`header__title ${
                  active.isByRecovered ? 'active' : ''
                }`}
                onClick={sortByRecovered}
              >
                <strong>Recovered</strong>
              </div>
              <div
                role='button'
                tabIndex='0'
                className={`header__title ${active.isByDeaths ? 'active' : ''}`}
                onClick={sortByDeaths}
              >
                <strong>Deaths</strong>
              </div>
            </li>
            <ul>
              {searchResults.length > 0 &&
                searchResults.map((d, i) => (
                  <TableLayoutContainer
                    key={i}
                    tableRows={[
                      d.countryRegion,
                      d.confirmed,
                      d.recovered,
                      d.deaths
                    ]}
                  />
                ))}
            </ul>
          </TableWrapper>
        </Section>
      </MainWrapper>
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
