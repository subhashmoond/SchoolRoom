import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CoursesService } from '../../../../core/services/courses.service';
import { DigitalProductService } from '../../../../core/services/digital-product.service';

@Component({
  selector: 'app-add-push-message',
  standalone: true,
  imports: [TableModule, ToastModule, InputTextModule, ToolbarModule, KeyFilterModule, ButtonModule, SidebarModule,
      CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule, CheckboxModule, DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './add-push-message.component.html',
  styleUrl: './add-push-message.component.css'
})
export class AddPushMessageComponent {
  campaignFrom! : FormGroup;
  coursesList : any;
  digitalProductList : any;

  targetAudience = [
    { name : 'All learners' },
    { name : 'Course Wise learners' },
    { name : 'Digital Product Wise learners' }
  ]


  // all_learners,course_wise_learners,digital_product_wise_learners

  constructor( private _fb : FormBuilder, private _coursesService : CoursesService, private _digitalService : DigitalProductService ){ }

  ngOnInit(){
    this.form();
    this.getCourseList();

  }


  form(){
    this.campaignFrom = this._fb.group({
      title : ['', Validators.required],
      targetAudience : ['', Validators.required],
      productId : [],
    });
  }

  onTargetAudienceChange(event : any){
    console.log(event, "asd SAD asd SD")
  }

  getCourseList(){
    this._coursesService.getCourseListTypeWais('Live').subscribe(res => {
      this.coursesList = res.courses
    })
  }

  getDigitalProduct(){

    this._digitalService.getDigitalProduct().subscribe(res => {
      this.digitalProductList = res.data
    })

  }

  closeSideBar(){
    
  }


}
