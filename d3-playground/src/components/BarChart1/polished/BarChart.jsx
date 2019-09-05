import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import './style.css';

var data = [
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

const margin = { top: 20, right: 30, bottom: 30, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

const x = d3
  .scaleBand()
  .domain(
    data
      .sort((a, b) => b.value - a.value)
      .map(function(d) {
        return d.name;
      })
  )
  .range([0, width])
  .paddingInner(0.1)
  .paddingOuter(0.1);

const y = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function(d) {
      return d.value;
    }),
  ])
  .range([height, 0]);

const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y).ticks(10, '%');

const BarChart1 = () => {
  useEffect(() => {
    var chart = d3
      .select('#barChartPolished')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    chart
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

    var bar = chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return x(d.name);
      })
      .attr('y', function(d) {
        return y(d.value);
      })
      .attr('height', function(d) {
        return height - y(d.value);
      })
      .attr('width', x.bandwidth());
  });

  return <svg id="barChartPolished" />;
};

export default BarChart1;
