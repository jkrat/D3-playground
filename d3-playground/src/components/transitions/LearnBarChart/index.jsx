import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import './style.css';

function rando() {
  return Math.floor(Math.random() * 100);
}

const data = [
  { name: 'A', a: 1, b: 26, c: rando(), d: rando() },
  { name: 'B', a: 2, b: 24, c: rando(), d: rando() },
  { name: 'C', a: 3, b: 25, c: rando(), d: rando() },
  { name: 'E', a: 4, b: 23, c: rando(), d: rando() },
  { name: 'D', a: 51, b: 22, c: rando(), d: rando() },
  { name: 'F', a: 6, b: 51, c: rando(), d: rando() },
  { name: 'G', a: 7, b: 20, c: rando(), d: rando() },
  { name: 'H', a: 8, b: 19, c: rando(), d: rando() },
  { name: 'I', a: 9, b: 18, c: rando(), d: rando() },
  { name: 'J', a: 11, b: 17, c: rando(), d: rando() },
  { name: 'K', a: 12, b: 16, c: rando(), d: rando() },
  { name: 'L', a: 13, b: 15, c: rando(), d: rando() },
  { name: 'M', a: 14, b: 14, c: rando(), d: rando() },
  { name: 'N', a: 15, b: 13, c: rando(), d: rando() },
  { name: 'O', a: 16, b: 12, c: rando(), d: rando() },
  { name: 'P', a: 17, b: 11, c: rando(), d: rando() },
  { name: 'Q', a: 18, b: 10, c: rando(), d: rando() },
  { name: 'R', a: 19, b: 9, c: rando(), d: rando() },
  { name: 'S', a: 21, b: 8, c: rando(), d: rando() },
  { name: 'T', a: 22, b: 7, c: rando(), d: rando() },
  { name: 'U', a: 24, b: 6, c: rando(), d: rando() },
  { name: 'V', a: 23, b: 5, c: rando(), d: rando() },
  { name: 'W', a: 52, b: 50, c: rando(), d: rando() },
  { name: 'X', a: 26, b: 3, c: rando(), d: rando() },
  { name: 'Y', a: 27, b: 2, c: rando(), d: rando() },
  { name: 'Z', a: 28, b: 1, c: rando(), d: rando() },
];

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
let chart, menu;

const letters = data;
const options = d3.keys(letters[0]).filter(key => key !== 'name');

const x = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(0.1)
  .paddingOuter(0.1);

const y = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y);

const LearnBarChart = () => {
  useEffect(() => {
    chart = d3
      .select('#barChartTrans')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
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

    menu = d3.select('#learnMenu select').on('change', change);

    menu
      .selectAll('option')
      .data(options)
      .enter()
      .append('option')
      .text(d => d);

    menu.property('value', options[0]);

    redraw();
  });

  function change() {
    redraw();
  }

  function redraw() {
    const t = d3.transition().duration(1500);
    const option1 = menu.property('value');
    const top = letters.sort((a, b) => b[option1] - a[option1]).slice(0, 10);

    x.domain(top.map(d => d.name));
    y.domain([0, d3.max(top, d => d[option1])]);
    yAxis.ticks(10);

    let bar = chart.selectAll('.bar').data(top, d => d.name);

    bar.join(
      enter =>
        enter
          .append('rect')
          .attr('class', 'bar')
          .attr('x', 0)
          .attr('y', d => y(d[option1]))
          .attr('height', d => height - y(d[option1]))
          .attr('width', x.bandwidth())
          .style('fill-opacity', 0)
          .call(enter =>
            enter
              .transition(t)
              .attr('x', d => x(d.name))
              .style('fill-opacity', 1)
          ),
      update =>
        update.call(update =>
          update
            .transition(t)
            .attr('y', d => y(d[option1]))
            .attr('height', d => height - y(d[option1]))
            .attr('x', d => x(d.name))
        ),
      exit =>
        exit.call(exit =>
          exit
            .transition(t)
            .style('fill-opacity', 0)
            .attr('x', 960 + margin.left + margin.right)
            .remove()
        )
    );

    d3.transition(chart)
      .select('.x.axis')
      .call(xAxis);

    d3.transition(chart)
      .select('.y.axis')
      .call(yAxis);
  }

  return (
    <>
      <svg id="barChartTrans" />
      <p id="learnMenu">
        <b>Select</b>
        <br />
        Age: <select></select>
      </p>
    </>
  );
};

export default LearnBarChart;
