import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import './style.css';
import { data } from './data';

let margin = { top: 20, right: 40, bottom: 10, left: 40 },
  width = 960,
  height = 300 - margin.top - margin.bottom;

let format = d3.format('.1%'),
  chart,
  age,
  menu;

let x = d3.scaleLinear().range([0, width]);

let y = d3
  .scaleBand()
  .range([0, height])
  .padding(0.1);

let xAxis = d3
  .axisTop(x)
  .tickSize(-height - margin.bottom)
  .tickFormat(format);

let states = data;

let ages = d3.keys(states[0]).filter(function(key) {
  return key != 'State' && key != 'Total';
});

const CensusBarChart = () => {
  useEffect(() => {
    chart = d3
      .select('#Popchart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('margin-left', -margin.left + 'px')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    chart.append('g').attr('class', 'x Caxis');

    chart
      .append('g')
      .attr('class', 'y Caxis')
      .append('line')
      .attr('class', 'domain')
      .attr('y2', height);

    menu = d3.select('#menu select').on('change', redraw);

    menu
      .selectAll('option')
      .data(ages)
      .enter()
      .append('option')
      .text(function(d) {
        return d;
      });

    menu.property('value', '18 to 24 Years');

    redraw();
  });

  function redraw() {
    const t = d3.transition().duration(1500);
    const age1 = menu.property('value');
    const top = states.sort((a, b) => b[age1] - a[age1]).slice(0, 3);

    y.domain(top.map(d => d.State));

    let bar = chart.selectAll('.bar').data(top, d => d.State);

    bar.join(enter => {
      let barEnter = enter
        .insert('g', '.Caxis')
        .attr('class', 'bar')
        .attr('transform', d => `translate(0, ${y(d.State) + height})`);

      barEnter
        .append('rect')
        .attr('width', d => x(d[age1]))
        .attr('height', y.bandwidth());

      return barEnter;
    });

    // let barEnter = bar
    //   .enter()
    //   .insert('g', '.Caxis')
    //   .attr('class', 'bar')
    //   .attr('transform', d => `translate(0, ${y(d.State) + height})`)
    //   .style('fill-opacity', 0);

    // barEnter
    //   .append('rect')
    //   .attr('width', age && (d => x(d[age])))
    //   .attr('height', y.bandwidth());

    // barEnter
    //   .append('text')
    //   .attr('class', 'label')
    //   .attr('x', -3)
    //   .attr('y', y.bandwidth() / 2)
    //   .attr('dy', '.35em')
    //   .attr('text-anchor', 'end')
    //   .text(d => d.State);

    // barEnter
    //   .append('text')
    //   .attr('class', 'value')
    //   .attr('x', age && (d => x(d[age]) - 3))
    //   .attr('y', y.bandwidth() / 2)
    //   .attr('dy', '.35em')
    //   .attr('text-anchor', 'end');

    // x.domain([0, top[0][(age = age1)]]);

    // if (bar.length > 0) {
    //   let barUpdate = d3
    //     .transition(bar)
    //     .attr('transform', d => `translate(0,${(d.y0 = y(d.State))})`)
    //     .style('fill-opacity', 1);

    //   barUpdate.select('rect').attr('width', d => x(d[age]));

    //   barUpdate
    //     .select('.value')
    //     .attr('x', d => x(d[age]) - 3)
    //     .text(d => format(d[age]));

    //   let barExit = d3
    //     .transition(bar.exit())
    //     .attr('transform', d => `translate(0, ${d.y0 + height})`)
    //     .style('fill-opacity', 0)
    //     .remove();

    //   barExit.select('rect').attr('width', d => x(d[age]));

    //   barExit
    //     .select('.value')
    //     .attr('x', d => x(d[age]) - 3)
    //     .text(d => format(d[age]));

    d3.transition(chart)
      .select('.x.axis')
      .call(xAxis);
  }

  return (
    <>
      <div id="Popchart" />
      <p id="menu">
        <b>Top States by Age Bracket, 2008</b>
        <br />
        Age: <select></select>
      </p>
    </>
  );
};

export default CensusBarChart;
