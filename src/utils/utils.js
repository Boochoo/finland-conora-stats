export const displayDate = date => new Date(date).toGMTString();

export const getConfirmedByDate = data =>
  data.reduce(
    (prev, curr) => (
      (prev[displayDate(curr.date)] = ++prev[displayDate(curr.date)] || 1), prev
    ),
    {}
  );

export const getConfirmedByDistrict = data =>
  data.reduce((prev, curr) => {
    let district = curr.healthCareDistrict;
    let location = district === 'HUS' ? 'Uusimaa' : district;
    return (prev[location] = ++prev[location] || 1), prev;
  }, {});

export const getConfirmedBySource = data =>
  data.reduce((prev, curr) => {
    let sources = curr.infectionSourceCountry;
    let source = sources ? sources : 'Unknown';
    return (prev[source] = ++prev[source] || 1), prev;
  }, {});

export const sortData = data =>
  Object.entries(data).sort((a, b) => b[1] - a[1]);

export const getDailyData = d =>
  d.map((currData, index) => {
    let key = currData[0].slice(5, -18);
    let value = currData[1];

    return {
      date: key,
      cases: value
    };
  });
