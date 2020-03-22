import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { getConfirmedByContries } from '../utils/utils';

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
  @media screen and (min-width: 810px) {
    display: inline-grid;
    grid-column-gap: 10px;
    grid-template-columns: 250px 250px 250px;
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

const Section = styled.section`
  ol li {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    padding: 1rem 0;
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
  }

  ol,
  ul {
    padding: 0;
  }

  ul li:nth-child(even) {
    background: #ccc;
  }
  ul li:nth-child(odd) {
    background: #fff;
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
      grid-row-start: 2;
      grid-row-end: 2;
    }
  }
`;

const MainContainer = styled.div`
  margin: 1.5rem;
  @media screen and (min-width: 670px) {
    margin: 4.5rem;
    margin-top: 1.5rem;
  }
`;
const World = props => {
  const { data } = props;
  const [state, setstate] = useState({});
  const { confirmed, deaths, recovered } = data;
  const confirmedData = getConfirmedByContries(props.confirmedData);
  const uniqueConfirmed = [...new Set(confirmedData)];

  return (
    <MainContainer>
      <GlobalStyle />
      <Link href='/'>
        <a>Click to see Finland's stats</a>
      </Link>

      <h1>World Coronavirus (CoVID-19) stats</h1>
      <Container>
        <div>
          <p>
            Confirmed <strong> {confirmed.value}</strong>
          </p>
        </div>
        <div>
          <p>
            Recovered <strong> {recovered.value}</strong>
          </p>
        </div>
        <div>
          <p>
            Death{deaths.value > 1 ? 's' : ''} <strong> {deaths.value}</strong>
          </p>
        </div>
      </Container>

      <Section>
        <ol>
          <li className='header'>
            <div>
              <strong>Country</strong>
            </div>
            <div>
              <strong>Confirmed</strong>
            </div>
            <div>
              <strong>Recovered</strong>
            </div>
            <div>
              <strong>Deaths</strong>
            </div>
          </li>
          <ul>
            {uniqueConfirmed.length > 0 &&
              uniqueConfirmed.map((d, i) => (
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
    </MainContainer>
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
