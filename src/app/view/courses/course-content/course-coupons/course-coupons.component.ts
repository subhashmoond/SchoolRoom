import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-course-coupons',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, TagModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],

  templateUrl: './course-coupons.component.html',
  styleUrl: './course-coupons.component.css'
})
export class CourseCouponsComponent {
  isCreateCoupons : boolean = false;
  createCouponsForm! : FormGroup;
  courseId : any;
  couponsList : any;
  isLoader : boolean = true;

  constructor(private _fb : FormBuilder, private _couponsService : CouponsService, private route : ActivatedRoute){

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }
  
  ngOnInit(){

    this.getCouponsList();

    this.createCouponsForm = this._fb.group({
      suggestDuring : [],
      discount : [],
      todate : []
    })
  }

  getCouponsList(){
    this.isLoader= true
    this._couponsService.getCouponsList().subscribe(res => {
      this.couponsList = res.data
      this.isLoader = false
    })
  }

  openCreateCouponsSidebar(){
    this.isCreateCoupons = true
  }

  createCouponse(){

    const payload = {
      "course":[this.courseId],
      "suggest_during_checkout":this.createCouponsForm.get('suggestDuring')?.value,
      "valid_to": this.createCouponsForm.get('todate')?.value,
      "discount": this.createCouponsForm.get('discount')?.value
  }

    this._couponsService.createCoupons(payload).subscribe(res => {
      console.log(res, "app response details")
      this.getCouponsList();
      this.isCreateCoupons = false
    })

  }
}
