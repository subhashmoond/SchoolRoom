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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-pricing',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, RadioButtonModule, InputSwitchModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, FormsModule, CheckboxModule, CalendarModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './course-pricing.component.html',
  styleUrl: './course-pricing.component.css'
})
export class CoursePricingComponent {

  createPlanForm!: FormGroup
  priceTableDesign: any;
  priceList: any = [];
  isCreatePlan: boolean = false;
  isEditPlan: boolean = false;
  planDetailByIds: any;
  updatePlanId: any;
  courseId : any;
  isLoader : boolean = true

  constructor(private _courseService: CoursesService, private route : ActivatedRoute, private _fb: FormBuilder, private _messageService: MessageService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.getPriceList();
    this.formGroup();
  }

  formGroup() {
    this.createPlanForm = this._fb.group({
      price: ['', Validators.required],
      discount: [''],
      instalment: false,
      duration: false,
      instalmentMonths: [],
      instalmentMonthsValue: [],
      instalmentWeekly: [],
      instalmentWeeklyValue: [],
      durationDate: [],
      durationDateValue: [],
      durationDays: [],
      durationDaysValue: [],
      instalmentType: null
    })
  }

  get instalmentType() {
    return this.createPlanForm.get('instalmentType')?.value;
  }

  get durationType() {
    return this.createPlanForm.get('durationDate')?.value;
  }

  getPriceList() {
    this.isLoader = true
    this._courseService.getCoursePriceList(this.courseId).subscribe((res : any) => {
      this.priceList = res;
      this.isLoader = false
      if(res.status == false){
        this._messageService.add({severity:'warn', summary: res.msg});
      }
    })
  }

  openCreatePriceSidebar() {
    this.isCreatePlan = true
  }

  editPlan(data: any) {

    this.isEditPlan = true;

    this.updatePlanId = data.id

    this._courseService.getPlanById(this.courseId, data.id).subscribe(res => {
      console.log(res, "edit plan data set")
      this.planDetailByIds = res
      this.isCreatePlan = true;

      this.createPlanForm.setValue({
        price: this.planDetailByIds?.price,
        discount: this.planDetailByIds?.mrp,
        instalment: this.planDetailByIds?.isInstalment,
        // duration: false,
        // instalmentMonths: [],
        // instalmentMonthsValue: [],
        // instalmentWeekly: [],
        // instalmentWeeklyValue: [],
        // durationDate: [],
        // durationDateValue: [],
        // durationDays: [],
        // durationDaysValue: [],
        // instalmentType: null
      })

    })




  }

  deletePlan(data: any) {
    this._courseService.deletePlanById(this.courseId, data.id).subscribe((res:any) => {
      console.log(res, "delete done");
      this.getPriceList();
      this._messageService.add({ severity: 'success', summary: 'Plan Delete Successfully' });
      if(res.status == false){
        this._messageService.add({severity:'warn', summary: res.msg});
      }
    })
  }

  submitPlan() {
    const validityTypeData = this.createPlanForm.get('durationDate')?.value;

    if (!this.isEditPlan) {

      var payload: any = {
        "planType": "Paid",// Paid /Free
        "mrp": this.createPlanForm.get('discount')?.value,
        "price": this.createPlanForm.get('price')?.value,
        "isInstalment": this.createPlanForm.get('instalment')?.value,
        "isValidity": true,
        // "validityDays":"2025-12-10",
        // "validityDate": "2025-12-10",
        "validityType": this.createPlanForm.get('durationDate')?.value, // Date/Days,
        "instalmentType": this.createPlanForm.get('instalmentType')?.value, //Monthly/weekly
        "emiPrice": 600,
        "totalEmi": this.createPlanForm.get('instalmentMonthsValue')?.value
      }

      if (validityTypeData == 'Date') {
        payload.validityDate = this.createPlanForm.get('durationDateValue')?.value || "2025-12-10";
      } else {
        payload.validityDays = this.createPlanForm.get('durationDateValue')?.value || "44";
      }

      this._courseService.createPlan(this.courseId, payload).subscribe((res:any) => {
        console.log(res, "Create Plan Response");
        this.getPriceList();
        this.isCreatePlan = false;
        this._messageService.add({ severity: 'success', summary: 'Plan Created Successfully' });

        if(res.status == false){
          this._messageService.add({severity:'warn', summary: res.msg});
        }

      }, error => {

      })

    } else {

      var updatePayload: any = {
        "planType": "Paid",// Paid /Free
        "mrp": this.createPlanForm.get('discount')?.value,
        "price": this.createPlanForm.get('price')?.value,
        "isInstalment": this.createPlanForm.get('instalment')?.value,
        "isValidity": true,
        // "validityDays":"2025-12-10",
        // "validityDate": "2025-12-10",
        "validityType": this.createPlanForm.get('durationDate')?.value, // Date/Days,
        "instalmentType": this.createPlanForm.get('instalmentType')?.value, //Monthly/weekly
        "emiPrice": 600,
        "totalEmi": this.createPlanForm.get('instalmentMonthsValue')?.value
      }

      if (validityTypeData == 'Date') {
        updatePayload.validityDate = this.createPlanForm.get('durationDateValue')?.value || "2025-12-10";
      } else {
        updatePayload.validityDays = this.createPlanForm.get('durationDateValue')?.value || "55";
      }

      this._courseService.updatePlanById(this.courseId, this.updatePlanId, updatePayload).subscribe((res:any) => {
       
        this.getPriceList();
        this.isCreatePlan = false;
        this._messageService.add({severity:'success', summary:'Plan Updated Successfully'});
        if(res.status == false){
          this._messageService.add({severity:'warn', summary: res.msg});
        }
      })

    }


  }

}
