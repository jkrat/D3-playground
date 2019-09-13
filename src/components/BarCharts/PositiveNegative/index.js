import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

const margin = { top: 20, right: 30, bottom: 40, left: 30 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const data = [
  { name: 'A', value: -15 },
  { name: 'B', value: 5 },
  { name: 'A', value: 10 },
  { name: 'D', value: -20 },
  { name: 'E', value: -5 },
  { name: 'F', value: 5 },
  { name: 'G', value: -15 },
  { name: 'H', value: -15 },
  { name: 'I', value: 20 },
  { name: 'J', value: 15 },
];

const x = d3
  .scaleBand()
  .rangeRound([margin.left, width - margin.right])
  .paddingInner(0.05)
  .paddingOuter(0.3);

const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisRight(y).tickSize(width - margin.left - margin.right);

const PositiveNegative = () => {
  useEffect(() => {
    const chart = d3
      .select('#PositiveNegative')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(data.map(d => d.name));
    y.domain(d3.extent(data, d => d.value));

    chart
      .append('g')
      .classed('y PNaxis', true)
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .selectAll('.tick:not(:first-of-type) line')
          .attr('stroke-opacity', 0.1)
      )
      .call(g =>
        g
          .selectAll('.tick text')
          .attr('x', 4)
          .attr('dy', -4)
      );

    chart
      .append('g')
      .classed('x PNaxis', true)
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove());

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar bar--negative', d => d.value < 0)
      .classed('bar bar--positive', d => d.value > 0)
      .attr('x', d => x(d.name))
      .attr('y', d => y(Math.max(0, d.value)))
      .attr('width', x.bandwidth())
      .attr('height', d => Math.abs(y(d.value) - y(0)));
  });
  return <svg id="PositiveNegative"></svg>;
};

export default PositiveNegative;
