import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CoursesService } from '../../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-course-pricing',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, InputSwitchModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  templateUrl: './course-pricing.component.html',
  styleUrl: './course-pricing.component.css'
})
export class CoursePricingComponent {

  createPlanForm! : FormGroup
  priceTableDesign : any;
  priceList : any = [];
  isCreatePlan : boolean = false

  constructor(private _courseService : CoursesService, private _fb: FormBuilder){

  }
  
  ngOnInit(){
    this.getPriceList();
    this.formGroup();
  }

  formGroup(){
    this.createPlanForm = this._fb.group({
      price : ['', Validators.required],
      discount : [''],
      instalment : false,
      duration : false

    })
  }

  getPriceList(){
    this._courseService.getCoursePriceList(10).subscribe(res => {
      this.priceList = res;
      console.log(this.priceList, "price data lists")
    })
  }

  openCreatePriceSidebar(){
    this.isCreatePlan = true
  }

  submitPlan(){

  }

}
