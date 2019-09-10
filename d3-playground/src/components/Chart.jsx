import React from 'react';

const Chart = ({ title, children }) => {
  const divStyle = {
    margin: '20px 0px',
  };

  return (
    <div style={divStyle}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Chart;
