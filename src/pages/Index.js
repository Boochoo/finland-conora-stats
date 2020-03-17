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

const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
  }
  body {
    font-family: 'Raleway', Arial, Helvetica, sans-serif;
    color: #333;
    padding: 0;
    margin: 0;
    background: #f4f7f6
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  align-items: center;
`;

const Index = ({ data }) => {
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
        <p>
          Confirmed cases:<strong> {confirmed.length}</strong>
        </p>
        <p>
          Recovered:<strong> {recovered.length}</strong>
        </p>
        <p>
          Deaths:<strong> {deaths.length}</strong>
        </p>
      </Container>

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
            {item[0]}: <strong> {item[1]}</strong>
          </p>
        ))}
      </div>
      <div>
        <h2>Confirmed by Date</h2>
        {Object.entries(confirmedByDate)
          .map((item, index) => (
            <p key={index}>
              {item[0]}: <strong> {item[1]}</strong>
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

export async function getServerSideProps() {
  const url = `https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData`;
  const response = await fetch(url);
  const data = await response.json();

  return { props: { data } };
}

export default Index;
