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

const MapChartWithNoSSR = dynamic(
  () => import('../component/templates/MapChart/MapChart'),
  {
    ssr: false
  }
);

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
      path={paths.world}
      page='world'
      author='HS-Datadesk'
      source={localDataSource}
      lastUpdate={lastUpdatedAt}
    >
      <HeroContainer
        title='Finland'
        recovered={recovered.length}
        confirmed={confirmed.length}
        deaths={deaths.length}
      />

      <MapChartWithNoSSR data={sortedConfirmedByDistrict} />

      <div>
        <h2>Recovered</h2>

        {recovered.map((rec, index) => {
          const district = rec.healthCareDistrict;

          return (
            <div key={index}>
              {Object.entries(recoveredByDistrict)[index] && (
                <div>
                  <p>
                    {district}:{' '}
                    <strong>
                      {Object.entries(recoveredByDistrict)[index][1]}
                    </strong>
                  </p>
                  <i>{displayDate(rec.date).slice(0, -7)}</i>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <h2>Death :(</h2>

        {deaths.length > 0 &&
          deaths.map((rec, index) => {
            const district = rec.healthCareDistrict;

            return (
              <div key={index}>
                {Object.entries(deathsByDistrict)[index] && (
                  <div>
                    <p>
                      {district}:{' '}
                      <strong>
                        {Object.entries(deathsByDistrict)[index][1]}
                      </strong>
                    </p>
                    <i>{displayDate(rec.date).slice(0, -7)}</i>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div>
        <h2>Confirmed cases by region</h2>
        {sortedConfirmedByDistrict.map((item, index) => (
          <p key={index}>
            {item[0] && item[0] !== 'null' ? item[0] : 'Unkown'} :{' '}
            <strong> {item[1]}</strong>
          </p>
        ))}
      </div>
      <div>
        <h2>Confirmed daily total</h2>
        <LineChart data={Object.entries(confirmedByDate)} />
        {Object.entries(totalDailyCases)
          .map((item, index) => (
            <p key={index}>
              {item[0]} : <strong> {item[1]}</strong>
            </p>
          ))
          .reverse()}
      </div>
      <div>
        <h2>Confirmed cases by date and announcement time</h2>
        {sortedConfirmed
          .map((item, index) => (
            <p key={index}>
              {item[0].slice(0, -7)} : <strong> {item[1]}</strong>
            </p>
          ))
          .reverse()}
      </div>

      <div>
        <h2>Infection source by country</h2>
        {sortedConfirmedBySource.map((item, index) => (
          <p key={index}>
            {item[0]}: <strong> {item[1]}</strong>
          </p>
        ))}
      </div>
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
