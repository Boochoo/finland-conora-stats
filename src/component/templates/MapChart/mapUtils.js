const getConfirmedCases = data =>
  data.map(d => {
    return {
      district: d[0],
      cases: d[1]
    };
  });

const parseMapDetails = (jsonData, callback) => {
  return jsonData.map(data => {
    const lan = data[1].properties.latitude;
    const lng = data[1].properties.longitude;
    const gn_name = data[1].properties.Maakunta;
    const distName = callback(gn_name);

    return {
      lan,
      lng,
      gn_name,
      cases: distName.length > 0 ? distName[0].cases : 0
    };
  });
};

const getColors = (feature, data) => {
  const allConfirmed = data.map(d => {
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
    : '#fff';
};

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

module.exports = {
  parseMapDetails,
  getConfirmedCases,
  getColors,
  mapRadius
};
