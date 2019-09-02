import React from 'react';
import './App.css';
import BarChartHTML from './components/BarChart1/HTML/BarChart';
import BarChartSVG from './components/BarChart1/SVG/BarChart';

function App() {
  return (
    <>
      <div className="App-header">
        <h5>D3 playground</h5>
        <h5>Home</h5>
      </div>
      <div className="App-body">
        <div className="chart">
          <BarChartHTML />
          {/* <BarChartSVG /> */}
        </div>
      </div>
    </>
  );
}

export default App;
