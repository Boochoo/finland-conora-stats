const groups = [
  'fever',
  'cough',
  'breathing_difficulties',
  'muscle_pain',
  'headache',
  'sore_throat',
  'rhinitis',
  'stomach_issues',
  'sensory_issues',
  'longterm_medication',
  'smoking',
  'corona_suspicion',
];

const groupData = (items) => {
  return [items].map((item, index) => {
    return Object.keys(item).map((key) => {
      return groups
        .filter((group) => {
          const excludeKeys = ['cough_fine', 'cough_impaired', 'cough_bad'];

          return !excludeKeys.includes(key) && key.includes(group);
        })
        .map((currEl) => {
          return {
            group: currEl,
            [key]: Number(item[key]),
          };
        });
    });
  });
};

const mergeObjectsByGroup = (array, property) => {
  const newArray = new Map();

  array.forEach((element) => {
    const propertyValue = element[property];

    newArray.has(propertyValue)
      ? newArray.set(propertyValue, {
          ...element,
          ...newArray.get(propertyValue),
        })
      : newArray.set(propertyValue, element);
  });

  return Array.from(newArray.values());
};

const mapDataForCharts = (data) =>
  Object.values(data).map((item, i) => {
    const keys = Object.keys(item)
      .map((key, index) => {
        if (key === 'group') return;
        return {
          name: key,
          cases: Object.values(item)[index],
        };
      })
      .filter((el) => el);

    return keys;
  });

const getAllCities = (items) =>
  items.map((item) => {
    return item.city;
  });

module.exports = {
  groups,
  groupData,
  mergeObjectsByGroup,
  mapDataForCharts,
  getAllCities,
};
