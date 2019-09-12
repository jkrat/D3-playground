import React from 'react';
import Chart from '../Chart';
import BarChartSVG from './SVG';
import BarChartVertical from './Vertical';
import BarChartPolished from './Polished';
import VerticalBar from './VerticalBar';
import AnimatedHorizontal from './AnimatedHorizontalBar';
import HorizontalStack from './HorizontalStack';

const index = () => (
  <>
    <Chart title="Animated Horizontal">
      <AnimatedHorizontal />
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
    <Chart title="SVG Vertical">
      <BarChartVertical />
    </Chart>
    <Chart title="SVG Horizontal">
      <BarChartSVG />
    </Chart>
  </>
);

export default index;
