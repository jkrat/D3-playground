import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import { data } from './data';

const margin = { top: 50, right: 0, bottom: 100, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 430 - margin.top - margin.bottom;
const gridSize = Math.floor(width / 24);
const legendElementWidth = gridSize * 2;
const buckets = 9;
const colors = [
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58',
];
const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const times = [
  '1a',
  '2a',
  '3a',
  '4a',
  '5a',
  '6a',
  '7a',
  '8a',
  '9a',
  '10a',
  '11a',
  '12a',
  '1p',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '10p',
  '11p',
  '12p',
];

const dataObj = data.map(i => ({
  day: i[0],
  hour: i[1],
  value: i[2],
}));

const HeatMap = () => {
  useEffect(() => {
    const chart = d3
      .select('#HourHeatMap')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const dayLabels = chart
      .selectAll('.dayLabel')
      .data(days)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', 0)
      .attr('y', (d, i) => i * gridSize)
      .style('text-anchor', 'end')
      .attr('transform', `translate(-6, ${gridSize / 1.5})`)
      .attr('class', (d, i) =>
        i >= 0 && i <= 4
          ? 'dayLabel mono axis axis-workweek'
          : 'dayLabel mono axis'
      );

    const timeLabels = chart
      .selectAll('.timeLabel')
      .data(times)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * gridSize)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .attr('transform', `translate(${gridSize / 2}, -6)`)
      .attr('class', (d, i) =>
        i >= 7 && i <= 16
          ? 'timeLabel mono axis axis-worktime'
          : 'timeLabel mono axis'
      );

    const colorScale = d3
      .scaleQuantile()
      .domain([0, buckets - 1, d3.max(dataObj, d => d.value)])
      .range(colors);

    const cards = chart
      .selectAll('.hour')
      .data(dataObj, d => `${d.day}:${d.hour}`);

    cards.join(
      enter =>
        enter
          .append('rect')
          .attr('x', d => (d.hour - 1) * gridSize)
          .attr('y', d => (d.day - 1) * gridSize)
          .attr('rx', 4)
          .attr('ry', 4)
          .attr('class', 'hour bordered')
          .attr('width', gridSize)
          .attr('height', gridSize)
          .style('fill', colors[0])
          .call(enter =>
            enter
              .transition(d3.transition().duration(750))
              .style('fill', d => colorScale(d.value))
          ),
      update =>
        update.call(update =>
          update
            .transition(d3.transition().duration(750))
            .style('fill', d => colorScale(d.value))
        ),
      exit => exit.remove()
    );

    const legend = chart
      .selectAll('.legend')
      .data([0].concat(colorScale.quantiles()), d => d);

    legend
      .enter()
      .append('g')
      .attr('class', 'legend')
      .append('rect')
      .attr('x', (d, i) => legendElementWidth * i)
      .attr('y', height)
      .attr('width', legendElementWidth)
      .attr('height', gridSize / 2)
      .style('fill', (d, i) => colors[i]);

    legend
      .enter()
      .append('text')
      .attr('class', 'mono')
      .text(d => `≥ ${Math.round(d)}`)
      .attr('x', (d, i) => legendElementWidth * i)
      .attr('y', height + gridSize);

    legend.exit().remove();
  });

  return <div id="HourHeatMap" />;
};

export default HeatMap;
