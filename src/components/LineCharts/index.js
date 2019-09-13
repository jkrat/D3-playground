import React from 'react';
import Chart from '../Chart';
import StaticLine from './staticLine';
import StaticArea from './StaticArea';
import PosNegLine from './PosNegLine';

const index = () => (
  <>
    <Chart title="Pos Neg Line">
      <PosNegLine />
    </Chart>
    <Chart title="Static Area">
      <StaticArea />
    </Chart>
    <Chart title="Static Line">
      <StaticLine />
    </Chart>
  </>
);

export default index;
