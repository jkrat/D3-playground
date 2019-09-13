import React from 'react';
import Chart from '../Chart';
import BarChartPolished from './Polished';
import VerticalBar from './VerticalBar';
import AnimatedHorizontal from './AnimatedHorizontalBar';
import HorizontalStack from './HorizontalStack';
import VerticalStack from './VerticalStack';
import PositiveNegative from './PositiveNegative';
import Grouped from './Grouped';

const index = () => (
  <>
    <Chart title="Grouped">
      <Grouped />
    </Chart>
    <Chart title="Animated Horizontal">
      <AnimatedHorizontal />
    </Chart>
    <Chart title="Positive Negative">
      <PositiveNegative />
    </Chart>
    <Chart title="Vertivcal Stack">
      <VerticalStack />
    </Chart>
    <Chart title="Horizontal Stack">
      <HorizontalStack />
    </Chart>
    <Chart title="Animated Vertical">
      <VerticalBar />
    </Chart>
    <Chart title="Sorted With Axis">
      <BarChartPolished />
    </Chart>
  </>
);

export default index;
