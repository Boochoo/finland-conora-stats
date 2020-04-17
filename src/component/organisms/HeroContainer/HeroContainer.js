import { Container } from './HeroContainer.style';
const HeroContainer = (props) => {
  return (
    <>
      <Container>
        <h1>{props.title}'s Coronavirus (CoVID-19) updates</h1>
        <div className='hero-wrapper'>
          <div>
            <p>
              Confirmed <strong> {props.confirmed}</strong>
            </p>
          </div>
          <div>
            <p>
              Recovered <strong> {props.recovered}</strong>
            </p>
          </div>
          <div>
            <p>
              Death{props.deaths > 1 ? 's' : ''}{' '}
              <strong> {props.deaths}</strong>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HeroContainer;
