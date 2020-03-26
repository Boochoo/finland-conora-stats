import dynamic from 'next/dynamic';
import fetch from 'isomorphic-fetch';
import { Section } from '../component/organisms/Layout/Layout.style';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';
import {
  getConfirmedByDistrict,
  getConfirmedBySource,
  getConfirmedByDate,
  displayDate,
  sortData,
  dailyCasesTotal
} from '../utils/utils';
import Layout from '../component/organisms/Layout/Layout';
import LineChart from '../component/templates/LineChart/LineChart';
import paths from '../utils/path';
import { CommonTable } from '../component/organisms/HomePage/CommonTable';
import {
  ConfirmedByRegionTable,
  CommonBottomTable
} from '../component/organisms/HomePage/BottomTables';
import styled from 'styled-components';

const MapChartWithNoSSR = dynamic(
  () => import('../component/templates/MapChart/MapChart'),
  {
    ssr: false
  }
);

const MainWrapper = styled.div`
  @media screen and (min-width: 670px) {
    text-align: center;
  }
`;
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

  const sortedConfirmed = Object.entries(confirmedByDate).sort(
    (a, b) => new Date(a[0]) - new Date(b[0])
  );

  const localDataSource = `//github.com/HS-Datadesk/koronavirus-avoindata`;
  const lastUpdatedAt = sortedConfirmed[sortedConfirmed.length - 1][0];

  return (
    <Layout
      title={`Finland's coronavirus stats`}
      path={paths.world}
      page='world'
      author='HS-Datadesk'
      source={localDataSource}
      lastUpdate={lastUpdatedAt}
    >
      <MainWrapper>
        <HeroTopWrapper>
          <HeroContainer
            title='Finland'
            recovered={recovered.length}
            confirmed={confirmed.length}
            deaths={deaths.length}
          />

          <MapChartWithNoSSR data={sortedConfirmedByDistrict} />
        </HeroTopWrapper>

        <HeroBottomWrapper>
          <div>
            <h2>Recovered</h2>

            <CommonTable
              headers={['District', 'Cases', 'Time']}
              data={recovered}
              districts={Object.entries(recoveredByDistrict)}
              parseDate={displayDate}
            />
          </div>

          <div>
            <h2>Death :(</h2>

            <CommonTable
              headers={['District', 'Cases', 'Time']}
              data={deaths}
              districts={Object.entries(deathsByDistrict)}
              parseDate={displayDate}
            />
          </div>
        </HeroBottomWrapper>

        <div>
          <h2>Confirmed cases by region</h2>
          <ConfirmedByRegionTable
            headers={['Region', 'Cases']}
            data={sortedConfirmedByDistrict}
            districts={Object.entries(recoveredByDistrict)}
          />
        </div>
        <div>
          <h2>Confirmed daily total</h2>
          <LineChart data={Object.entries(confirmedByDate)} />

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

        <div>
          <h2>Infection source by country</h2>

          <CommonBottomTable
            headers={['Source', 'Cases']}
            data={sortedConfirmedBySource.reverse()}
          />
        </div>
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
