import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import {
  Map,
  TileLayer,
  Marker,
  MapControl,
  GeoJSON,
  Tooltip,
  CircleMarker,
} from 'react-leaflet';
import L from 'leaflet';

import PopUpComponent from './PopUp/PopUpComponent';

import { MapContainer } from '../../templates/Charts/MapChart/MapChart.style';
import { mapRadius } from '../../templates/Charts/MapChart/mapUtils';
import { themeColors } from '../../organisms/Layout/Layout.style';

class WorldMap extends Component {
  render() {
    const { data } = this.props;
    const isSmallerScreen = window && window.innerWidth < 880;

    return (
      <MapContainer>
        <Map
          center={
            this.props.countryCenter
              ? this.props.countryCenter
              : isSmallerScreen
              ? [36, 22]
              : [36, 12]
          }
          zoom={this.props.initialZoomLevel}
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
              position={pos.lat && pos.long ? [pos.lat, pos.long] : [-1000, 0]}
            >
              <CircleMarker
                center={pos.lat && pos.long ? [pos.lat, pos.long] : [-1000, 0]}
                opacity={1}
                fillOpacity={0.5}
                fillColor={themeColors.red}
                color={themeColors.red}
                weight={2}
                radius={mapRadius(parseInt(pos.confirmed))}
                animate={true}
                onMouseOver={(e) => e.target.openPopup()}
                onMouseOut={(e) => e.target.closePopup()}
              >
                <PopUpComponent
                  region={
                    pos.provinceState ? pos.provinceState : pos.countryRegion
                  }
                  confirmed={pos.confirmed}
                  recovered={pos.recovered}
                  deaths={pos.deaths}
                />
              </CircleMarker>
            </Marker>
          ))}
        </Map>
      </MapContainer>
    );
  }
}

export default WorldMap;
