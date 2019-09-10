import React, { useEffect } from 'react';
import * as d3 from 'd3';

function gridData(size) {
  let data = [];
  let xpos = 1;
  let ypos = 1;
  let click = 0;

  for (let row = 0; row < 10; row++) {
    data.push([]);

    for (let column = 0; column < 10; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: size,
        height: size,
        click: Math.random(),
      });
      xpos += size;
    }
    xpos = 1;
    ypos += size;
  }
  return data;
}

const Grid = ({ squares, dimensions, margin }) => {
  const width = dimensions - margin * 2;
  const height = dimensions - margin * 2;
  const gridSize = Math.floor(width / squares);
  const data = gridData(gridSize);

  useEffect(() => {
    const chart = d3
      .select('#createGrid')
      .attr('width', width + margin * 2)
      .attr('height', height + margin * 2)
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);

    const row = chart
      .selectAll('.row')
      .data(data, d => d)
      .enter()
      .append('g')
      .attr('class', 'row');

    const column = row
      .selectAll('.square')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('class', 'square')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .style('fill', d => d3.interpolateBlues(d.click))
      .style('stroke', '#222')
      .on('mouseover', function(d) {
        d.click += 0.2;
        d3.select(this).style('fill', d => d3.interpolateBlues(d.click));
      })
      .on('click', function(d) {
        d.click = 0;
        d3.select(this).style('fill', d => d3.interpolateBlues(d.click));
      });
  });

  return <svg id="createGrid" />;
};

export default Grid;
