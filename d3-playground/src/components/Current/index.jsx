import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';
import Chart from '../Chart';

const Current = () => {
  useEffect(() => {});

  return (
    <Chart title="Current">
      <svg id="current" />
    </Chart>
  );
};

export default Current;
