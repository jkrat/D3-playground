import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

const MovingLetters = () => {
  const width = 975;
  const t = d3.transition().duration(750);
  let data;
  let chart;

  function randomLetters() {
    data = d3
      .shuffle('abcdefghijklmnopqrstuvwxyz'.split(''))
      .slice(0, Math.floor(6 + Math.random() * 20))
      .sort();
  }

  function assignData() {
    randomLetters();
    chart
      .selectAll('text')
      .data(data, d => d)
      .join(
        enter =>
          enter
            .append('text')
            .attr('fill', 'green')
            .attr('x', (d, i) => i * 16)
            .attr('y', -30)
            .text(d => d)
            .call(enter => enter.transition(t).attr('y', 0)),
        update =>
          update
            .attr('fill', 'black')
            .attr('y', 0)
            .call(update => update.transition(t).attr('x', (d, i) => i * 16)),
        exit =>
          exit.attr('fill', 'brown').call(exit =>
            exit
              .transition(t)
              .attr('y', 30)
              .remove()
          )
      );
  }

  useEffect(() => {
    chart = d3
      .select('#MovingLetters')
      .attr('width', width)
      .attr('height', 33)
      .attr('viewBox', `0 -20 ${width} 33`);

    assignData();
  });

  return (
    <div className="movingText" id="movingText">
      <svg id="MovingLetters" />
      <button type="button" onClick={assignData}>
        change text
      </button>
    </div>
  );
};

export default MovingLetters;
