<template>
  <div class="line-chart">
    <h1>{{ title }}</h1>
    <svg :id="chartId" viewBox="0 0 600 200" />
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
  @Prop({ required: true }) dataKey!: string;
  @Prop({ required: true }) data!: any;

  chartId: string = `${this.dataKey}_chart`;
  outerWidth: number = 600;
  outerHeight: number = 150;

  initializeChart() {
    // const chart = d3.select('#chart');
    const chart = d3.select(`#${this.chartId}`);
    const chartMargin: any = { top: 10, right: 20, bottom: 50, left: 40 };
    const width: number =
      this.outerWidth - chartMargin.left - chartMargin.right;
    const height: number =
      this.outerHeight - chartMargin.top - chartMargin.bottom;
    const xTitleHeight: number = height + 15;
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
    const yKey = this.dataKey;
    y.domain(
      d3.extent(this.data, function(d: any) {
        if (yKey === 'speed') return d.speed;
        else return d.soc;
      })
    );

    const line = d3
      .line()
      .x((d: any) => x(d.time))
      .y((d: any) => {
        if (yKey === 'speed') return y(d.speed);
        else return y(d.soc);
      });

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
      .selectAll('.tick')
      .remove();

    innerChart
      .append('text')
      .attr('dx', '1em')
      .attr('x', '15')
      .text(this.xTitle)
      .style('text-anchor', 'end')
      .attr('transform', `translate(0 ${xTitleHeight})`)
      .attr('font-family', 'Montserrat')
      .attr('font-size', '8px')
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
      .attr('y', '-20')
      .text(this.yTitle)
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('font-family', 'Montserrat')
      .attr('font-size', '8px')
      .attr('font-weight', 'bold');

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
    console.log('MOUNTED');
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/variables';

.line-chart {
  max-height: 280px;
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
