import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Area
} from 'recharts';

import { themeColors, rgbaColors } from '../../organisms/Layout/Layout.style';
import styles from './Charts.style';
import { mapHospitalArea } from '../../../utils/utils';

const getColors = index => {
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
    '#ffa41b'
  ];

  return colors[index];
};

const CustomisedToolPit = () => (
  <Tooltip
    contentStyle={{ backgroundColor: themeColors.black }}
    labelStyle={{
      color: themeColors.creamWhite,
      fontSize: '1.24rem',
      marginBottom: '0.5rem',
      fontWeight: '800'
    }}
    itemStyle={{ color: themeColors.creamWhite }}
  />
);

export const CommonBarChart = props => (
  <ResponsiveContainer width='100%' height={500} className='chart-area'>
    <BarChart
      data={props.data}
      margin={{
        top: 15,
        right: 15,
        left: -15,
        bottom: props.marginBottom ? props.marginBottom : 40
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

export const CommonLineChart = props => (
  <ResponsiveContainer width='100%' height={500} className='chart-area'>
    <LineChart
      data={props.data}
      margin={{ top: 25, right: 5, left: -15, bottom: 20 }}
    >
      <XAxis dataKey='name' />

      {!props.isLinear ? (
        <YAxis scale='log' domain={['dataMin', 'dataMax']} allowDataOverflow />
      ) : (
        <YAxis />
      )}
      {CustomisedToolPit()}

      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <Line
        type='monotone'
        dataKey='cases'
        name='Total cases'
        dot={false}
        stroke={themeColors.blue}
        strokeWidth={3.5}
      />
    </LineChart>
  </ResponsiveContainer>
);

const renderLegendWithText = (value, entry) => {
  const { color } = entry;

  return (
    <span style={{ color }}>
      {value} ({mapHospitalArea()[value].join(', ')})
    </span>
  );
};

export const PieRecharted = props => (
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
      <Tooltip />
      <Legend
        formatter={props.isDeathCasesChart ? renderLegendWithText : null}
        verticalAlign='bottom'
        align={`${props.isDeathCasesChart ? 'left' : 'center'}`}
      />
    </PieChart>
  </ResponsiveContainer>
);

export const BarWithLine = props => (
  <ResponsiveContainer width='100%' height={500}>
    <ComposedChart
      data={props.data}
      margin={{ top: 15, right: 5, left: -15, bottom: 20 }}
    >
      <XAxis dataKey='name' />
      <YAxis />
      {CustomisedToolPit()}
      <Legend />
      <CartesianGrid stroke='#f5f5f5' strokeDasharray='3' />

      <Line
        type='monotone'
        name='Total cases'
        dataKey='cases'
        dot={true}
        stroke={themeColors.lightRed}
        strokeWidth={2.5}
      />

      <Bar
        type='monotone'
        name='Daily cases'
        dataKey='daily'
        barSize={30}
        fill={themeColors.blue}
        stackId='a'
      />
      <Bar
        type='monotone'
        name='Recoveries'
        dataKey='recoveries'
        fill={themeColors.green}
        barSize={30}
        stackId='a'
      />
      <Bar
        type='monotone'
        name='Deaths'
        dataKey='deaths'
        fill={themeColors.red}
        barSize={30}
        stackId='a'
      />
    </ComposedChart>
  </ResponsiveContainer>
);

const getCustomColors = index => {
  const colors = [rgbaColors.orange2, rgbaColors.orange3, rgbaColors.orange4];

  return colors[index];
};

const CustomBars = data =>
  data.map((entry, i) => {
    return Object.keys(entry).map((key, index) => {
      if (key !== 'group') {
        const keyArr = key.split('_');
        const name = keyArr[keyArr.length - 1];

        return (
          <Bar
            type='linear'
            dataKey={key}
            name={name}
            stackId={entry.group}
            fill={getCustomColors(index)}
            alignmentBaseline='middle'
          >
            {data.map((item, i) => {
              return <Cell width={27} cursor='pointer' key={`cell-${i}`} />;
            })}
          </Bar>
        );
      }
    });
  });

export const CityLevelBarChartBU = props => (
  <ResponsiveContainer width='100%' height={500}>
    <BarChart
      data={props.data}
      margin={{ top: 15, right: 0, left: 0, bottom: 100 }}
      barCategoryGap={0}
    >
      <XAxis
        dataKey='group'
        interval={0}
        angle={-45}
        textAnchor='end'
        tickSize={0}
      />
      <YAxis />

      {CustomisedToolPit()}

      {CustomBars(props.data)}
    </BarChart>
  </ResponsiveContainer>
);

const renderLegend = (value, entry) => {
  const keyArr = value.split('_');
  const name = keyArr[keyArr.length - 1];

  return <span>{name}</span>;
};

const payloadFormatter = data => {
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
          padding: '1rem'
        }}
        key={`city-level-toolpit-${index}`}
      >
        <p
          style={{
            textTransform: 'capitalize',
            margin: 0
          }}
        >
          {name} : <strong>{el.value}</strong>{' '}
        </p>
      </div>
    );
  });
};

export const CityLevelBarChart = props => (
  <ResponsiveContainer width={props.width} height={150}>
    <PieChart>
      <Pie data={props.data} dataKey='cases' paddingAngle={2} cursor='pointer'>
        {props.data.map((entry, index) => {
          return <Cell key={entry} fill={getCustomColors(index)} />;
        })}
      </Pie>

      <Tooltip
        content={payloadFormatter}
        contentStyle={{ backgroundColor: themeColors.black }}
        labelStyle={{
          color: themeColors.creamWhite,
          fontSize: '1.24rem',
          marginBottom: '0.5rem',
          fontWeight: '800'
        }}
        itemStyle={{ color: themeColors.creamWhite }}
      />

      <Legend formatter={renderLegend} verticalAlign='bottom' align='center' />
    </PieChart>
  </ResponsiveContainer>
);
