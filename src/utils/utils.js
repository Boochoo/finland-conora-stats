export const displayDate = (date) => new Date(date).toGMTString();

export const getConfirmedByDate = (data) =>
  data.reduce(
    (prev, curr) => (
      (prev[displayDate(curr.date)] = ++prev[displayDate(curr.date)] || 1), prev
    ),
    {}
  );

const getCombinedSum = (data, prop) =>
  data.reduce((prev, curr) => {
    let district = curr[prop];
    let location = district ? district : 'No details';
    return (prev[location] = ++prev[location] || 1), prev;
  }, {});

export const getConfirmedByDistrict = (data) =>
  getCombinedSum(data, 'healthCareDistrict');

export const getConfirmedBySource = (data) =>
  getCombinedSum(data, 'infectionSourceCountry');

export const getHospitalArea = (data) => getCombinedSum(data, 'area');

export const sortData = (data) =>
  Object.entries(data)
    .slice()
    .sort((a, b) => b[1] - a[1]);

const getDailyData = (d) => {
  return d.map((currData, index) => {
    let key = currData[0];
    let value = currData[1];

    return {
      date: key,
      cases: value,
    };
  });
};

export const dailyCasesTotal = (data) => {
  const sortedData = getDailyData(data).sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedData.reduce((acc, obj) => {
    let key = obj.date.slice(5, -13);
    acc[key] = (acc[key] || 0) + obj.cases;
    return acc;
  }, {});
};

const getConfirmedObject = (data, prop) =>
  data.reduce((acc, currVal) => {
    let filteredObj = acc
      .filter((obj) => {
        return obj[prop] === currVal[prop];
      })
      .pop() || {
      countryRegion: currVal.countryRegion,
      provinceState: currVal.provinceState,
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lat: currVal.lat,
      long: currVal.long,
      lastUpdate: currVal.lastUpdate,
    };

    filteredObj.confirmed += currVal.confirmed;
    filteredObj.recovered += currVal.recovered;
    filteredObj.deaths += currVal.deaths;

    acc.push(filteredObj);

    return acc;
  }, []);

export const getConfirmedByProvinceState = (data) =>
  getConfirmedObject(data, 'provinceState');

export const getConfirmedByCountry = (data) =>
  getConfirmedObject(data, 'countryRegion');

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
  const getRecoveredValue = Object.entries(recoveredData);
  const getDeathsKey = Object.keys(deathsData);
  const getDeathsValue = Object.entries(deathsData);

  return keys.map((item, i) => {
    const deaths = getDeathsKey.includes(item)
      ? getDeathsValue.filter((el) => el[0] === item).map((el) => el[1])[0]
      : 0;
    const recoveries = getRecoveredKey.includes(item)
      ? getRecoveredValue.filter((el) => el[0] === item).map((el) => el[1])[0]
      : 0;

    return {
      name: item,
      cases: getValues[i],
      daily: Object.values(confirmedData)[i],
      deaths,
      recoveries,
    };
  });
};
