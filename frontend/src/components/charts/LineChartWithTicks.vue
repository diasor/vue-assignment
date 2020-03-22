<template>
  <div class="line-chart">
    <h1>{{ title }}</h1>
    <svg id="chart" viewBox="0 0 600 200" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
  name: 'LineChart'
})
export default class LineChart extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) yTitle!: string;
  @Prop({ required: true }) xTitle!: string;
  @Prop({ required: true }) data!: any;

  outerWidth: number = 600;
  outerHeight: number = 200;

  initializeChart() {
    const chart = d3.select('#chart');
    const chartMargin: any = { top: 10, right: 20, bottom: 110, left: 50 };
    const width = this.outerWidth - chartMargin.left - chartMargin.right;
    const height = this.outerHeight - chartMargin.top - chartMargin.bottom;
    const innerChart = chart
      .append('g')
      .attr('transform', `translate(${chartMargin.left} ${chartMargin.top})`);

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    // establish the domain for x and y axes
    const xDomain = this.data.map((d: any) => d.time);
    x.domain(
      d3.extent(this.data, function(d: any) {
        return d.time;
      })
    );
    y.domain(
      d3.extent(this.data, function(d: any) {
        return d.speed;
      })
    );

    const line = d3
      .line()
      .x((d: any) => x(d.time))
      .y((d: any) => y(d.speed));

    // x axis
    let xAxis = d3
      .axisBottom(x)
      .tickValues(xDomain)
      .tickFormat(function(d: any) {
        return d3.timeFormat('%Y-%m-%d, %H:%m:%S')(new Date(d));
      });
    innerChart
      .append('g')
      .attr('transform', `translate(0 ${height})`)
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-25)')
      .attr('font-family', 'Montserrat')
      .attr('font-size', '6px')
      .attr('font-weight', 'bold');

    // y axis
    let yAxis = d3.axisLeft(y);
    innerChart
      .append('g')
      .call(yAxis)
      .selectAll('.tick')
      .remove();
    innerChart
      .append('text')
      .attr('dy', '1em')
      .attr('y', '-25')
      .text('Speed (km/h)')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('font-family', 'Montserrat')
      .attr('font-size', '8px')
      .attr('font-weight', 'bold');
    // .selectAll('text');

    innerChart
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#4e7e61')
      .attr('stroke-width', 1.5)
      .attr('class', 'line')
      .attr('d', line);
  }

  mounted() {
    this.initializeChart();
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/variables';

.line-chart {
  max-height: 300px;
  width: 100%;
  margin: 0;
  padding: 0 0 0.2rem 0;
  background-color: $background-color;

  > h1 {
    margin: 0;
    padding: 0.3rem 0 0 0;
    font-size: $title-medium;
    font-weight: bold;
  }
}
</style>
