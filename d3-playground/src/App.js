import React, { useState } from 'react';
import './App.css';
import TypeSelect from './components/TypeSelect';
import BarChart1 from './components/BarChart1';
import Circles from './components/Circles';
import AnimatedHorizontalBar from './components/Transitions/AnimatedHorizontalBar';
import MovingLetters from './components/MovingLetters';
import AnimatedVerticalBar from './components/Transitions/VerticalBar';
import HourHeatMap from './components/HeatMap/HourHeatMap';
import PieChart1 from './components/PieChart/PieChart1';
import DonutChart1 from './components/PieChart/DonutChart';
import Grid from './components/Grid';
import KeyFunction from './components/basic/JoinKeyFunction';

function App() {
  const [chartType, setChartType] = useState(null);

  const handleChange = e => {
    setChartType(e.target.value);
  };

  return (
    <>
      <div className="App-header">
        <h5>Home</h5>
        <h5>D3 playground</h5>
        <select onChange={handleChange}>
          <option>Pie</option>
          <option>Line</option>
        </select>
      </div>
      <div className="App-body">
        <TypeSelect type={chartType} />
        <div className="chart">
          <Grid squares={10} dimensions={440} margin={40} />
        </div>
        <div className="chart">
          <DonutChart1 />
        </div>
        <div className="chart">
          <PieChart1 />
        </div>
        <div className="chart">
          <HourHeatMap />
        </div>
        <div className="chart">
          <AnimatedHorizontalBar />
        </div>
        <div className="chart">
          <AnimatedVerticalBar />
        </div>
        <div className="chart">
          <MovingLetters />
        </div>
        <div className="chart">
          <KeyFunction />
        </div>
        <div className="chart">
          <Circles />
        </div>
        <div className="chart">
          <BarChart1 />
        </div>
      </div>
    </>
  );
}

export default App;
