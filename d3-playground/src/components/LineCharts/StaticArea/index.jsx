import React, { useEffect } from 'react';
import * as d3 from 'd3';

const margin = { top: 20, right: 40, bottom: 10, left: 40 };
const width = 960;
const height = 500 - margin.top - margin.bottom;

let chart;

const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80],
];

const x = d3
  .scaleLinear()
  .domain([0, 600])
  .range([0, width]);

const y = d3
  .scaleLinear()
  .domain([0, 110])
  .range([0, height]);

const lineGenerator = d3
  .line()
  .x(d => x(d[0]))
  .y(d => y(d[1]))
  .curve(d3.curveCardinal);

const pathData = lineGenerator(points);

const StaticArea = () => {
  useEffect(() => {
    chart = d3
      .select('#StaticArea')
      .attr('viewBox', [0, 0, width, height])
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart
      .append('path')
      .attr('d', pathData)
      .attr('stroke', 'steelblue')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5);

    chart
      .selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx', d => x(d[0]))
      .attr('cy', d => y(d[1]))
      .attr('r', 3);
  });

  return <svg id="StaticArea" />;
};

export default StaticArea;
