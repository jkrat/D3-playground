import React from 'react';
import './App.css';
// import BarChartHTML from './components/BarChart1/HTML/BarChart';
// import BarChartSVG from './components/BarChart1/SVG/BarChart';
// import BarChartVertical from './components/BarChart1/Vertical/BarChart';
import BarChartPolished from './components/BarChart1/polished/BarChart';

function App() {
  return (
    <>
      <div className="App-header">
        <h5>D3 playground</h5>
        <h5>Home</h5>
      </div>
      <div className="App-body">
        <div className="chart">
          {/* <BarChartHTML /> */}
          {/* <BarChartSVG /> */}
          {/* <BarChartVertical /> */}
          <BarChartPolished />
        </div>
      </div>
    </>
  );
}

export default App;
