import styled from 'styled-components';
import { themeColors } from '../../organisms/Layout/Layout.style';

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
    color: ${themeColors.white};
    font-weight: 800;
  }

  .custom-popup .leaflet-popup-tip,
  .leaflet-tooltip {
    border-radius: 0;
    border: none;
    box-shadow: none;
  }

  .custom-popup .leaflet-popup-content-wrapper {
    background: ${themeColors.creamWhite};
    color: ${themeColors.blue};
    font-size: 1rem;
    line-height: 2rem;
    border-radius: 0;
  }

  .leaflet-tile {
    filter: contrast(25%);
  }
`;
