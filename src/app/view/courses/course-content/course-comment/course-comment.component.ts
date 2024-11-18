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
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-course-comment',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  templateUrl: './course-comment.component.html',
  styleUrl: './course-comment.component.css'
})
export class CourseCommentComponent {

  priceTableDesign : any;
  isCreateCoupons : boolean = false;
  createCouponsForm! : FormGroup;
  courseId : any;
  reviewList : any [] = []

  constructor(private _fb : FormBuilder, private _courseService : CoursesService, private route : ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }
  
  ngOnInit(){

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
   

}
