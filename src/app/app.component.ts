import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { AppService } from './app.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Demo for D3 with Angular 2';
  subtitle = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  public STATISTICS: Frequency[] = [];

  constructor(public appservice: AppService) {

  }

  ngOnInit() {
    this.appservice.getBarData().subscribe(
       data => {
        this.STATISTICS = data;
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
        console.log(data);
       }
    );
  }

  private initSvg() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right ;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
                     .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');;
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.STATISTICS.map((d) => d.letter));
    this.y.domain([0, d3Array.max(this.STATISTICS, (d) => d.frequency)]);
  }

  private drawAxis() {
    this.g.append('g')
          .attr('class', 'axis axis--x')
          .style('fill', 'red')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
          .attr('class', 'axis axis--y')
          .style('fill', 'green')
          .call(d3Axis.axisLeft(this.y).ticks(10, '%'))
          .append('text')
          .attr('class', 'axis-title')
          .style('fill', 'blue')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Frequency');

  }

  private drawBars() {
    this.g.selectAll('.bar')
          .data(this.STATISTICS)
          .enter().append('rect')
          .attr('class', 'bar')
          .style('fill', 'cornflowerblue')
          .attr('x', (d) => this.x(d.letter) )
          .attr('y', (d) => this.y(d.frequency) )
          .attr('width', this.x.bandwidth())
          .attr('height', (d) => this.height - this.y(d.frequency) );
  }
}

export interface Frequency {
  letter: string,
  frequency: number
}