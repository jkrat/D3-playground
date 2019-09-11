import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Chart from '../Chart';
import StaticLine from '../LineCharts/staticLine';

const Current = () => {
  const [data, setData] = useState();

  return (
    <Chart title="Current">
      <StaticLine />
    </Chart>
  );
};

export default Current;

// const [data, setData] = useState({
//   title: dataTypes[0],
//   data: dataSet[dataTypes[0]],
// });

// function change() {
//   const { value } = this;
//   const newData = { title: value, data: dataSet[value] };
//   setData(newData);
// }

// useEffect(() => {
//   const menu = d3.select('#bar2Menu select').on('change', change);

//   menu
//     .selectAll('option')
//     .data(dataTypes)
//     .enter()
//     .append('option')
//     .text(d => d);

//   menu.property('value', dataTypes[0]);
// }, []);
