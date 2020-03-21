import MapJson from '../../../utils/finland-provinces.json';

const dataMarkers = Object.entries(MapJson.features);

const confirmedCases = data =>
  data.map(d => {
    return { district: d[0], cases: d[1] };
  });

const filterByName = districtName =>
  confirmedCases().filter(cases => {
    const district = cases.district === 'Helsinki' ? 'Uusimaa' : cases.district;
    return district && districtName.includes(district);
  });

const parseMapDetails = jsonData =>
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

const getColors = feature => {
  const allConfirmed = parseMapDetails(dataMarkers).map(d => {
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
    : districtCases(1)
    ? '#79a7ac'
    : '#2887a1';
};

function featureWithStyle(feature) {
  const district = feature.properties.Maakunta;

  return {
    fillColor: getColors(district),
    weight: 2,
    opacity: 1,
    dashArray: '3',
    fillOpacity: 0.7
  };
}

module.exports = {
  parseMapDetails,
  confirmedCases,
  getColors,
  featureWithStyle
};
