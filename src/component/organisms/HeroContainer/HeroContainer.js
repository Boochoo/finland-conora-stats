import PropTypes from 'prop-types';

import { Container } from './HeroContainer.style';

const HeroContainer = (props) => {
  return (
    <>
      <Container>
        <h1>{props.title}'s Coronavirus (CoVID-19) updates</h1>
        <div className='hero-wrapper'>
          {props.casesList &&
            props.casesList.map((cases, index) => (
              <div key={`case-list-${index}`}>
                <p>
                  {cases.title} <strong> {cases.amount}</strong>
                </p>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

HeroContainer.propTypes = {
  title: PropTypes.string.isRequired,
  casesList: PropTypes.array.isRequired,
};

export default HeroContainer;
