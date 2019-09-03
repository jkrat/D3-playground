import React, { useEffect } from 'react';
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import './style.css';

var data = [
{name: 'A', value:	.08167},
{name: 'B', value:	.01492},
{name: 'C', value:	.02782},
{name: 'D', value:	.04253},
{name: 'E', value:	.12702},
{name: 'F', value:	.02288},
{name: 'G', value:	.02015},
{name: 'H', value:	.06094},
{name: 'I', value:	.06966},
{name: 'J', value:	.00153},
{name: 'K', value:	.00772},
{name: 'L', value:	.04025},
{name: 'M', value:	.02406},
{name: 'N', value:	.06749},
{name: 'O', value:	.07507},
{name: 'P', value:	.01929},
{name: 'Q', value:	.00095},
{name: 'R', value:	.05987},
{name: 'S', value:	.06327},
{name: 'T', value:	.09056},
{name: 'U', value:	.02758},
{name: 'V', value:	.00978},
{name: 'W', value:	.02360},
{name: 'X', value:	.00150},
{name: 'Y', value:	.01974},
{name: 'Z', value:	.00074}
];

const width = 780,
      height = 500;

const y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.value; })])
  .range([height, 0]);

const BarChart1 = () => {
  
  useEffect(() => {
    var chart = d3.select("#firstChart")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)";
  });

    bar.append("rect")
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", barWidth - 1);
    
    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d.value) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });
  });

  

  return (
  <svg id="firstChart" />
)
  };

export default BarChart1;