import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './style.css';

const width = 960;
const height = Math.min(width, 500);
const margin = 20;
const radius = height / 2;
let chart;

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pieGenerator = d3.pie();

const arc = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

const Current = ({ title, data }) => {
  console.log('component');
  useEffect(() => {
    console.log('effect');
    chart = d3
      .select('#current')
      .attr('viewBox', [-487.5, -250, 975, 500])
      .append('g');
  }, []);

  useEffect(() => {
    console.log('data effect');
    createChart();
  }, [data]);

  function createChart() {
    console.log('function');
    const arcs = pieGenerator.sort(null).value(d => d)(data);
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

  return <svg id="current" />;
};

export default Current;
