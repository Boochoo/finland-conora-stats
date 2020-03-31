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
  ComposedChart
} from 'recharts';
import { themeColors } from '../../organisms/Layout/Layout.style';
import styles from './Charts.style';

const getColors = index => {
  const colors = [
    '#29c7ac',
    '#c02739',
    '#84142d',
    '#54123b',
    '#ffa41b',
    '#000839',
    '#005082',
    '#00a8cc',
    '#00bdaa',
    '#400082'
  ];

  return colors[index % 20];
};

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
      <Tooltip />
      <Bar type='monotone' dataKey='cases' barSize={30}>
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getColors(index)} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const CommonLineChart = props => (
  <ResponsiveContainer width='100%' height={500} className='chart-area'>
    <LineChart
      data={props.data}
      margin={{ top: 15, right: 5, left: -15, bottom: 20 }}
    >
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />

      <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
      <Line
        type='monotone'
        dataKey='cases'
        dot={false}
        stroke={themeColors.blue}
        strokeWidth={3.5}
      />
    </LineChart>
  </ResponsiveContainer>
);

export const PieRecharted = props => (
  <ResponsiveContainer height={500} width='100%'>
    <PieChart>
      <Pie
        data={props.data}
        dataKey='cases'
        cx={200}
        cy={200}
        outerRadius={150}
        fill='#8884d8'
        paddingAngle={2}
        label='cases'
      >
        {props.data.map((entry, index) => (
          <Cell key={entry} fill={getColors(index)} />
        ))}
      </Pie>
      <Tooltip />
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
      <Tooltip />
      <Legend />
      <CartesianGrid stroke='#f5f5f5' strokeDasharray='3' />
      <Bar
        type='monotone'
        name='Daily cases'
        dataKey='daily'
        barSize={30}
        fill={themeColors.lightGreen}
      />

      <Line
        type='monotone'
        name='Total cases'
        dataKey='cases'
        dot={false}
        stroke={themeColors.lightRed}
        strokeWidth={3.5}
      />
    </ComposedChart>
  </ResponsiveContainer>
);
