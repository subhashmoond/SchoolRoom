import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { LineChartComponent } from '../../../shared/components/chart/line-chart/line-chart.component';

@Component({
  selector: 'app-revenu',
  standalone: true,
  imports: [ CommonModule, ToastModule, CardModule, LineChartComponent, CalendarModule, FormsModule ],
  providers: [DatePipe],
  templateUrl: './revenu.component.html',
  styleUrl: './revenu.component.css'
})
export class RevenuComponent {

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
    
        this._analyticsService.getRevenueReport(payload).subscribe(res => {
          
          this.chartData = res;
          this._analyticsService.updateData(res.revenue_data);
    
        })
    
      }

}
