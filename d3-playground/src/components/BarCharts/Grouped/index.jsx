import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { data } from './data';

const margin = { top: 20, right: 30, bottom: 40, left: 30 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const Grouped = () => {
  useEffect(() => {
    const chart = d3
      .select('#Grouped')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // chart
    //   .selectAll('g')
    //   .data('data')
    //   .join('g')
    //   .attr('transform', d => `translate(${x0(d[groupKey])},0)`)
    //   .selectAll('rect')
    //   .data(d => keys.map(key => ({ key, value: d[key] })))
    //   .join('rect')
    //   .attr('x', d => x1(d.key))
    //   .attr('y', d => y(d.value))
    //   .attr('width', x1.bandwidth())
    //   .attr('height', d => y(0) - y(d.value))
    //   .attr('fill', d => color(d.key));

    // chart;
    // append('g')
    //   .call(xAxis)
    //   .append('g')
    //   .call(yAxis)
    //   .append('g')
    //   .call(legend);
  });
  return <svg id="Grouped"></svg>;
};

export default Grouped;
