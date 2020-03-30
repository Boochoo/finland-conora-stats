import { Component } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Tooltip,
  CircleMarker
} from 'react-leaflet';
import L from 'leaflet';
import { MapContainer } from './MapChart.style';
import MapJson from '../../../utils/finland-provinces.json';
import {
  parseMapDetails,
  getConfirmedCases,
  getColors
} from '../MapChart/mapUtils';

export default class MyMap extends Component {
  render() {
    const dataMarkers = Object.entries(MapJson.features);
    const confirmedCases = getConfirmedCases(this.props.data);

    const filterByName = districtName =>
      confirmedCases.filter(cases => {
        const district = cases.district;
        return district && districtName.includes(district);
      });

    const getPositionsData = data => parseMapDetails(data, filterByName);

    const colors = feature => getColors(feature, getPositionsData(dataMarkers));

    const featureWithStyle = feature => {
      const district = feature.properties.Maakunta;

      return {
        fillColor: colors(district),
        weight: 2,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.7
      };
    };

    const isSmallerScreen = window && window.innerWidth < 880;

    return (
      <MapContainer>
        <Map
          center={isSmallerScreen ? [65.25, 25] : [66.25, 14.5]}
          zoom={5}
          minZoom={5}
          dragging={!L.Browser.mobile}
          tap={!L.Browser.mobile}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <GeoJSON data={MapJson} style={featureWithStyle} />
          {getPositionsData(dataMarkers).map((pos, index) => (
            <Marker key={index} draggable={false} position={[pos.lan, pos.lng]}>
              <CircleMarker
                center={[pos.lan, pos.lng]}
                opacity={0.5}
                fillOpacity={1}
                fillColor='#0b1560'
                color='#d6bd8d'
                weight={5}
                radius={15}
                onMouseOver={e => e.target.openPopup()}
                onMouseOut={e => e.target.closePopup()}
              >
                {
                  <Popup
                    minWidth={50}
                    offset={[-1, -3]}
                    className='custom-popup'
                  >
                    <div>
                      <span>{pos.gn_name}</span>
                    </div>
                  </Popup>
                }
                <Tooltip direction='center' permanent>
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
