import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

const data = [
  { name: 'A', value: 0.08167 },
  { name: 'B', value: 0.01492 },
  { name: 'C', value: 0.02782 },
  { name: 'D', value: 0.04253 },
  { name: 'E', value: 0.12702 },
  { name: 'F', value: 0.02288 },
  { name: 'G', value: 0.02015 },
  { name: 'H', value: 0.06094 },
  { name: 'I', value: 0.06966 },
  { name: 'J', value: 0.00153 },
  { name: 'K', value: 0.00772 },
  { name: 'L', value: 0.04025 },
  { name: 'M', value: 0.02406 },
  { name: 'N', value: 0.06749 },
  { name: 'O', value: 0.07507 },
  { name: 'P', value: 0.01929 },
  { name: 'Q', value: 0.00095 },
  { name: 'R', value: 0.05987 },
  { name: 'S', value: 0.06327 },
  { name: 'T', value: 0.09056 },
  { name: 'U', value: 0.02758 },
  { name: 'V', value: 0.00978 },
  { name: 'W', value: 0.0236 },
  { name: 'X', value: 0.0015 },
  { name: 'Y', value: 0.01974 },
  { name: 'Z', value: 0.00074 },
];

const width = 780;
const height = 500;

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);

const Vertical = () => {
  useEffect(() => {
    const chart = d3
      .select('#barChartVertical')
      .attr('width', width)
      .attr('height', height);

    const barWidth = width / data.length;

    const bar = chart
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * barWidth} ,0)`);

    bar
      .append('rect')
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value))
      .attr('width', barWidth - 1);

    bar
      .append('text')
      .attr('x', barWidth / 2)
      .attr('y', d => y(d.value) + 3)
      .attr('dy', '.75em')
      .text(d => d.value);
  });

  return <svg id="barChartVertical" />;
};

export default Vertical;
