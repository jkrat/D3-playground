/* eslint-disable react/prop-types */
import React from 'react';
import PieCharts from './PieCharts';
import LineCharts from './LineCharts';
import BarCharts from './BarCharts';
import GridCharts from './GridCharts';
import MiscCharts from './MiscCharts';
import Transitions from './Transitions';
import Current from './Current';

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
    case 'Grid':
      return GridCharts;
    case 'Transition':
      return Transitions;
    default:
      return Current;
  }
}

const TypeSelect = ({ type, ...restProps }) => {
  const Type = selectType(type);

  return <>{<Type {...restProps} />}</>;
};

export default TypeSelect;
