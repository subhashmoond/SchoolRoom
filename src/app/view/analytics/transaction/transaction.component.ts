import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { CoursesService } from '../../../core/services/courses.service';
import { DigitalProductService } from '../../../core/services/digital-product.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, AvatarModule, CalendarModule, ReactiveFormsModule, MultiSelectModule, TagModule],
  providers: [ DatePipe ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  transctionListData: any
  filterForm!: FormGroup;
  maxDate: Date = new Date(); // Disables future dates
  prevMonth: Date;
  productDataList: any;

  productType = [
    { name: "Course", id: 'course' },
    { name: "Test Series", id: 'test_series' }
    // { name: "Webinar", id: 'webinar' },
  ]

  channelType = [
    { name: "IOS", id: 'ios' },
    { name: "Web", id: 'web' },
    { name: "Android", id: 'android' }
  ]

  statusValue = [
    { name: "Completed", id: 'completed' },
    { name: "Pending", id: 'pending' },
    { name: "Failed", id: 'failed' },
    { name: "Offline", id: 'offline' },
  ]

  constructor(private _fb: FormBuilder, private _analyticsService: AnalyticsService, private _datePipe: DatePipe, private _coursesService: CoursesService, private _digitalService: DigitalProductService) {
    const today = new Date();
    this.prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Set to the 1st of the previous month
  }

  ngOnInit() {

    this.filterForm = this._fb.group({
      selectProductType: [''],
      selectProduct: [''],
      status: [''],
      date: [''],
      channel: ['']
    });

    this.applyFilter();
    this.courseData()

  }


  courseData() {

    console.log(event, "product type datas ")

    this._coursesService.getCourseListTypeWaisWithOutFilter().subscribe(res => {
      this.productDataList = res.courses;
      console.log(res, "with out type")
    })

    // if (event.value === "course") {
    //   // Course Data List
    //   this._coursesService.getCourseListTypeWais('Live').subscribe(res => {
    //     this.productDataList = res.courses
    //   })
    // }

    // if (event.value === "test_series") {
    //   // Test Serice Data List 
    //   this._coursesService.getCourseListTypeWais('Test Series').subscribe(res => {
    //     this.productDataList = res.courses
    //   })
    // }

  }



  applyFilter() {


    const dateData = this.filterForm.get('date')?.value
    const payload: any = {}

    payload.start_date = this._datePipe.transform(dateData[0], 'yyyy-MM-dd');
    payload.end_date = this._datePipe.transform(dateData[1], 'yyyy-MM-dd');
    payload.status = this.filterForm.get('status')?.value
    payload.product_ids = this.filterForm.get('selectProduct')?.value;

    this._analyticsService.getTransactionsReport(payload).subscribe(res => {
      this.transctionListData = res.transactions
    })

    // console.log(this.filterForm.value, "Form Value Data")
  }

}
