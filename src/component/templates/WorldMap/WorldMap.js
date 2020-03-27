import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapControl,
  GeoJSON,
  Tooltip,
  CircleMarker
} from 'react-leaflet';
import { MapContainer } from '../MapChart/MapChart.style';

const $red = '#762536';

class WorldMap extends Component {
  render() {
    const { data } = this.props;
    const mapRadius = rad => {
      if (rad > 80000) return 60;
      else if (rad > 70000) return 55;
      else if (rad > 60000) return 50;
      else if (rad > 50000) return 40;
      else if (rad > 40000) return 35;
      else if (rad > 30000) return 32.5;
      else if (rad > 20000) return 30;
      else if (rad > 10000) return 27.5;
      else if (rad > 9000) return 25;
      else if (rad > 8000) return 22.5;
      else if (rad > 5000) return 20;
      else if (rad > 2500) return 17.5;
      else if (rad > 1000) return 15;
      else if (rad > 500) return 12.5;
      else if (rad > 100) return 10;
      else if (rad > 20) return 7.5;
      else return 5;
    };
    return (
      <MapContainer style={{ width: '100%' }}>
        <Map
          center={[20, 20]}
          zoom={2.5}
          style={{
            height: '700px'
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {data.map((pos, index) => (
            <Marker
              key={index}
              draggable={false}
              position={[pos.lat, pos.long]}
            >
              <CircleMarker
                center={[pos.lat, pos.long]}
                opacity={1}
                fillOpacity={0.5}
                fillColor={$red}
                radius={mapRadius(parseInt(pos.confirmed))}
                animate={true}
                onMouseOver={e => {
                  e.target.openPopup();
                }}
                onMouseOut={e => {
                  e.target.closePopup();
                }}
                stroke={false}
              >
                <Popup minWidth={50} offset={[-1, -3]} className='custom-popup'>
                  <div
                    style={{
                      marginBottom: '0.25em'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '15px'
                      }}
                    >
                      <strong>{pos.countryRegion}</strong>
                    </span>
                    <p
                      style={{
                        margin: 0
                      }}
                    >
                      <strong>{pos.confirmed}</strong> confirmed
                    </p>
                    <p
                      style={{
                        margin: 0
                      }}
                    >
                      <strong>{pos.recovered}</strong> recovered
                    </p>
                    <p
                      style={{
                        margin: 0
                      }}
                    >
                      <strong>{pos.deaths}</strong> deaths
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            </Marker>
          ))}
        </Map>
      </MapContainer>
    );
  }
}

export default WorldMap;
