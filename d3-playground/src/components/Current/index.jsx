import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Chart from '../Chart';
import DynamicDonut from '../PieCharts/DynamicDonut';

const dataSet = {
  apples: [53245, 28479, 19697, 24037, 40245],
  oranges: [200, 200, 200, 200, 200],
  blueBerries: [300, 800, 1200, 100, 200],
};
const dataTypes = d3.keys(dataSet);

const Current = () => {
  const [data, setData] = useState({
    title: dataTypes[0],
    data: dataSet[dataTypes[0]],
  });

  function change() {
    const { value } = this;
    const newData = { title: value, data: dataSet[value] };
    setData(newData);
  }

  useEffect(() => {
    const menu = d3.select('#barMenu select').on('change', change);

    menu
      .selectAll('option')
      .data(dataTypes)
      .enter()
      .append('option')
      .text(d => d);

    menu.property('value', dataTypes[0]);
  }, []);

  return (
    <Chart title="Current">
      <p id="barMenu">
        <b>Choose data</b>
        <br />
        <select></select>
      </p>
      <DynamicDonut title={data.title} data={data.data} />
    </Chart>
  );
};

export default Current;
