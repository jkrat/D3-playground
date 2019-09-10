import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import Chart from '../Chart';

const data = {
  apples: [53245, 28479, 19697, 24037, 40245],
  oranges: [200, 200, 200, 200, 200],
};

const width = 960;
const height = Math.min(width, 500);
const radius = height / 2;

const color = d3.scaleOrdinal(d3.schemeCategory10);

// const pieGenerator = d3.pie();
// const arcs = pieGenerator.sort(null).value(d => d)(data);

const arcs = d3
  .pie()
  .sort(null)
  .value(d => d)(data.apples);

const arc = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

const Current = () => {
  useEffect(() => {
    const chart = d3
      .select('#current')
      // .attr('viewBox', [-487.5, -250, 975, 500]);
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    chart
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);
  });

  return (
    <Chart title="Current">
      <form>
        <label>
          <input type="radio" name="dataset" value="apples" checked></input>
          Apples
        </label>
        <label>
          <input type="radio" name="dataset" value="oranges"></input>
          Oranges
        </label>
      </form>
      <svg id="current" />
    </Chart>
  );
};

export default Current;
