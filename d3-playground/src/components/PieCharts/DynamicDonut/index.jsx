import React, { useEffect } from 'react';
import * as d3 from 'd3';

const width = 960;
const height = Math.min(width, 500);
const radius = height / 2;

const color = d3.scaleOrdinal(d3.schemeCategory10);
let chart;

const arc = d3
  .arc()
  .innerRadius(radius * 0.67)
  .outerRadius(radius - 1);

const DynamicDonut = ({ title, data }) => {
  const pieGenerator = d3
    .pie()
    .sort(null)
    .value(d => d)(data);

  useEffect(() => {
    chart = d3
      .select('#DynamicDonut')
      .attr('viewBox', [-487.5, -250, 975, 500])
      .append('g');
  }, []);

  useEffect(() => {
    createChart();
  }, [data]);

  function createChart() {
    const t = d3.transition().duration(1000);
    const arcs = pieGenerator;
    const path = chart
      .datum(data)
      .selectAll('path')
      .data(arcs);

    path.join(
      enter =>
        enter
          .append('path')
          .attr('fill', (d, i) => color(i))
          .attr('d', arc)
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
    return t => arc(i(t));
  }

  return <svg id="DynamicDonut" />;
};

export default DynamicDonut;
