import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

const data = [4, 8, 15, 16, 23, 42];

const x = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, 590]);

const HTML = () => {
  useEffect(() => {
    d3.select('#barChartHTML')
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('width', d => `${x(d)}px`)
      .text(d => d);
  });

  return <div id="barChartHTML" />;
};

export default HTML;
