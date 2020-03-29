import styled from 'styled-components';

export const MapContainer = styled.div`
  .leaflet-container {
    width: 100%;
    height: 625px;
    @media screen and (min-width: 880px) {
      height: 100vh;
    }
  }

  .leaflet-marker-icon,
  .leaflet-marker-shadow {
    display: none !important;
  }

  .leaflet-tooltip {
    background-color: transparent;
    color: #fff;
    font-weight: 800;
  }

  .custom-popup .leaflet-popup-tip,
  .leaflet-tooltip {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .custom-popup .leaflet-popup-content-wrapper {
    background: #f4f7f6;
    color: #0b1560;
    font-size: 16px;
    line-height: 24px;
    border-radius: 0px;
  }

  .leaflet-tile {
    filter: contrast(25%);
  }
`;
