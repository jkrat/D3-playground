import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import './data.tsv';
import './style.css';

var howDataParsedFrommTSVLooks = [
  { name: 'Locke', value: 4 },
  { name: 'Reyes', value: 8 },
  { name: 'Ford', value: 15 },
  { name: 'Jarrah', value: 16 },
  { name: 'Shephard', value: 23 },
  { name: 'Kwon', value: 42 },
];

const width = 420,
  barHeight = 20;

const x = d3.scaleLinear().range([0, width]);

const BarChart1 = () => {
  useEffect(() => {
    var chart = d3.select('#barChartExternalData').attr('width', width);

    d3.tsvParse('./data.tsv', type, function(error, data) {
      x.domain([
        0,
        d3.max(data, function(d) {
          return d.value;
        }),
      ]);

      chart.attr('height', barHeight * data.length);

      var bar = chart
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
          return 'translate(0,' + i * barHeight + ')';
        });

      bar
        .append('rect')
        .attr('width', function(d) {
          return x(d.value);
        })
        .attr('height', barHeight - 1);

      bar
        .append('text')
        .attr('x', function(d) {
          return x(d.value) - 3;
        })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d) {
          return d.value;
        });
    });

    function type(d) {
      d.value = +d.value; // coerce to number
      return d;
    }
  });

  return <svg id="barChartExternalData" />;
};

export default BarChart1;
