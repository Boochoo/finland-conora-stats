import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import responsivefy from '../../../utils/responsiveSVG';
import { dailyCasesTotal } from '../../../utils/utils';

const SvgContainer = styled.div`
  path {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  svg text {
    font-size: 1.15rem;
  }
`;

class LineChart extends Component {
  componentDidMount() {
    this.drawChart(this.props.data);
  }

  drawChart(data) {
    const dailyCasesData = dailyCasesTotal(data);

    const tickLabels = Object.keys(dailyCasesData).map(el => el);
    const dailyData = Object.entries(dailyCasesData).map(el => el);

    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 80, left: 70 },
      width = 1500 - margin.left - margin.right,
      height = 400;

    // set the ranges
    const scaleX = d3
      .scaleLinear()
      .domain([0, dailyData.length])
      .range([0, width]);

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(dailyData, d => d[1])])
      .range([height, 0]);
    let xAxisIndexes;
    const tuples = dailyData
      .map((d, i) => [i, d[1]])
      .map(([x, y]) => [scaleX(x), scaleY(y)]);

    const generator = d3.line();

    const svg = d3
      .select('#line-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + 35)
      .call(responsivefy)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var tooltip = d3
      .select('#line-chart')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('a simple tooltip');

    // Add the valueline path.
    svg
      .append('path')
      .attr('class', 'line')
      .attr('d', generator(tuples));

    // text label for the x axis
    svg
      .append('text')
      .attr('font-size', '1.1rem')
      .attr('transform', `translate(${width / 2} ,${height + margin.top + 70})`)
      .style('text-anchor', 'middle')
      .style('fill', '#333')
      .text('Date');

    // Add the x Axis
    const xAxisGenerator = d3
      .axisBottom(scaleX)
      .tickFormat((d, i) => tickLabels[d]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxisGenerator)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 10)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('fill', '#333');

    // Add the y Axis
    svg.append('g').call(d3.axisLeft(scaleY));

    // text label for the y axis
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', '#333')
      .text('Cases');
  }

  render() {
    return <SvgContainer id='line-chart'></SvgContainer>;
  }
}

export default LineChart;
