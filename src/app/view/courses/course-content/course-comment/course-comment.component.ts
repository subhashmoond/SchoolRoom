import { Component, Input } from '@angular/core';
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
import { CoursesService } from '../../../../core/services/courses.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-course-comment',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, InputSwitchModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  providers: [MessageService],
  templateUrl: './course-comment.component.html',
  styleUrl: './course-comment.component.css'
})
export class CourseCommentComponent {

  @Input() allowReviewStatus : any

  priceTableDesign : any;
  isCreateCoupons : boolean = false;
  createCouponsForm! : FormGroup;
  courseId : any;
  reviewList : any [] = [];
  allowReview : any;

  constructor(private _fb : FormBuilder, private messageService: MessageService, private _courseService : CoursesService, private route : ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }
  
  ngOnInit(){

    this.allowReview = this.allowReviewStatus;
    this.getReviewsList();

    this.priceTableDesign = [
      {type : 'One time paymet', price : 20000}
    ]

    this.createCouponsForm = this._fb.group({
      suggestDuring : [],
      discount : [],
      todate : []
    })
  }

  getReviewsList(){
    this._courseService.getCourseReviewList(this.courseId).subscribe((res:any) => {
      this.reviewList = res.reviews
    })
  }
  
  onAllowReviewChange() {
    console.log(this.allowReview, "Allow reviews")

    const payload = {
      "allowCourseReview": this.allowReview
    }

    this._courseService.allowReviews(this.courseId, payload).subscribe((res: any) => {
      if (res.status === true) {
        this.messageService.add({ severity: 'success', detail: 'Review Allow Successfull !' });
      }
    })

  }


  approveReview(reviewId : any, type : any){

    const payload : any = {}

    if(type === 'approve'){
      payload. status  = "approved"  // rejected,approved,
    }

    if(type === 'reject'){
      payload. status  = "rejected"  // rejected,approved,
    }
    

    this._courseService.approveAndRejectReview(this.courseId, reviewId, payload).subscribe((res : any) => {

      if(res.status === true){
        this.messageService.add({ severity: 'success', detail: ' Status Updated Successfully ! ' });
      }

    });

  }




}
