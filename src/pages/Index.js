import dynamic from 'next/dynamic';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import styled, { createGlobalStyle } from 'styled-components';
import {
  getConfirmedByDistrict,
  getConfirmedBySource,
  getConfirmedByDate,
  displayDate,
  sortData,
  dailyCasesTotal
} from '../utils/utils';
import LineChart from '../component/templates/LineChart/LineChart';
import Meta from '../partials/head';
import paths from '../utils/path';

const MapChartWithNoSSR = dynamic(
  () => import('../component/templates/MapChart/MapChart'),
  {
    ssr: false
  }
);

const $gray = '#f4f7f6';
const $blue = '#0b1560';
const $green = '#2B482B';
const $red = '#762536';

const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
  }
  body {
    font-family: 'Raleway', Arial, Helvetica, sans-serif;
    color: #333;
    padding: 0;
    margin: 0;
    background: ${$gray}
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const MainContainer = styled.div`
  margin: 1.5rem;
  @media screen and (min-width: 670px) {
    margin: 4.5rem;
    margin-top: 1.5rem;
  }
`;
const Container = styled.div`
  display: grid;
  text-align: center;
  @media screen and (min-width: 670px) {
    display: inline-grid;
    grid-column-gap: 10px;
    grid-template-columns: 200px 200px 200px;
  }

  div {
    color: ${$gray};
    margin: 0.25rem 0;
    strong {
      font-size: 3.5rem;
    }

    p {
      margin: 0;
      padding: 1rem;
      display: flex;
      justify-content: center;
      flex-direction: column-reverse;
    }
  }

  div:nth-child(1) {
    background-color: ${$blue};
  }

  div:nth-child(2) {
    background-color: ${$green};
  }
  div:nth-child(3) {
    background-color: ${$red};
  }
`;

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

  const state = {
    data: Object.values(getConfirmedByDistrict(confirmed)),
    width: 700,
    height: 500,
    id: 'root'
  };

  return (
    <MainContainer>
      <Meta />
      <GlobalStyle />
      <Link href={paths.world}>
        <a>Click to see world's stats</a>
      </Link>

      <h1>Finland Coronavirus (CoVID-19) stats</h1>
      <Container>
        <div>
          <p>
            Confirmed <strong> {confirmed.length}</strong>
          </p>
        </div>
        <div>
          <p>
            Recovered <strong> {recovered.length}</strong>
          </p>
        </div>
        <div>
          <p>
            Death{deaths.length > 1 ? 's' : ''}{' '}
            <strong> {deaths.length}</strong>
          </p>
        </div>
      </Container>

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

      <style jsx global>{``}</style>
    </MainContainer>
  );
};
function ErrorHan() {
  return <p>An error occurred on client darn it Something went wrong!!!</p>;
}

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
