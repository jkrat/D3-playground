import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import { data } from './data';

const width = 500;
const height = Math.min(width, 500);
const pieGenerator = d3.pie();

const arcs = pieGenerator.sort(null).value(d => d.value)(data);

const color = d3
  .scaleOrdinal()
  .domain(data.map(d => d.name))
  .range(
    d3
      .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
      .reverse()
  );

const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(Math.min(width, height) / 2 - 1);

const arcLabel = d3
  .arc()
  .innerRadius((Math.min(width, height) / 2) * 0.8)
  .outerRadius((Math.min(width, height) / 2) * 0.8);

const BasicPie = () => {
  useEffect(() => {
    const chart = d3
      .select('#BasicPie')
      .attr('viewBox', [-height, -(height / 2), height * 2, height]);

    chart
      .append('g')
      .attr('stroke', 'white')
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.name))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    chart
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .call(text =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text(d => d.data.name)
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text(d => d.data.value.toLocaleString())
      );
  });

  return <svg id="BasicPie" />;
};

export default BasicPie;
