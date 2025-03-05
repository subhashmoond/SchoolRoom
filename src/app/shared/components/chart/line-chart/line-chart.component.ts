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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ CommonModule, CardModule, NgApexchartsModule ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  @Input() data : any

   @ViewChild("chart") chart : ChartComponent | undefined;
          public chartOptions: ChartOptions;
        
          constructor() {
            
          }

          ngOnInit(){
            
            this.chartOptions = {
              series: [
                {
                  name: "My Series",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
              }
            };

          }
    

}
