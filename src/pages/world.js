import fetch from 'isomorphic-fetch';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import getConfig from 'next/config';
import { Component, useState } from 'react';

import paths from '../utils/path';
import {
  getConfirmedByCountry,
  digitSeparator,
  mapDataForCharts,
} from '../utils/utils';

import Header from '../component/organisms/Header/Header';
import HeroContainer from '../component/organisms/HeroContainer/';
import {
  ContentContainer,
  ContentWrapper,
  MenuBar,
} from '../component/organisms/HeroContainer/HeroContainer.style';
import Footer from '../component/organisms/Footer/Footer';
import Layout from '../component/organisms/Layout/Layout';
import { TableWrapper } from '../component/organisms/TableLayout/TableLayout';
import LogarithmicLinearConmponent from '../component/organisms/UI/LogarithmicLinearComponent/';
import {
  Section,
  InputWrapper,
} from '../component/organisms/UI/SectionWrapper/Section.style';

import ComposedBarLineChart from '../component/templates/Charts/ComposedBarLineChart';
import CommonLineChart from '../component/templates/Charts/CommonLineChart';
import CountriesListComponent from '../component/templates/WorldPage/CountriesListComponent';
import CountriesTableComponent from '../component/templates/WorldPage/CountriesTableComponent';

const WorldMap = dynamic(
  () => import('../component/templates/WorldMap/WorldMap'),
  {
    ssr: false,
  }
);

const World = (props) => {
  const { data, confirmedData, dailyData } = props;
  const { confirmed, deaths, recovered, lastUpdate } = data;
  const confirmedResponses = getConfirmedByCountry(confirmedData);
  const uniqueConfirmed = [...new Set(confirmedResponses)];
  const sortedConfrimed = uniqueConfirmed.sort(
    (a, b) => b.confirmed - a.confirmed
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [active, setActive] = useState({ isByConfirmed: true });
  const [sortedList, setSorted] = useState(sortedConfrimed);
  const [isLinear, setLinear] = useState(false);
  const [activeButton, setActiveButton] = useState('logarithmic');

  const worldDailyData = mapDataForCharts(dailyData);

  const source = `//github.com/mathdroid/covid-19-api`;
  const lastUpdatedAt = new Date(lastUpdate).toGMTString();

  const setSelectedFilter = (filterProp) => {
    const sorted = [...sortedList].sort(
      (a, b) => b[filterProp] - a[filterProp]
    );
    setSorted(sorted);
  };

  const sortByConfirmed = () => {
    setSelectedFilter('confirmed');
    setActive({ isByConfirmed: true });
  };

  const sortByRecovered = () => {
    setSelectedFilter('recovered');
    setActive({ isByRecovered: true });
  };

  const sortByDeaths = () => {
    setSelectedFilter('deaths');
    setActive({ isByDeaths: true });
  };

  const handlesearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchResults = !searchTerm
    ? sortedList
    : sortedList.filter((cases) =>
        cases.countryRegion.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const HeroBanner = () => (
    <HeroContainer
      title='World'
      confirmed={confirmed.value}
      recovered={recovered.value}
      deaths={deaths.value}
    />
  );

  return (
    <Layout
      title={`World's coronavirus stats`}
      desc='Coronavirus stats confirmed updates by country, recovered, deaths'
      keywords='world coronavirus, coronavirus update, coronavirus, coronavirus stats, coronavirus numbers, maailma koronavirus, koronavirus'
    >
      <MenuBar>
        <Header path={paths.home} page='Finland' />
      </MenuBar>
      <ContentWrapper>
        <ContentContainer>
          <div className='hero-mobile'>
            <HeroBanner />
          </div>
        </ContentContainer>
      </ContentWrapper>
      <WorldMap data={uniqueConfirmed} initialZoomLevel={2.5} />
      <ContentWrapper>
        <ContentContainer>
          <div className='hero-desktop'>
            <HeroBanner />
          </div>
          <LogarithmicLinearConmponent
            isActive={activeButton}
            linearLogHandler={(event) => {
              setActiveButton(event.target.id);
              setLinear(isLinear);
            }}
            buttons={['Linear', 'Logarithmic']}
          />
          <CommonLineChart
            data={worldDailyData}
            isLinear={activeButton.toLowerCase() === 'linear' ? true : false}
            xAxisName='reportDate'
            dataKey='totalConfirmed'
            dataKey1='incidentRate'
          />

          <ComposedBarLineChart
            data={worldDailyData}
            dataKey='reportDate'
            totalCases='totalConfirmed'
            casesData={[
              { title: 'Daily confirmed', amount: 'deltaConfirmed' },
              { title: 'Deaths', amount: 'totalDeaths' },
            ]}
          />
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
              <CountriesTableComponent
                tableList={[
                  {
                    name: 'Confirmed',
                    state: active.isByConfirmed,
                    clickHandler: sortByConfirmed,
                  },
                  {
                    name: 'Recovered',
                    state: active.isByRecovered,
                    clickHandler: sortByRecovered,
                  },
                  {
                    name: 'Deaths',
                    state: active.isByDeaths,
                    clickHandler: sortByDeaths,
                  },
                ]}
              />

              <CountriesListComponent searchResults={searchResults} />
            </TableWrapper>
          </Section>
          <Footer
            footerElements={[
              {
                description: `The number of reported cases for some countries might be
                  different from the local reports. The API used in this page
                  obtains data from the Center for Systems Science and Engineering
                  (CSSE) at Johns Hopkins University (JHU).`,
                author: 'Mathdroid',
                source: source,
                lastUpdate: lastUpdatedAt,
              },
            ]}
          />
        </ContentContainer>
      </ContentWrapper>
    </Layout>
  );
};

World.getInitialProps = async () => {
  const { COVID19_API, COVID19_DAILY_API } = getConfig().publicRuntimeConfig;

  const response = await fetch(COVID19_API);
  const data = await response.json();

  const fetchDets = await fetch(data.confirmed.detail);
  const confirmedData = await fetchDets.json();

  const dailyResponse = await fetch(COVID19_DAILY_API);
  const dailyData = await dailyResponse.json();

  return { data, confirmedData, dailyData };
};

export default World;
