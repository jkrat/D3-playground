import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

function update(data) {
  const u = d3
    .select('#keyFunction')
    .selectAll('div')
    .data(data, d => d);

  u.enter()
    .append('div')
    .merge(u)
    .transition()
    .style('left', (d, i) => `${i * 45}px`)
    .text(d => d);
}

const JoinKeyFunction = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let i = 25;

  function doInsert() {
    if (i < 0) return;

    const myData = letters.slice(i).split('');
    i--;
    update(myData);
  }

  useEffect(() => {
    doInsert();
  });

  return (
    <>
      <div id="keyFunction" />
      <button type="button" onClick={doInsert}>
        insert element
      </button>
    </>
  );
};

export default JoinKeyFunction;
