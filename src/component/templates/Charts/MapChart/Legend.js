import React, { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import L from 'leaflet';

const Legend = () => {
  const { map } = useLeaflet();

  useEffect(() => {
    const getColor = (cases) => {
      return cases > 1000
        ? '#800026'
        : cases > 500
        ? '#BD0026'
        : cases > 200
        ? '#E31A1C'
        : cases > 100
        ? '#FC4E2A'
        : cases > 50
        ? '#FD8D3C'
        : cases > 20
        ? '#FEB24C'
        : cases > 10
        ? '#FED976'
        : '#FFEDA0';
    };

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-legend');
      const cases = [0, 10, 20, 50, 100, 200, 500, 1000];

      const labels = cases.map((label, index) => {
        const from = cases[index];
        const to = cases[index + 1];
        const template = `
          <i style="background: ${getColor(from + 1)}"></i>
          ${from} ${to ? '-' + to : '+'}
        `;

        return template;
      });

      div.innerHTML = labels.join('<br>');

      return div;
    };

    legend.addTo(map);
  }, []);

  return null;
};

export default Legend;
