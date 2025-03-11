import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { LineChartComponent } from '../../../shared/components/chart/line-chart/line-chart.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DigitalProductService } from '../../../core/services/digital-product.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-digital-product-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectModule, DropdownModule, ToastModule, CardModule, LineChartComponent, CalendarModule, FormsModule, TabViewModule, TableModule],
  providers: [DatePipe],
  templateUrl: './digital-product-report.component.html',
  styleUrl: './digital-product-report.component.css'
})
export class DigitalProductReportComponent {

  filterForm!: FormGroup;
  chartData: any;

  fromToDateValue: Date[] = [];
  maxDate: Date = new Date(); // Disables future dates
  prevMonth: Date;
  overViewData: any;
  transctionListData: any;
  digitalProductList: any[] = [];

  statusValue = [
    { name: "Confirmed", id: 'CONFIRMED' },
    { name: "Pending", id: 'PENDING' },
    { name: "Delivered", id: 'DELIVERED' },
    { name: "Cancelled", id: 'CANCELLED' },
  ]


  constructor(private _analyticsService: AnalyticsService, private _datePipe: DatePipe, private _fb: FormBuilder, private _digitalService: DigitalProductService) {
    const today = new Date();
    this.prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Set to the 1st of the previous month
  }

  ngOnInit() {
    this.getDigitalProductList();
    this.getOverViewData();
    this.applicationFilter(null, 'last_7_days');

    this.filterForm = this._fb.group({
      selectProduct: [''],
      status : [''],
      date : ['']
    });



  }

  getDigitalProductList() {
    this._digitalService.getDigitalProduct().subscribe(res => {
      this.digitalProductList = res.data
    })
  }


  getOverViewData() {

    this._analyticsService.getDigitalProductOverview().subscribe(res => {
      this.overViewData = res
    })

  }

  applicationFilter(event: any, type: any) {

    const payload: any = {}

    if (type === 'custom' && event?.length === 2) {
      payload.fromDate = this._datePipe.transform(event[0], 'yyyy-MM-dd');
      payload.toDate = this._datePipe.transform(event[1], 'yyyy-MM-dd');
      payload.filter_type = type
    } else {
      payload.filter_type = type
    }

    this._analyticsService.getRevenueReport(payload).subscribe(res => {

      this.chartData = res;
      this._analyticsService.updateData(res.revenue_data);

    })

  }


  applyFilter(){
    
  }


}
