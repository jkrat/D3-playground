import React from 'react';
import Chart from '../Chart';
import InteractiveGrid from './InteractiveGrid';
import HourHeatMap from './HourHeatMap';

const index = () => (
  <>
    <Chart title="Interactive Grid">
      <InteractiveGrid squares={10} dimensions={440} margin={40} />
    </Chart>
    <Chart title="Hour Heat Map">
      <HourHeatMap />
    </Chart>
  </>
);

export default index;
