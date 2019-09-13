import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import { dataSet } from './data';

const causes = ['wounds', 'other', 'disease'];

const parseDate = d3.timeParse('%m/%Y');
const data = dataSet.map(item => {
  item.date = parseDate(item.date);
  return item;
});

const margin = { top: 20, right: 50, bottom: 30, left: 20 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const x = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.04)
  .paddingOuter(0.1);

const y = d3.scaleLinear().rangeRound([height, 0]);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat('%b'));

const yAxis = d3.axisRight(y);

const stack = d3.stack().keys(causes);

const stackedSeries = stack(data);

const VerticalStack = () => {
  useEffect(() => {
    const chart = d3
      .select('#VerticalStack')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map(d => d.date));

    y.domain([
      0,
      d3.max(stackedSeries[stackedSeries.length - 1], d => d[0] + d[1]),
    ]).nice();

    chart
      .append('g')
      .attr('class', 'VSaxis VSaxis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    chart
      .append('g')
      .attr('class', 'VSaxis VSaxis--y')
      .attr('transform', `translate(${width},0)`)
      .call(yAxis);

    const layer = chart
      .selectAll('.layer')
      .data(stackedSeries)
      .enter()
      .append('g')
      .classed('layer', true)
      .style('fill', (d, i) => color(i));

    layer
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', d => x(d.data.date))
      .attr('y', d => y(d[1] + d[0]))
      .attr('height', d => y(d[0]) - y(d[1] + d[0]))
      .attr('width', x.bandwidth());
  });

  return <svg id="VerticalStack"></svg>;
};

export default VerticalStack;
