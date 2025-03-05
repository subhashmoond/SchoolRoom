import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BarChartComponent } from '../../../shared/components/chart/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../../shared/components/chart/line-chart/line-chart.component';
@Component({
  selector: 'app-overview-report',
  standalone: true,
  imports: [CommonModule, CardModule, BarChartComponent, LineChartComponent],
  templateUrl: './overview-report.component.html',
  styleUrl: './overview-report.component.css'
})
export class OverviewReportComponent {

  constructor() { }

  ngOnInit(){

    
  }

  getReportData(){
    
  }


}
