import React from 'react';
import Chart from '../Chart';
import MovingLetters from './MovingLetters';
import JoinKeyFunction from './JoinKeyFunction';
import Circles from './Circles';

const index = () => (
  <>
    <Chart title="Moving letters">
      <MovingLetters />
    </Chart>
    <Chart title="Adding Elements">
      <JoinKeyFunction />
    </Chart>
    <Chart title="Circles">
      <Circles />
    </Chart>
  </>
);

export default index;
