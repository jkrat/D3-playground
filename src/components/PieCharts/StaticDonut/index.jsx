import React, { useEffect } from 'react';
import * as d3 from 'd3';

const width = 960;
const height = Math.min(width, 500);
const radius = height / 2;

const color = d3.scaleOrdinal(d3.schemeTableau10);
const pieGenerator = d3.pie().sort(null);
const arcGenerator = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

let chart;

const StaticDonut = ({ data }) => {
  useEffect(() => {
    chart = d3
      .select('#StaticDonut')
      .attr('viewBox', [-487.5, -250, 975, 500])
      .append('g');
  }, []);

  useEffect(() => {
    const arcs = pieGenerator.value(d => d)(data);
    const path = chart
      .datum(data)
      .selectAll('path')
      .data(arcs);

    path
      .enter()
      .append('path')
      .merge(path)
      .attr('fill', (d, i) => color(i))
      .attr('d', arcGenerator);

    path.exit().remove();
  }, [data]);

  return <svg id="StaticDonut" />;
};

export default StaticDonut;
