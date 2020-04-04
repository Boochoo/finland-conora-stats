import { useRouter } from 'next/router';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Layout from '../component/organisms/Layout/Layout';
import HeroContainer from '../component/organisms/HeroContainer/HeroContainer';
import {
  ContentContainer,
  ContentWrapper,
  MenuBar
} from '../component/organisms/HeroContainer/HeroContainer.style';
import Header from '../component/organisms/Header/Header';
import Footer from '../component/organisms/Footer/Footer';
import paths from '../utils/path';
import {
  getConfirmedByProvinceState,
  getConfirmedByCountry
} from '../utils/utils';

const MainWrapper = styled.div``;

const WorldMap = dynamic(
  () => import('../component/templates/WorldMap/WorldMap'),
  {
    ssr: false
  }
);

const Country = props => {
  const router = useRouter();

  const {
    confirmed,
    recovered,
    deaths,
    active,
    countryRegion,
    lat,
    long,
    lastUpdate
  } = getConfirmedByCountry(props.data)[0];

  const combinedConfirmed = getConfirmedByProvinceState(props.data);
  const uniqueConfirmed = [...new Set(combinedConfirmed)];

  const source = `//github.com/mathdroid/covid-19-api`;
  const lastUpdatedAt = new Date(lastUpdate).toGMTString();

  return (
    <Layout
      title={`${countryRegion}'s coronavirus stats`}
      desc={`${countryRegion} Coronavirus stats confirmed updates by country, recovered, deaths`}
      keywords={`${countryRegion} world coronavirus, coronavirus update, coronavirus, coronavirus stats, coronavirus numbers, ${countryRegion} coronavirus`}
    >
      <MainWrapper>
        <MenuBar>
          <Header path={paths.world} page='World' />
        </MenuBar>
        <ContentWrapper>
          <ContentContainer>
            <div className='hero-mobile'>
              <HeroContainer
                title={countryRegion}
                confirmed={confirmed}
                recovered={recovered}
                deaths={deaths}
              />
            </div>
          </ContentContainer>
        </ContentWrapper>
        <WorldMap
          data={uniqueConfirmed}
          initialZoomLevel={4}
          countryCenter={[lat, long - 45]}
        />

        <ContentWrapper>
          <ContentContainer>
            <div className='hero-desktop'>
              <HeroContainer
                title={countryRegion}
                confirmed={confirmed}
                recovered={recovered}
                deaths={deaths}
              />
            </div>
            <Footer
              description={`The number of reported cases for some countries might be
              different from the local reports. The API used in this page
              obtains data from the Center for Systems Science and Engineering
              (CSSE) at Johns Hopkins University (JHU).`}
              source={source}
              author='Mathdroid'
              lastUpdate={lastUpdatedAt}
            />
          </ContentContainer>
        </ContentWrapper>
      </MainWrapper>
    </Layout>
  );
};

Country.getInitialProps = async ({ query }) => {
  const response = await fetch(
    `https://covid19.mathdro.id/api/countries/${query.country}/confirmed`
  );
  const data = await response.json();

  return { data };
};

export default Country;
