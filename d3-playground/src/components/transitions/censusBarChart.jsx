/* eslint-disable */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import './style.css';
import { data } from './data';

let margin = { top: 20, right: 40, bottom: 10, left: 40 },
  width = 960,
  height = 300 - margin.top - margin.bottom;

let format = d3.format('.1%'),
  age;

let x = d3.scaleLinear().range([0, width]);

let y = d3
  .scaleBand()
  .range([0, height])
  .paddingInner(0.1)
  .paddingOuter(0.1);

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
    let svg = d3
      .select('#Popchart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('margin-left', -margin.left + 'px')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('g').attr('class', 'x axis');

    svg
      .append('g')
      .attr('class', 'y axis')
      .append('line')
      .attr('class', 'domain')
      .attr('y2', height);

    let menu = d3.select('#menu select').on('change', change);

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

    let altKey;

    d3.select(window)
      .on('keydown', function() {
        altKey = d3.event.altKey;
      })
      .on('keyup', function() {
        altKey = false;
      });

    function change() {
      d3.transition()
        .duration(altKey ? 7500 : 750)
        .each(redraw);
    }

    function redraw() {
      const age1 = menu.property('value');
      const top = states
        .sort(function(a, b) {
          return b[age1] - a[age1];
        })
        .slice(0, 2);

      //   y.domain(
      //     top.map(function(d) {
      //       return d.State;
      //     })
      //   );

      let bar = svg.selectAll('.bar').data(top, function(d) {
        return d.State;
      });

      //   let barEnter = bar
      //     .enter()
      //     .insert('g', '.axis')
      //     .attr('class', 'bar')
      //     .attr('transform', function(d) {
      //       return 'translate(0,' + (y(d.State) + height) + ')';
      //     })
      //     .style('fill-opacity', 0);

      //   barEnter
      //     .append('rect')
      //     .attr(
      //       'width',
      //       age &&
      //         function(d) {
      //           return x(d[age]);
      //         }
      //     )
      //     .attr('height', y.bandwidth());

      //   barEnter
      //     .append('text')
      //     .attr('class', 'label')
      //     .attr('x', -3)
      //     .attr('y', y.bandwidth() / 2)
      //     .attr('dy', '.35em')
      //     .attr('text-anchor', 'end')
      //     .text(function(d) {
      //       return d.State;
      //     });

      //   barEnter
      //     .append('text')
      //     .attr('class', 'value')
      //     .attr(
      //       'x',
      //       age &&
      //         function(d) {
      //           return x(d[age]) - 3;
      //         }
      //     )
      //     .attr('y', y.bandwidth() / 2)
      //     .attr('dy', '.35em')
      //     .attr('text-anchor', 'end');

      //   x.domain([0, top[0][(age = age1)]]);

      //   if (bar.length > 0) {
      //     let barUpdate = d3
      //       .transition(bar)
      //       .attr('transform', function(d) {
      //         return 'translate(0,' + (d.y0 = y(d.State)) + ')';
      //       })
      //       .style('fill-opacity', 1);

      //     barUpdate.select('rect').attr('width', function(d) {
      //       return x(d[age]);
      //     });

      //     barUpdate
      //       .select('.value')
      //       .attr('x', function(d) {
      //         return x(d[age]) - 3;
      //       })
      //       .text(function(d) {
      //         return format(d[age]);
      //       });

      //     let barExit = d3
      //       .transition(bar.exit())
      //       .attr('transform', function(d) {
      //         return 'translate(0,' + (d.y0 + height) + ')';
      //       })
      //       .style('fill-opacity', 0)
      //       .remove();

      //     barExit.select('rect').attr('width', function(d) {
      //       return x(d[age]);
      //     });

      //     barExit
      //       .select('.value')
      //       .attr('x', function(d) {
      //         return x(d[age]) - 3;
      //       })
      //       .text(function(d) {
      //         return format(d[age]);
      //       });

      //     d3.transition(svg)
      //       .select('.x.axis')
      //       .call(xAxis);
    }
    // }
  });

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
