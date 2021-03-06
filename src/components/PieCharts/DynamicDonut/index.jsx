import React, { useEffect } from 'react';
import * as d3 from 'd3';

const width = 960;
const height = Math.min(width, 500);
const radius = height / 2;

const color = d3.scaleOrdinal(['#bab0ab'].concat(d3.schemeTableau10));
let chart;

const pieGenerator = values =>
  d3
    .pie()
    .sort(null)
    .value(d => d)(values);

const arcGenerator = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

const DynamicDonut = ({ data }) => {
  const initialData = [];
  initialData.push(1);
  for (let i = 0; i < data.length; i++) {
    initialData.push(0);
  }

  useEffect(() => {
    chart = d3
      .select('#DynamicDonut')
      .attr('viewBox', [-487.5, -250, 975, 500])
      .append('g');
  }, []);

  useEffect(() => {
    createChart(initialData);
    setTimeout(function() {
      const chartData = [0].concat(data);
      createChart(chartData);
    }, 1);
  }, [data]);

  function createChart(dataSet) {
    const t = d3.transition().duration(1000);
    const arcs = pieGenerator(dataSet);
    const path = chart
      .datum(dataSet)
      .selectAll('path')
      .data(arcs);

    path.join(
      enter =>
        enter
          .append('path')
          .attr('fill', (d, i) => color(i))
          .attr('d', arcGenerator)
          .each(function(d) {
            this.current = d;
          })
          .call(enter => enter.transition(t).attrTween('d', arcTween)),
      update => update.transition(t).attrTween('d', arcTween),
      exit => exit.remove()
    );
  }

  function arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(0);
    return t => arcGenerator(i(t));
  }

  return <svg id="DynamicDonut" />;
};

export default DynamicDonut;
