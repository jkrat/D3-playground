import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import { d4 } from './bullet.js';

const margin = { top: 5, right: 40, bottom: 20, left: 120 };
const width = 800 - margin.left - margin.right;
const height = 50 - margin.top - margin.bottom;

let chart;

const BulletChart = ({ data }) => {
  const dataSet = [...data];

  const bullet = d4
    .bullet()
    .width(width)
    .height(height);

  useEffect(() => {
    chart = d3
      .select('#BulletChart')
      .selectAll('svg')
      .data(dataSet)
      .enter()
      .append('svg')
      .attr('class', 'bullet')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const title = chart
      .append('g')
      .style('text-anchor', 'end')
      .attr('transform', `translate(-6,${height / 2})`);

    title
      .append('text')
      .attr('class', 'title')
      .text(d => d.title);

    title
      .append('text')
      .attr('class', 'subtitle')
      .attr('dy', '1em')
      .text(d => d.subtitle);
  }, []);

  useEffect(() => {
    createChart();
  }, [dataSet]);

  function createChart() {
    chart.datum(update);
    chart.call(bullet);
  }

  function update(d, i) {
    d.ranges = dataSet[i].ranges;
    d.markers = dataSet[i].markers;
    d.measures = dataSet[i].measures;
    return d;
  }
  return <div id="BulletChart"></div>;
};

export default BulletChart;
