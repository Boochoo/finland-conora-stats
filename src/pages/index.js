import { Fragment, useState } from 'react';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-fetch';

import {
  CommonBarChart,
  CommonLineChart,
  BarWithLine,
  PieRecharted
} from '../component/templates/Charts/Charts';
import CityLevelData from '../component/templates/CityLevelData';
import { Section } from '../component/organisms/Layout/Layout.style';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';
import {
  ContentContainer,
  ContentWrapper,
  MenuBar,
  ButtonsWrapper,
  Button
} from '../component/organisms/HeroContainer/HeroContainer.style';
import {
  getConfirmedByDistrict,
  getConfirmedBySource,
  getConfirmedByDate,
  displayDate,
  sortData,
  dailyCasesTotal,
  getChangesInTotalCases,
  getHospitalArea,
  mapHospitalArea
} from '../utils/utils';
import Layout from '../component/organisms/Layout/Layout';
import paths from '../utils/path';
import { CommonTable } from '../component/organisms/HomePage/CommonTable';
import {
  ConfirmedByRegionTable,
  CommonBottomTable
} from '../component/organisms/HomePage/BottomTables';
import styled from 'styled-components';
import Header from '../component/organisms/Header/Header';
import Footer from '../component/organisms/Footer/Footer';
import { themeColors } from '../component/organisms/Layout/Layout.style';

const MapChartWithNoSSR = dynamic(
  () => import('../component/templates/MapChart/MapChart'),
  {
    ssr: false
  }
);

const MainWrapper = styled.div``;
const HeroTopWrapper = styled.div``;
const HeroBottomWrapper = styled.div``;

const Index = ({ data }) => {
  if (!data) return null;
  const { confirmed, deaths, recovered } = data;

  const confirmedByDistrict = getConfirmedByDistrict(confirmed);
  const recoveredByDistrict = getConfirmedByDistrict(recovered);
  const deathsByHospitalArea = getHospitalArea(deaths);

  const confirmedBySource = getConfirmedBySource(confirmed);
  const confirmedByDate = getConfirmedByDate(confirmed);

  const sortedConfirmedByDistrict = sortData(confirmedByDistrict);
  const sortedConfirmedBySource = sortData(confirmedBySource);

  const totalDailyCases = dailyCasesTotal(Object.entries(confirmedByDate));

  const recoveredData = dailyCasesTotal(
    Object.entries(getConfirmedByDate(recovered))
  );
  const deathsData = dailyCasesTotal(
    Object.entries(getConfirmedByDate(deaths))
  );

  const sortedConfirmed = Object.entries(confirmedByDate).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  const localDataSource = `//github.com/HS-Datadesk/koronavirus-avoindata`;
  const lastUpdatedAt = sortedConfirmed[sortedConfirmed.length - 1][0];
  const mapDataForCharts = data =>
    data.map(item => {
      return { name: item[0], cases: item[1] };
    });

  const mapSortedConfirmed = mapDataForCharts(
    sortedConfirmedBySource.reverse()
  );

  const mapSortedConfirmedByDistrict = mapDataForCharts(
    sortedConfirmedByDistrict.reverse()
  );

  const mappedIncremental = getChangesInTotalCases(
    totalDailyCases,
    recoveredData,
    deathsData
  );

  const [isLinear, setLinear] = useState(false);

  const HeroBanner = () => (
    <Fragment>
      <Fragment>
        <HeroContainer
          title='Finland'
          recovered={recovered.length}
          confirmed={confirmed.length}
          deaths={deaths.length}
        />
      </Fragment>
      <Fragment>
        <h2>Total confirmed and daily cases</h2>
        <div>
          <ButtonsWrapper>
            <Button
              onClick={() => {
                setLinear(true);
              }}
              className={isLinear ? 'is-active' : ''}
            >
              Linear
            </Button>
            <Button
              onClick={() => {
                setLinear(false);
              }}
              className={!isLinear ? 'is-active' : ''}
            >
              Logarithmic
            </Button>
          </ButtonsWrapper>
          <CommonLineChart data={mappedIncremental} isLinear={isLinear} />
        </div>
      </Fragment>
      <Fragment>
        <BarWithLine data={mappedIncremental} />
      </Fragment>
    </Fragment>
  );

  return (
    <Layout
      title={`Finland's coronavirus updates`}
      desc='Coronavirus stats confirmed updates by city, recovered, deaths'
      keywords='finland coronavirus, coronavirus update, coronavirus, coronavirus stats, coronavirus numbers, suomi koronavirus, koronavirus'
    >
      <MainWrapper>
        <HeroTopWrapper>
          <MenuBar>
            <Header path={paths.world} page='world' />
          </MenuBar>
          <ContentWrapper>
            <ContentContainer>
              <div className='hero-mobile'>
                <HeroBanner />
              </div>
            </ContentContainer>
          </ContentWrapper>
        </HeroTopWrapper>
        <MapChartWithNoSSR data={sortedConfirmedByDistrict} />
        <ContentWrapper>
          <ContentContainer>
            <div className='hero-desktop'>
              <HeroBanner />
            </div>

            <div>
              <h2>Confirmed cases by health care district</h2>

              <CommonBarChart
                data={mapSortedConfirmedByDistrict}
                marginBottom={100}
                smallerFont
                fillColor={themeColors.lightRed}
              />
            </div>

            <Fragment>
              <h2>
                Coronavirus symptoms survey collected by Symptomradar(Oiretutka){' '}
              </h2>
              <CityLevelData />
            </Fragment>

            <HeroBottomWrapper>
              <div>
                <h2>Recovered</h2>

                <PieRecharted
                  data={mapDataForCharts(Object.entries(recoveredByDistrict))}
                  width='100%'
                />

                <CommonTable
                  headers={['Health care district', 'Cases']}
                  data={recovered}
                  districts={Object.entries(recoveredByDistrict)}
                />
              </div>

              <div>
                <h2>Deaths :(</h2>

                <PieRecharted
                  data={mapDataForCharts(Object.entries(deathsByHospitalArea))}
                  width='100%'
                  isDeathCasesChart
                />

                <CommonTable
                  headers={['Health care area', 'Cases']}
                  data={deaths}
                  districts={Object.entries(deathsByHospitalArea)}
                />
              </div>
            </HeroBottomWrapper>
            <div>
              <h2>Confirmed daily total</h2>
              <CommonBottomTable
                headers={['Date', 'Cases']}
                data={Object.entries(totalDailyCases)}
              />
            </div>
            <Footer
              footerElements={[
                {
                  description: `The Coronanavirus updates in this page are obtained from Helsinki Sanomat's API, which collects it from THL's published reports.`,
                  author: 'HS-Datadesk',
                  source: localDataSource,
                  lastUpdate: lastUpdatedAt
                },
                {
                  description: `Symptomradar (Oiretutka) crowdsources coronavirus symptoms from news media audience`,
                  author: 'Futurice and Helsinki Sanomat',
                  source: `//github.com/futurice/symptomradar`,
                  lastUpdate: ''
                }
              ]}
            />
          </ContentContainer>
        </ContentWrapper>
      </MainWrapper>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const url = `https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2`;
    const response = await fetch(url);
    const data = await response.json();
    const hasError = response.status !== 200;

    if (hasError) throw Error(data.message);

    return { props: { data } };
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
}

export default Index;
