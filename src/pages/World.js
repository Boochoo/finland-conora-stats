import Link from 'next/link';
import fetch from 'isomorphic-fetch';
import styled, { css } from 'styled-components';

import Meta from '../partials/head';

const $gray = '#f4f7f6';
const $blue = '#0b1560';
const $green = '#2B482B';
const $red = '#762536';

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

const World = async props => {
  console.log(props);
  // const { confirmed, deaths, recovered } = props.data;
  /* const detail = data.confirmed.detail;

  console.log(detail); */
  // const fetchConfirmed = await fetch(detail);
  /* const confirmedData = await fetch(detail).json();

  const confData = Object.entries(confirmedData).map(d => {
    return {
      countryRegion: d.countryRegion,
      confirmed: d.confirmed,
      recovered: d.recovered,
      deaths: d.deaths
    };
  }); */

  return (
    <div style={{ margin: '2rem' }}>
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
            {/* Death{deaths.value > 1 ? 's' : ''} <strong> {deaths.value}</strong> */}
          </p>
        </div>
      </Container>

      {/* {confData.map(e => (
        <div>
          <h1>{e.countryRegion}</h1>
          <p>{e.confirmed}</p>
          <p>{e.recovered}</p>
          <p>{e.deaths}</p>
        </div>
      ))} */}
    </div>
  );
};
function ErrorHan() {
  return <p>An error occurred on client darn it Something went wrong!!!</p>;
}

export async function getServerSideProps() {
  try {
    const url = `https://covid19.mathdro.id/api`;
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

export default World;
