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
    let location = district === 'HUS' ? 'Helsinki' : district;
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
