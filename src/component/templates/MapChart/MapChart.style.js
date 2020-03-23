import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: '100%';
  @media screen and (min-width: 880px) {
    width: 770px;
  }

  .leaflet-marker-icon,
  .leaflet-marker-shadow {
    display: none !important;
  }

  .leaflet-tooltip {
    background-color: transparent;
    color: #fff;
  }

  .custom-popup .leaflet-popup-tip,
  .leaflet-tooltip {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .custom-popup .leaflet-popup-content-wrapper {
    background: #f4f7f6;
    color: #800026;
    font-size: 16px;
    line-height: 24px;
    border-radius: 0px;
  }
`;
