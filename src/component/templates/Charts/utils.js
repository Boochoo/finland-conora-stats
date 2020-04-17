import { Tooltip } from 'recharts';

import { rgbaColors } from '../../organisms/Layout/Layout.style';

const getColors = (index) => {
  const colors = [
    '#000839',
    '#005082',
    '#00a8cc',
    '#00bdaa',
    '#400082',
    '#29c7ac',
    '#c02739',
    '#84142d',
    '#54123b',
    '#ffa41b',
  ];

  return colors[index];
};

const PieChartCustomColors = (index) => {
  const colors = [rgbaColors.orange2, rgbaColors.orange3, rgbaColors.orange4];

  return colors[index];
};

const mapHospitalArea = () => {
  return {
    HYKS: [
      'Helsinki and Uusimaa',
      'Etelä-Karjala',
      'Kymenlaakso',
      'Päijät-Häme',
    ],
    KYS: [
      'Pohjoinen-Savo',
      'Etelä-Savo',
      'Itä-Savo',
      'Keski-Suomi',
      'Pohjois-Karjala',
    ],
    OYS: [
      'Pohjois-Pohjanmaa',
      'Kainuu',
      'Keski-Pohjanmaa',
      'Lapin',
      'Länsi-Pohja',
    ],
    TAYS: ['Pirkanmaa', 'Etelä-Pohjanmaa', 'Kanta-Häme'],
    TYKS: ['Varsinais-Suomi', 'Satakunta', 'Vaasa'],
  };
};

module.exports = {
  getColors,
  PieChartCustomColors,
  mapHospitalArea,
};
