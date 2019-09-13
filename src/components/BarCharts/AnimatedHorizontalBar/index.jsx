import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import './style.css';
import { data } from './data';

const margin = { top: 20, right: 40, bottom: 10, left: 40 };
const width = 960;
const height = 250 - margin.top - margin.bottom;

const format = d3.format('.1%');
let chart;
let age;
let menu;

const x = d3.scaleLinear().range([0, width]);

const y = d3
  .scaleBand()
  .rangeRound([0, height])
  .padding(0.05);

const xAxis = d3
  .axisTop(x)
  .tickSize(-height - margin.bottom)
  .tickFormat(format);

const states = data;

const ages = d3
  .keys(states[0])
  .filter(key => key !== 'State' && key !== 'Total');

const AnimatedHorizontalBar = () => {
  useEffect(() => {
    chart = d3
      .select('#Popchart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('margin-left', `${-margin.left}px`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

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
      .text(d => d);

    menu.property('value', '18 to 24 Years');

    redraw();
  });

  function redraw() {
    const t = d3.transition().duration(1000);
    let age1 = menu.property('value');
    const top = states.sort((a, b) => b[age1] - a[age1]).slice(0, 5);

    y.domain(top.map(d => d.State));
    x.domain([0, top[0][age1]]);

    let bar = chart.selectAll('.bar').data(top, d => d.State);

    bar.join(
      enter => {
        let barEnter = enter
          .insert('g', '.Caxis')
          .attr('class', 'bar')
          .attr('transform', `translate(0, ${height})`)
          .style('fill-opacity', 0);

        barEnter
          .append('rect')
          .attr('width', d => x(d[age1]))
          .attr('height', y.bandwidth());

        barEnter
          .append('text')
          .attr('class', 'label')
          .attr('x', -3)
          .attr('y', y.bandwidth() / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'end')
          .text(d => d.State);

        barEnter
          .append('text')
          .attr('class', 'value')
          .attr('x', d => x(d[age1]) - 3)
          .attr('y', y.bandwidth() / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'end')
          .text(d => format(d[age1]));

        barEnter.call(barEnter =>
          barEnter
            .transition(t)
            .attr('transform', d => `translate(0, ${y(d.State)})`)
            .style('fill-opacity', 1)
        );
      },
      update => {
        update
          .transition(t)
          .select('.value')
          .attr('x', d => x(d[age1]) - 3)
          .text(d => format(d[age1]));

        update.call(update =>
          update
            .transition(t)
            .attr('transform', d => `translate(0, ${y(d.State)})`)
            .style('fill-opacity', 1)
            .select('rect')
            .attr('width', d => x(d[age1]))
        );
      },
      exit => {
        exit.call(exit =>
          exit
            .transition(t)
            .attr('transform', d => `translate(0, ${height})`)
            .style('fill-opacity', 0)
            .remove()
        );
      }
    );

    d3.transition(t)
      .select('.x.Caxis')
      .call(xAxis);
  }

  return (
    <>
      <p id="Popchart" />
      <p id="menu">
        <b>Top States by Age Bracket, 2008</b>
        <br />
        Age: <select></select>
      </p>
    </>
  );
};

export default AnimatedHorizontalBar;
