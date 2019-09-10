import React from 'react';
import BasicPie from './BasicPie';
import BasicDonut from './BasicDonut';

const index = () => {
  return (
    <>
      <div className="chart">
        <BasicDonut />
      </div>
      <div className="chart">
        <BasicPie />
      </div>
    </>
  );
};

export default index;
