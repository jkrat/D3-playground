import React from 'react';
import Chart from '../Chart';
import BasicPie from './BasicPie';
import BasicDonut from './BasicDonut';

const index = () => (
  <>
    <Chart title="Basic Donut">
      <BasicDonut />
    </Chart>
    <Chart title="Basic Pie">
      <BasicPie />
    </Chart>
  </>
);

export default index;
