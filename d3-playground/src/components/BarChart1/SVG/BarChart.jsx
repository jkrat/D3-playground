import React, { useEffect } from 'react';
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import './style.css';

const data = [4, 8, 15, 16, 23, 42, 29];

const width = 420,
      barHeight = 20;

const x = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);

const BarChart1 = () => {
  
  useEffect(() => {
    var chart = d3.select("#firstChart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")";
  });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);
    
    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
  });

  

  return (
  <svg id="firstChart" />
)
  };

export default BarChart1;