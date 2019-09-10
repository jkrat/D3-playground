import React from 'react';
import MovingLetters from './MovingLetters';
import JoinKeyFunction from './JoinKeyFunction';
import Circles from './Circles';

const index = () => {
  return (
    <>
      <div className="chart">
        <MovingLetters />
      </div>
      <div className="chart">
        <JoinKeyFunction />
      </div>
      <div className="chart">
        <Circles />
      </div>
    </>
  );
};

export default index;
