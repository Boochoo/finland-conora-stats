import React, { Component, useState, useEffect } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    var margin = { top: 10, right: 0, bottom: 30, left: 0 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select('.bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', (d, i) => height - 10 * d)
      .attr('width', 25)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'steelblue');

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * 30)
      .attr('y', (d, i) => height - 10 * d - 3);
  }

  render() {
    return <div className='bar-chart'></div>;
  }
}

export default BarChart;
// export default AnimatedCircles;
