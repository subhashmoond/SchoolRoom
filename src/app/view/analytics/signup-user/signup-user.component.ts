import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { LineChartComponent } from '../../../shared/components/chart/line-chart/line-chart.component';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-user',
  standalone: true,
  imports: [ CommonModule, ToastModule, CardModule, LineChartComponent, CalendarModule, FormsModule ],
  providers: [DatePipe],
  templateUrl: './signup-user.component.html',
  styleUrl: './signup-user.component.css'
})
export class SignupUserComponent {

  chartData : any;

  fromToDateValue: Date[] = [];
  maxDate: Date = new Date(); // Disables future dates
  prevMonth: Date; 
  
  constructor( private _analyticsService : AnalyticsService, private _datePipe : DatePipe ){
    const today = new Date();
    this.prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Set to the 1st of the previous month
  }

  ngOnInit(){
    this.applicationFilter(null, 'last_7_days');
  }

 

  applicationFilter(event: any, type : any){

    const payload : any = {}

    if (type === 'custom' && event?.length === 2) {
        payload.fromDate = this._datePipe.transform(event[0], 'yyyy-MM-dd');
        payload.toDate = this._datePipe.transform(event[1], 'yyyy-MM-dd');
        payload.filter_type = type
    }else{
      payload.filter_type = type
    }

    this._analyticsService.getSignupUserReport(payload).subscribe(res => {
      
      this.chartData = res;

      this._analyticsService.updateData(res.report_data);

    })

  }


}
