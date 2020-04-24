import HeroContainer from './HeroContainer';

const digitSeparator = (num) => num.toLocaleString();

const HeroBanner = (props) => {
  const { confirmed, recovered, deaths } = props;
  return (
    <HeroContainer
      title={props.title}
      casesList={[
        { title: 'Confirmed', amount: digitSeparator(confirmed) },
        { title: 'Recovered', amount: digitSeparator(recovered) },
        { title: 'Deaths', amount: digitSeparator(deaths) },
      ]}
    />
  );
};

export default HeroBanner;
