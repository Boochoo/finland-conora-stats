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

const CustomMixedBar = (name, dataKey) => (
  <Bar
    type='monotone'
    name={name}
    dataKey={dataKey}
    barSize={30}
    fill={themeColors.blue}
    stackId='a'
  />
);

const ComposedLineChart = (props) => (
  <ResponsiveContainer width='100%' height={500}>
    <ComposedChart
      data={props.data}
      margin={{ top: 15, right: 5, left: -15, bottom: 20 }}
    >
      <XAxis dataKey='reportDate' />
      <YAxis />
      {CustomisedToolPit()}
      <Legend />
      <CartesianGrid stroke='#f5f5f5' strokeDasharray='3' />

      <Line
        type='monotone'
        name='Total cases'
        dataKey='totalConfirmed'
        dot={false}
        stroke={themeColors.lightRed}
        strokeWidth={2.5}
      />

      {/* {CustomMixedBar('Daily cases', 'daily')}
      {CustomMixedBar('Recoveries', 'recoveries')}
      {CustomMixedBar('Deaths', 'deaths')} */}
    </ComposedChart>
  </ResponsiveContainer>
);

export default ComposedLineChart;
