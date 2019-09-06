import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

let width = 30;

const Circles = () => {
  useEffect(() => {
    var chart = d3
      .select('#MovingLetters')
      .attr('width', width)
      .attr('height', 33)
      .attr('viewBox', `0 -20 ${width} 33`);

      while (true){
    chart
      .selectAll('text')
      .data(randomLetters())
      .join('text')
      .attr('x', (d, i) => i * 16)
      .text(d => d);

      

    function randomLetters() {
      return d3
        .shuffle('abcdefghijklmnopqrstuvwxyz'.split(''))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
    }
  });

  return <div id="MovingLetters" />;
};

export default Circles;
