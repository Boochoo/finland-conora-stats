import styled from 'styled-components';

export const MapContainer = styled.div`
  height: '100%';
  width: 100%;
  @media screen and (min-width: 880px) {
    /*  width: 770px; */
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
`;
