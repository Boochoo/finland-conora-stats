import React from 'react';
import PropTypes from 'prop-types';

const PopUpText = (props) => {
  return (
    <p
      style={{
        margin: 0,
        color: props.isTitle ? 'gray' : props.color,
        fontSize: props.isTitle ? '1.5rem' : '',
      }}
    >
      <strong>{props.text}</strong>
    </p>
  );
};

PopUpText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopUpText;
