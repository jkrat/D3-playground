import React from 'react';
import Chart from '../Chart';
import BasicPie from './BasicPie';
import BasicDonut from './BasicDonut';
import DynamicData from './DynamicData';
import StaticData from './StaticData';

const index = () => (
  <>
    <DynamicData />
    <StaticData />
    <Chart title="Labeled Donut">
      <BasicDonut />
    </Chart>
    <Chart title="Labeled Pie">
      <BasicPie />
    </Chart>
  </>
);

export default index;
