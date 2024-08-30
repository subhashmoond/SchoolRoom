import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CouponsService } from '../../../../core/services/coupons.service';

@Component({
  selector: 'app-course-students',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.css'
})
export class CourseStudentsComponent {

  priceTableDesign : any;
  isCreateCoupons : boolean = false;
  createCouponsForm! : FormGroup;
  coursesId : any;

  constructor(private _fb : FormBuilder, private _couponsService : CouponsService, private route : ActivatedRoute){

    this.route.queryParams.subscribe(params => {
      this.coursesId = params['courseId'];
    });
  }
  
  ngOnInit(){
    this.priceTableDesign = [
      {type : 'One time paymet', price : 20000}
    ]

    this.createCouponsForm = this._fb.group({
      suggestDuring : [],
      discount : [],
      todate : []
    })
  }

  openCreateCouponsSidebar(){
    this.isCreateCoupons = true
  }

  createCouponse(){

    const payload = {
      "course":[this.coursesId],
      "suggest_during_checkout":this.createCouponsForm.get('suggestDuring')?.value,
      "valid_to": this.createCouponsForm.get('todate')?.value,
      "discount": this.createCouponsForm.get('discount')?.value
  }

    this._couponsService.createCoupons(payload).subscribe(res => {
      console.log(res, "app response details")
    })

  }
}
