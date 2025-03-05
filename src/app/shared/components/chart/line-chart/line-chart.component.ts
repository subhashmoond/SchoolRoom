import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexXAxis
} from "ng-apexcharts";
import { CardModule } from 'primeng/card';
import { AnalyticsService } from '../../../../core/services/analytics.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, CardModule, NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  chartData: any
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions!: ChartOptions;

  constructor(private _analyticsService: AnalyticsService) {

  }

  ngOnInit() {

    this._analyticsService.currentData.subscribe(data => {
      this.processChartData(data);
    });


  }

  processChartData(data: any) {

    const reportData = data

    // Extracting dates as x-axis categories
    const categories = Object.keys(reportData);

    // Extracting values as series data
    const seriesData = Object.values(reportData).map(value => Number(value)) as number[];

    this.chartOptions = {
      series: [
        {
          name: "Record",
          data: seriesData
        }
      ],
      chart: {
        type: "line",
        toolbar: {
          show: false
        },
        height: 350
      },
      xaxis: {
        categories: categories
      }
    };
  }



}
