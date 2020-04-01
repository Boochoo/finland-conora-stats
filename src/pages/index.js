import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import fetch from 'isomorphic-fetch';
import {
  CommonBarChart,
  CommonLineChart,
  BarWithLine
} from '../component/templates/Charts/Charts';
import { Section } from '../component/organisms/Layout/Layout.style';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';
import {
  ContentContainer,
  ContentWrapper,
  MenuBar
} from '../component/organisms/HeroContainer/HeroContainer.style';
import {
  getConfirmedByDistrict,
  getConfirmedBySource,
  getConfirmedByDate,
  displayDate,
  sortData,
  dailyCasesTotal,
  getChangesInTotalCases
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
  const { confirmed, deaths, recovered } = data;

  const confirmedByDistrict = getConfirmedByDistrict(confirmed);
  const recoveredByDistrict = getConfirmedByDistrict(recovered);
  const deathsByDistrict = getConfirmedByDistrict(deaths);

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

  const mapConfirmedDailys = mapDataForCharts(Object.entries(totalDailyCases));

  const mappedIncremental = getChangesInTotalCases(
    totalDailyCases,
    recoveredData,
    deathsData
  );

  const HeroBanner = () => (
    <Fragment>
      <HeroContainer
        title='Finland'
        recovered={recovered.length}
        confirmed={confirmed.length}
        deaths={deaths.length}
      />
      <h2>Total confirmed and daily cases</h2>
      <BarWithLine data={mappedIncremental} />
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
            {/* <PieRecharted data={mapSortedConfirmedByDistrict} /> */}

            {/* <CommonLineChart data={mappedIncremental} /> */}

            <div>
              <h2>Confirmed cases by district</h2>

              <CommonBarChart
                data={mapSortedConfirmedByDistrict}
                marginBottom={100}
                smallerFont
              />

              <ConfirmedByRegionTable
                headers={['Health district', 'Cases']}
                data={sortedConfirmedByDistrict}
                districts={Object.entries(recoveredByDistrict)}
              />
            </div>
            <div>
              <h2>Infection origin by country</h2>

              <CommonBarChart data={mapSortedConfirmed} marginBottom={75} />
              <CommonBottomTable
                headers={['Origin', 'Cases']}
                data={sortedConfirmedBySource.reverse()}
              />
            </div>
            <HeroBottomWrapper>
              <div>
                <h2>Recovered</h2>

                <CommonTable
                  headers={['Health district', 'Cases', 'Latest report time']}
                  data={recovered}
                  districts={Object.entries(recoveredByDistrict)}
                  parseDate={displayDate}
                />
              </div>

              <div>
                <h2>Deaths :(</h2>

                <CommonTable
                  headers={['Health district', 'Cases', 'Latest report time']}
                  data={deaths}
                  districts={Object.entries(deathsByDistrict)}
                  parseDate={displayDate}
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
            <div>
              <h2>Confirmed cases by date and announcement time</h2>
              <CommonBottomTable
                headers={['Date and time', 'Cases']}
                data={sortedConfirmed}
              />
            </div>
            <Footer
              author='HS-Datadesk'
              source={localDataSource}
              lastUpdate={lastUpdatedAt}
            />
          </ContentContainer>
        </ContentWrapper>
      </MainWrapper>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const url = `https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData`;
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
