import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

import { themeColors } from '../../../organisms/Layout/Layout.style';
import CustomisedToolPit from '../Customized/CustomisedToolpit';

const getColors = (index) => {
  const colors = [
    '#400082',
    '#29c7ac',
    '#c02739',
    '#84142d',
    '#54123b',
    '#ffa41b',
  ];

  return colors[index];
};

const CustomMixedBar = (name, dataKey, index) => (
  <Bar
    type='monotone'
    name={name}
    dataKey={dataKey}
    barSize={30}
    fill={getColors(index)}
    stackId='a'
    key={index}
  />
);

const ComposedBarLineChart = (props) => (
  <ResponsiveContainer width='100%' height={500}>
    <ComposedChart
      data={props.data}
      margin={{ top: 15, right: 5, left: -15, bottom: 20 }}
    >
      <XAxis dataKey={props.dataKey} />
      <YAxis />
      {CustomisedToolPit()}
      <Legend />
      <CartesianGrid stroke='#f5f5f5' strokeDasharray='3' />

      <Line
        type='monotone'
        name='Total cases'
        dataKey={props.totalCases}
        dot={false}
        stroke={themeColors.lightRed}
        strokeWidth={2.5}
      />

      {props.casesData &&
        props.casesData.map((cases, index) =>
          CustomMixedBar(cases.title, cases.amount, index)
        )}
    </ComposedChart>
  </ResponsiveContainer>
);

export default ComposedBarLineChart;
