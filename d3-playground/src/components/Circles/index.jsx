import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

// Entering and Exiting data points form existing set

const Circles = () => {
  useEffect(() => {
    var svg = d3.select('#circleSVG');
    var circle = svg
      .selectAll('circle')
      .data([32, 57, 122, 293])
      .attr('r', function(d) {
        return Math.sqrt(d);
      })
      .attr('cx', function(d, i) {
        return i * 100 + 30;
      });

    var circleEnter = circle.enter().append('circle');

    circleEnter
      .attr('cy', 60)
      .attr('cx', function(d, i) {
        return i * 100 + 30;
      })
      .attr('r', function(d) {
        return Math.sqrt(d);
      });

    circle.exit().remove();
  });

  return (
    <svg width="720" height="120" id="circleSVG">
      <circle cx="40" cy="60" r="10"></circle>
      <circle cx="80" cy="60" r="10"></circle>
      <circle cx="120" cy="60" r="10"></circle>
    </svg>
  );
};

export default Circles;
