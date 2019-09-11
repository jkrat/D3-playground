import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './style.css';
import Chart from '../Chart';

const data = {
  apples: [53245, 28479, 19697, 24037, 40245],
  oranges: [200, 200, 200, 200, 200],
};

const width = 960;
const height = Math.min(width, 500);
const margin = 20;
const radius = height / 2;

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pieGenerator = d3.pie();

const arc = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

const Current = () => {
  // const [chartData, setChartData] = useState(data.apples);

  let chart, menu;

  function createChart() {
    const chartData = data[menu.property('value')];
    const arcs = pieGenerator.sort(null).value(d => d)(chartData);
    const sections = chart.selectAll('path').data(arcs, d => d);

    sections.join(
      enter => {
        enter
          .append('path')
          .attr('fill', (d, i) => color(i))
          .attr('d', arc);
      }
      // update => update,
      // exit => exit.remove()
    );
  }

  // function change() {
  //   const { value } = this;
  //   setChartData(data[value]);
  // }

  useEffect(() => {
    chart = d3
      .select('#current')
      .attr('viewBox', [-487.5, -250, 975, 500])
      .append('g');

    menu = d3.select('#barMenu select').on('change', createChart);

    menu
      .selectAll('option')
      .data(Object.keys(data))
      .enter()
      .append('option')
      .text(d => d);

    menu.property('value', 'apples');

    createChart();
  });

  return (
    <Chart title="Current">
      <p id="barMenu">
        <b>Choose data</b>
        <br />
        <select></select>
      </p>
      <svg id="current" />
    </Chart>
  );
};

export default Current;
