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
import L from 'leaflet';
import { MapContainer } from '../MapChart/MapChart.style';
import { mapRadius } from '../MapChart/mapUtils';

const $red = '#762536';

class WorldMap extends Component {
  render() {
    const { data } = this.props;

    return (
      <MapContainer>
        <Map
          center={[20, -12]}
          zoom={2.5}
          minZoom={2.5}
          dragging={!L.Browser.mobile}
          tap={!L.Browser.mobile}
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
                color={$red}
                weight={2}
                radius={mapRadius(parseInt(pos.confirmed))}
                animate={true}
                onMouseOver={e => e.target.openPopup()}
                onMouseOut={e => e.target.closePopup()}
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
