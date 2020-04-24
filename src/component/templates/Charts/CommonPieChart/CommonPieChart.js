import PropTypes from 'prop-types';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { getColors, mapHospitalArea } from '../utils';
import CustomisedToolPit from '../Customized/CustomisedToolpit';

const renderLegendWithText = (value, entry) => {
  const { color } = entry;

  return (
    <span style={{ color }}>
      {value} ({mapHospitalArea()[value].join(', ')})
    </span>
  );
};

const CommonPieChart = (props) => (
  <ResponsiveContainer
    height={props.isDeathCasesChart ? 350 : 200}
    width={props.width}
  >
    <PieChart margin={{ bottom: 30 }}>
      <Pie data={props.data} dataKey='cases' paddingAngle={2}>
        {props.data.map((entry, index) => (
          <Cell key={entry} fill={getColors(index)} />
        ))}
      </Pie>
      {CustomisedToolPit()}
      <Legend
        formatter={props.isDeathCasesChart ? renderLegendWithText : null}
        verticalAlign='bottom'
        align={`${props.isDeathCasesChart ? 'left' : 'center'}`}
      />
    </PieChart>
  </ResponsiveContainer>
);

CommonPieChart.propTypes = {
  width: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default CommonPieChart;
