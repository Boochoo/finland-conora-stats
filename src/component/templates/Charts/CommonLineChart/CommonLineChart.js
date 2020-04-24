import PropTypes from 'prop-types';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Line,
  ComposedChart,
} from 'recharts';

import { themeColors } from '../../../organisms/Layout/Layout.style';
import CustomisedToolPit from '../Customized/CustomisedToolpit';

const CommonLineChart = (props) => (
  <ResponsiveContainer width='100%' height={500} className='chart-area'>
    <ComposedChart
      data={props.data}
      margin={{ top: 25, right: 0, left: 20, bottom: 20 }}
    >
      <XAxis dataKey={props.xAxisName} />

      {!props.isLinear ? (
        <YAxis scale='log' domain={['dataMax', 'dataMax']} />
      ) : (
        <YAxis />
      )}
      {CustomisedToolPit()}

      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <Area
        type='monotone'
        dataKey={props.dataKey}
        stroke={themeColors.blue}
        strokeWidth={3.5}
        fillOpacity={0.25}
        fill={themeColors.blue}
      />
      {props.dataKey1 && (
        <Area
          type='monotone'
          dataKey={props.dataKey1}
          name='Incident rates'
          stroke={themeColors.lightRed}
          strokeWidth={3.5}
          fillOpacity={0.25}
          fill={themeColors.lightRed}
        />
      )}
    </ComposedChart>
  </ResponsiveContainer>
);

CommonLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  xAxisName: PropTypes.string.isRequired,
  isLinear: PropTypes.bool.isRequired,
  dataKey1: PropTypes.string,
};

export default CommonLineChart;
