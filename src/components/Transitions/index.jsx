import React from 'react';
import Chart from '../Chart';
import MovingLetters from './MovingLetters';
import JoinKeyFunction from './JoinKeyFunction';

const index = () => (
  <>
    <Chart title="Moving letters">
      <MovingLetters />
    </Chart>
    <Chart title="Adding Elements">
      <JoinKeyFunction />
    </Chart>
  </>
);

export default index;
