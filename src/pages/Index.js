import fetch from 'isomorphic-fetch';
import { useState, useEffect } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';

import {
  getConfirmedByDistrict,
  getConfirmedBySource,
  getConfirmedByDate,
  displayDate,
  sortData
} from '../utils/utils';
import Meta from '../partials/head';
import LineChart from '../component/templates/LineChart/LineChart';
// import SearchBox from '../component/templates/MapChart/MapChart';

import dynamic from 'next/dynamic';

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
      font-size: 2.4rem;
    }

    p {
      margin: 0;
      padding: 1rem;
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
  if (!data) return <div>loading...</div>;
  const { confirmed, deaths, recovered } = data;

  const confirmedByDistrict = getConfirmedByDistrict(confirmed);
  const recoveredByDistrict = getConfirmedByDistrict(recovered);

  const confirmedBySource = getConfirmedBySource(confirmed);
  const confirmedByDate = getConfirmedByDate(confirmed);

  const sortedConfirmedByDistrict = sortData(confirmedByDistrict);
  const sortedConfirmedBySource = sortData(confirmedBySource);

  const state = {
    data: Object.values(getConfirmedByDistrict(confirmed)),
    width: 700,
    height: 500,
    id: 'root'
  };

  return (
    <div style={{ margin: '2rem' }}>
      <GlobalStyle />

      <Meta
        title='Finland coronavirus stats'
        desc='Finland coronavirus stats update'
        keywords='Finland, coronavirus, coronavirus updates, coronavirus stats'
      />

      <h1>Finland Coronavirus(CoVID-19) stats</h1>
      <Container>
        <div>
          <p>
            Confirmed:<strong> {confirmed.length}</strong>
          </p>
        </div>
        <div>
          <p>
            Recovered:<strong> {recovered.length}</strong>
          </p>
        </div>
        <div>
          <p>
            Deaths:<strong> {deaths.length}</strong>
          </p>
        </div>
      </Container>

      <MapChartWithNoSSR data={sortedConfirmedByDistrict} />

      <div>
        <h2>Recovered</h2>

        {recovered.map((rec, index) => {
          const district =
            rec.healthCareDistrict === 'HUS'
              ? 'Helsinki'
              : rec.healthCareDistrict;

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
                  <i>{displayDate(rec.date)}</i>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <h2>Confirmed by cities</h2>
        {sortedConfirmedByDistrict.map((item, index) => (
          <p key={index}>
            {item[0] && item[0] !== 'null' ? item[0] : 'Unkown'} :{' '}
            <strong> {item[1]}</strong>
          </p>
        ))}
      </div>
      <div>
        <h2>Confirmed by Date</h2>
        {Object.entries(confirmedByDate)
          .map((item, index) => (
            <p key={index}>
              {item[0].slice(0, -7)} : <strong> {item[1]}</strong>
            </p>
          ))
          .reverse()}
      </div>
      <LineChart data={Object.entries(confirmedByDate)} />

      <div>
        <h2>Infection source by country</h2>
        {sortedConfirmedBySource.map((item, index) => (
          <p key={index}>
            {item[0]}: <strong> {item[1]}</strong>
          </p>
        ))}
      </div>
    </div>
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
