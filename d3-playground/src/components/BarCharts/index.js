import React from 'react';
import BarChartSVG from './SVG';
import BarChartVertical from './Vertical';
import BarChartPolished from './avcPolished';
import VerticalBar from './VerticalBar';
import AnimatedHorizontal from './AnimatedHorizontalBar';

const index = () => {
  return (
    <>
      <div className="chart">
        <AnimatedHorizontal />
      </div>
      <div className="chart">
        <VerticalBar />
      </div>
      <div className="chart">
        <BarChartPolished />
      </div>
      <div className="chart">
        <BarChartVertical />
      </div>
      <div className="chart">
        <BarChartSVG />
      </div>
    </>
  );
};

export default index;
