import React, { useState } from 'react';
import './App.css';
import TypeSelect from './components/TypeSelect';

function App() {
  const [chartType, setChartType] = useState('Pie');

  const handleChange = e => {
    setChartType(e.target.value);
  };

  return (
    <>
      <div className="App-header">
        <h5>Home</h5>
        <h5>D3 playground</h5>
        <select className="select-css" onChange={handleChange}>
          <option>- Chart Types -</option>
          <option>Pie</option>
          <option>Line</option>
          <option>Bar</option>
          <option>Grid</option>
          <option>Misc</option>
          <option>Transition</option>
        </select>
      </div>
      <div className="App-body">
        <TypeSelect type={chartType} />
      </div>
    </>
  );
}

export default App;
