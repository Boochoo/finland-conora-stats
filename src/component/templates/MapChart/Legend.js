import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import { getColors } from './utils';

class Legend extends MapControl {
  createLeafletElement(props) {}
  componentDidMount() {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
            getColors(from + 1) +
            '"></i> ' +
            from +
            (to ? '&ndash;' + to : '+')
        );
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
