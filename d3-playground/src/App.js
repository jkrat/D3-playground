import React from 'react';
import './App.css';
import BarChart1 from './components/BarChart1';
import Circles from './components/Circles';
import AnimatedHorizontalBar from './components/transitions/AnimatedHorizontalBar';
import MovingLetters from './components/MovingLetters';
import AnimatedVerticalBar from './components/transitions/VerticalBar';

function App() {
  return (
    <>
      <div className="App-header">
        <h5>D3 playground</h5>
        <h5>Home</h5>
      </div>
      <div className="App-body">
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
