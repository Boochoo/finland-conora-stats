import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';

import { themeColors } from '../../../organisms/Layout/Layout.style';
import PopUpText from './PopUpText';

const PopUpComponent = (props) => {
  return (
    <Popup minWidth={50} offset={[-1, -3]} className='custom-popup'>
      <div
        style={{
          marginBottom: '0.25em',
        }}
      >
        <PopUpText text={props.region} isTitle />
        <PopUpText text={`${props.confirmed} confirmed`} />
        <PopUpText
          text={`${props.recovered} recovered`}
          color={themeColors.green}
        />
        <PopUpText text={`${props.deaths} deaths`} color={themeColors.red} />
      </div>
    </Popup>
  );
};

PopUpComponent.propTypes = {
  region: PropTypes.string.isRequired,
  confirmed: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
};

export default PopUpComponent;
