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
  Object.entries(data)
    .slice()
    .sort((a, b) => b[1] - a[1]);

const getDailyData = d => {
  return d.map((currData, index) => {
    let key = currData[0];
    let value = currData[1];

    return {
      date: key,
      cases: value
    };
  });
};

export const dailyCasesTotal = data => {
  const sortedData = getDailyData(data).sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedData.reduce((acc, obj) => {
    let key = obj.date.slice(5, -18);
    acc[key] = (acc[key] || 0) + obj.cases;
    return acc;
  }, {});
};

export const getConfirmedByCountry = data =>
  data.reduce((acc, currVal) => {
    let filteredObj = acc
      .filter(obj => {
        return obj.countryRegion === currVal.countryRegion;
      })
      .pop() || {
      countryRegion: currVal.countryRegion,
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lat: currVal.lat,
      long: currVal.long
    };

    filteredObj.confirmed += currVal.confirmed;
    filteredObj.recovered += currVal.recovered;
    filteredObj.deaths += currVal.deaths;

    acc.push(filteredObj);

    return acc;
  }, []);

export const getChangesInTotalCases = (
  confirmedData,
  recoveredData,
  deathsData
) => {
  const getValues = Object.values(confirmedData).map((item, index, array) => {
    return (array[index] += array[index - 1] ? array[index - 1] : 0);
  });

  const keys = Object.keys(confirmedData);
  const getRecoveredKey = Object.keys(recoveredData);
  const getRecoveredValue = Object.values(recoveredData);
  const getDeathsKey = Object.keys(deathsData);
  const getDeathsValue = Object.entries(deathsData);

  return keys.map((item, i) => {
    return {
      name: item,
      cases: getValues[i],
      daily: Object.values(confirmedData)[i]
    };
  });
};
