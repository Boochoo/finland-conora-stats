import React, { Component, createRef } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapControl,
  GeoJSON,
  withLeaflet,
  Circle,
  Tooltip,
  CircleMarker
} from 'react-leaflet';
import L from 'leaflet';

import styled from 'styled-components';
import MapJson from '../../../utils/finland-provinces.json';

const MapContainer = styled.div`
  width: 100%;
  height: '100%';
  @media screen and (min-width: 620px) {
    width: 620px;
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
  /* .custom-popup .leaflet-popup-content-wrapper a {
    color: rgba(255, 255, 255, 0.1);
  }
  .custom-popup .leaflet-popup-tip-container {
    width: 30px;
    height: 15px;
  } */
`;

export default class MyMap extends Component {
  render() {
    const dataMarkers = Object.entries(MapJson.features);
    const confirmedCases = this.props.data.map(d => {
      return { district: d[0], cases: d[1] };
    });

    const filterByName = districtName =>
      confirmedCases.filter(cases => {
        const district =
          cases.district === 'Helsinki' ? 'Uusimaa' : cases.district;
        return district && districtName.includes(district);
      });

    const positions = jsonData =>
      jsonData.map(data => {
        const lan = data[1].properties.latitude;
        const lng = data[1].properties.longitude;
        const gn_name = data[1].properties.Maakunta;
        const distName = filterByName(gn_name);

        return {
          lan,
          lng,
          gn_name,
          cases: distName.length > 0 ? distName[0].cases : 0
        };
      });

    function getColor(feature) {
      const allConfirmed = positions(dataMarkers).map(d => {
        return {
          cases: d.cases,
          gn_name: d.gn_name
        };
      });

      const districtCases = value =>
        allConfirmed.filter(district => {
          return district.gn_name === feature && district.cases > value;
        })[0];

      return districtCases(150)
        ? '#800026'
        : districtCases(100)
        ? '#A16928'
        : districtCases(50)
        ? '#bd925a'
        : districtCases(25)
        ? '#d6bd8d'
        : districtCases(10)
        ? '#edeac2'
        : districtCases(5)
        ? '#b5c8b8'
        : districtCases(0)
        ? '#79a7ac'
        : '#fff';
    }

    function featureWithStyle(feature) {
      const district = feature.properties.Maakunta;

      return {
        fillColor: getColor(district),
        weight: 2,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    return (
      // const marker = L.marker([65.954873, 26.956424]).addTo(ma)
      <MapContainer>
        <Map
          center={[65, 25.2]}
          zoom={5.45}
          style={{
            height: '700px'
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <GeoJSON data={MapJson} style={featureWithStyle} />
          {positions(dataMarkers).map((pos, index) => (
            <Marker key={index} draggable={false} position={[pos.lan, pos.lng]}>
              <CircleMarker
                center={[pos.lan, pos.lng]}
                opacity={1}
                fillOpacity={0.75}
                fillColor='#800026'
                radius={15}
                animate={false}
                // radius={parseInt(pos.cases) * 150}
                onMouseOver={e => {
                  e.target.openPopup();
                }}
                onMouseOut={e => {
                  e.target.closePopup();
                }}
                stroke={false}
              >
                {
                  <Popup
                    minWidth={50}
                    offset={[-1, -3]}
                    className='custom-popup'
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '15px',
                          marginBottom: '20px'
                        }}
                      >
                        {pos.gn_name}
                      </span>
                    </div>
                  </Popup>
                }
                <Tooltip direction='center' permanent>
                  {console.log(pos.gn_name, pos.cases)}
                  <span>{pos.cases}</span>
                </Tooltip>
              </CircleMarker>
            </Marker>
          ))}
        </Map>
      </MapContainer>
    );
  }
}
