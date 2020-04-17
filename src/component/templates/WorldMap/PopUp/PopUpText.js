import React from 'react';

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

export default PopUpText;
