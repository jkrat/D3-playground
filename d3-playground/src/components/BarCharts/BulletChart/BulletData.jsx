import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Chart from '../../Chart';
import Bullet from './index';
import { dataSet } from './data';

const dataTypes = d3.keys(dataSet);

const BulletData = () => {
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
    const menu = d3.select('#BulletMenu select').on('change', change);

    menu
      .selectAll('option')
      .data(dataTypes)
      .enter()
      .append('option')
      .text(d => d);

    menu.property('value', dataTypes[0]);
  }, []);

  return (
    <Chart title="Bullet Horizontal">
      <p id="BulletMenu">
        <b>Choose data</b>
        <br />
        <select></select>
      </p>
      <Bullet title={data.title} data={data.data} />
    </Chart>
  );
};

export default BulletData;
