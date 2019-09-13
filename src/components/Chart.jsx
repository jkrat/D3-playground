import React from 'react';

const Chart = ({ title, children }) => {
  const divStyle = {
    margin: '20px 0px',
  };

  return (
    <div style={divStyle}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Chart;
