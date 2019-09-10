/* eslint-disable react/prop-types */
import React from 'react';
import PieCharts from './PieCharts';
import LineCharts from './LineCharts';
import BarCharts from './BarCharts';
import GridCharts from './GridCharts';
import MiscCharts from './MiscCharts';
import Transitions from './Transitions';

function selectType(layout) {
  switch (layout) {
    case 'Pie':
      return PieCharts;
    case 'Line':
      return LineCharts;
    case 'Bar':
      return BarCharts;
    case 'Misc':
      return MiscCharts;
    case 'grid':
      return GridCharts;
    case 'Transitions':
      return Transitions;
    default:
      return null;
  }
}

const TypeSelect = ({ type, ...restProps }) => {
  const Type = selectType(type);

  return <Type {...restProps} />;
};

export default TypeSelect;
