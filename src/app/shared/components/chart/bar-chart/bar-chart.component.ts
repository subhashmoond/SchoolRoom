import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexXAxis
} from "ng-apexcharts";
import { CardModule } from 'primeng/card';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-bar-chart',
  standalone: true,
    imports: [ CommonModule, CardModule, NgApexchartsModule ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

   @ViewChild("chart") chart : ChartComponent | undefined;
        public chartOptions: ChartOptions;
      
        constructor() {
          this.chartOptions = {
            series: [
              {
                name: "My Series",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
              }
            ],
            chart: {
              type: "bar",
              toolbar: {
                show: false
              },
              height: 350
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
            }
          };
        }
  

}
