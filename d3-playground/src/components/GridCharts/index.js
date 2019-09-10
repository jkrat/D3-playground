import React from 'react';
import InteractiveGrid from './InteractiveGrid';
import HourHeatMap from './HourHeatMap';

const index = () => {
  return (
    <>
      <div className="chart">
        <InteractiveGrid squares={10} dimensions={440} margin={40} />
      </div>
      <div className="chart">
        <HourHeatMap />
      </div>
    </>
  );
};

export default index;
