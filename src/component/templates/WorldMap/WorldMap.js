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
import { themeColors } from '../../organisms/Layout/Layout.style';

const PTag = props => (
  <p
    style={{
      margin: 0,
      color: props.isTitle ? 'gray' : props.color,
      fontSize: props.isTitle ? '1.5rem' : ''
    }}
  >
    <strong>{props.popUpText}</strong>
  </p>
);

class WorldMap extends Component {
  render() {
    const { data } = this.props;
    const isSmallerScreen = window && window.innerWidth < 880;

    return (
      <MapContainer>
        <Map
          center={isSmallerScreen ? [36, 22] : [36, 12]}
          zoom={2.5}
          minZoom={2.5}
          dragging={!L.Browser.mobile}
          tap={!L.Browser.mobile}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {data.map(
            (pos, index) =>
              pos.lat &&
              pos.long && (
                <Marker
                  key={index}
                  draggable={false}
                  position={[pos.lat, pos.long]}
                >
                  <CircleMarker
                    center={[pos.lat, pos.long]}
                    opacity={1}
                    fillOpacity={0.5}
                    fillColor={themeColors.red}
                    color={themeColors.red}
                    weight={2}
                    radius={mapRadius(parseInt(pos.confirmed))}
                    animate={true}
                    onMouseOver={e => e.target.openPopup()}
                    onMouseOut={e => e.target.closePopup()}
                  >
                    <Popup
                      minWidth={50}
                      offset={[-1, -3]}
                      className='custom-popup'
                    >
                      <div
                        style={{
                          marginBottom: '0.25em'
                        }}
                      >
                        <PTag popUpText={pos.countryRegion} isTitle />
                        <PTag popUpText={`${pos.confirmed} confirmed`} />
                        <PTag
                          popUpText={`${pos.recovered} recovered`}
                          color={themeColors.green}
                        />
                        <PTag
                          popUpText={`${pos.deaths} deaths`}
                          color={themeColors.red}
                        />
                      </div>
                    </Popup>
                  </CircleMarker>
                </Marker>
              )
          )}
        </Map>
      </MapContainer>
    );
  }
}

export default WorldMap;
