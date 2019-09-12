import React, { useEffect } from 'react';
import * as d3 from 'd3';

const colors = ['#FBB65B', '#513551', '#de3163'];
const width = 900;
const height = 200;
const data = [
  { day: 'Mon', apricots: 120, blueberries: 180, cherries: 100 },
  { day: 'Tue', apricots: 60, blueberries: 185, cherries: 105 },
  { day: 'Wed', apricots: 100, blueberries: 215, cherries: 110 },
  { day: 'Thu', apricots: 80, blueberries: 230, cherries: 105 },
  { day: 'Fri', apricots: 120, blueberries: 240, cherries: 105 },
];

const x = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.apricots + d.blueberries + d.cherries)])
  .range([0, width]);

const y = d3
  .scaleBand()
  .domain(data.map(d => d.day))
  .range([0, height])
  .paddingInner(0.04)
  .paddingOuter(0.1);

const stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);

const HorizontalStack = () => {
  const stackedSeries = stack(data);

  useEffect(() => {
    const chart = d3
      .select('#HorizontalStack')
      .attr('width', width)
      .attr('height', height);

    const bar = chart
      .selectAll('g.series')
      .data(stackedSeries)
      .enter()
      .append('g')
      .classed('series', true)
      .style('fill', (d, i) => colors[i]);

    bar
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', d => x(d[0]))
      .attr('width', d => x(d[1] - d[0]))
      .attr('y', d => y(d.data.day))
      .attr('height', y.bandwidth());
  });

  return <svg id="HorizontalStack"></svg>;
};

export default HorizontalStack;
