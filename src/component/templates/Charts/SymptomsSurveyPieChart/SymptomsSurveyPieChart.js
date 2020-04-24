import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';

import { themeColors } from '../../../organisms/Layout/Layout.style';

import { PieChartCustomColors } from '../utils';
import CustomisedToolPit from '../Customized/CustomisedToolpit';

const payloadFormatter = (data) => {
  if (data.payload.length === 0) return;

  return data.payload.map((el, index) => {
    const key = el.name.split('_');
    const name = key[key.length - 1];

    return (
      <div
        style={{
          backgroundColor: themeColors.black,
          color: themeColors.creamWhite,
          marginBottom: '0.5rem',
          padding: '1rem',
        }}
        key={`city-level-toolpit-${index}`}
      >
        <p
          style={{
            textTransform: 'capitalize',
            margin: 0,
          }}
        >
          {name} : <strong>{el.value}</strong>{' '}
        </p>
      </div>
    );
  });
};

const renderLegend = (value, entry) => {
  const keyArr = value.split('_');
  const name = keyArr[keyArr.length - 1];

  return <span>{name}</span>;
};

const SymptomsSurveyPieChart = (props) => (
  <ResponsiveContainer width={props.width} height={150}>
    <PieChart>
      <Pie data={props.data} dataKey='cases' paddingAngle={2} cursor='pointer'>
        {props.data.map((entry, index) => {
          return <Cell key={entry} fill={PieChartCustomColors(index)} />;
        })}
      </Pie>

      {CustomisedToolPit(payloadFormatter)}

      <Legend formatter={renderLegend} verticalAlign='bottom' align='center' />
    </PieChart>
  </ResponsiveContainer>
);

SymptomsSurveyPieChart.propTypes = {
  width: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default SymptomsSurveyPieChart;
