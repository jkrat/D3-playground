import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Chart from '../../Chart';
import Bullet from './index';
import { dataSet } from './data';

const BulletData = () => {
  const [data, setData] = useState(dataSet.set1);

  function goSet1() {
    setData(dataSet.set1);
  }
  function goSet2() {
    setData(dataSet.set2);
  }

  return (
    <Chart title="Bullet Horizontal">
      <p id="BulletMenu">
        <button onClick={goSet1}>set 1</button>
        <button onClick={goSet2}>set 2</button>
      </p>
      <Bullet data={data} />
    </Chart>
  );
};

export default BulletData;
