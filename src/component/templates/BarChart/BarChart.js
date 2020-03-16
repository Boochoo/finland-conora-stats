import React, { Component, useState, useEffect } from 'react';
import * as d3 from 'd3';

/* const AnimatedCircles = () => {
  const [visibleCircles, setVisibleCircles] = useState(generateCircles());

  useInterval(() => {
    setVisibleCircles(generateCircles());
  }, 2000);

  return (
    <svg viewBox='0 0 100 20'>
      {allCircles.map(d => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))}
    </svg>
  );
};

const AnimatedCircle = ({ index, isShowing }) => {
  const wasShowing = useRef(false);

  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);

  const style = useSpring({
    config: {
      duration: 1200
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0
  });

  return (
    <animated.circle
      {...style}
      cx={index * 15 + 10}
      cy='10'
      fill={
        !isShowing
          ? 'tomato'
          : !wasShowing.current
          ? 'cornflowerblue'
          : 'lightgrey'
      }
    />
  );
}; */

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 860 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select('.bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    /* const svg = d3
      .select('.bar-chart')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', height); */

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => height - 10 * d)
      .attr('width', 25)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'cornflowerblue');

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => height - 10 * d - 3);
  }

  render() {
    return <div className='bar-chart'></div>;
  }
}

export default BarChart;
// export default AnimatedCircles;
