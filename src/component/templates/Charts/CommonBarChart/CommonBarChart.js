import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { themeColors } from '../../../organisms/Layout/Layout.style';
import CustomisedToolPit from '../Customized/CustomisedToolpit';

const CommonBarChart = (props) => (
  <ResponsiveContainer width='100%' height={500} className='chart-area'>
    <BarChart
      data={props.data}
      margin={{
        top: 25,
        right: 0,
        left: 20,
        bottom: props.marginBottom ? props.marginBottom : 40,
      }}
    >
      <XAxis
        dataKey='name'
        stroke={themeColors.gray}
        interval={0}
        angle={-45}
        textAnchor='end'
        tick={{ fontSize: props.smallerFont ? 12 : 16 }}
      />
      <YAxis />
      {CustomisedToolPit()}
      <Bar type='monotone' dataKey='cases' fill={props.fillColor} />
    </BarChart>
  </ResponsiveContainer>
);

export default CommonBarChart;
