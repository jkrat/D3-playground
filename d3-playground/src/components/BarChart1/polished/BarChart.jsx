import React, { useEffect } from 'react';
import * as d3 from "d3";
import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
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

const margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const x = d3.scaleBand()
    .domain(data.sort((a, b) => b.value - a.value).map(function(d) { return d.name }))
    .range([0, width])
    .paddingInner(.1)
    .paddingOuter(.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.value; })])
  .range([height, 0]);

const xAxis = d3.axisBottom(x)

const yAxis = d3.axisLeft(y)
    .ticks(10, "%");

const BarChart1 = () => {

  useEffect(() => {
    var chart = d3.select("#firstChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    var bar = chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .attr("width", x.bandwidth());  
  });

  return (
  <svg id="firstChart" />
)
  };

export default BarChart1;