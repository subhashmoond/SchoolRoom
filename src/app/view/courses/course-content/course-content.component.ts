import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import Gemini from 'gemini-ai';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CourseInformationComponent } from './course-information/course-information.component';
import { CoursePricingComponent } from "./course-pricing/course-pricing.component";
import { CourseCouponsComponent } from "./course-coupons/course-coupons.component";
import { CourseCommentComponent } from "./course-comment/course-comment.component";
import { CourseStudentsComponent } from "./course-students/course-students.component";
import { CoursesService } from '../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CourseThumbnailComponent } from './course-thumbnail/course-thumbnail.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddonProductComponent } from './addon-product/addon-product.component';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule, CurriculumComponent, CourseInformationComponent, CoursePricingComponent, CoursePricingComponent,
    CourseCouponsComponent, CourseCommentComponent, CourseStudentsComponent, DialogModule, CourseThumbnailComponent, ToastModule, AddonProductComponent ],
  providers: [MessageService],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {

  @ViewChild('fileUpload', { static: false }) fileUpload: any;


  selectedFile: File | null = null;
  selectedFileObjectUrl: string | null = null;
  currentActiveTab: string = 'curriculum';
  courseId: any;
  courseDetails: any;
  isThumbnail: boolean = false;
  thumbnalAndTitleData: any;
  allowReviewStatus : any;

  constructor(private _sharedService: SharedService, private messageService: MessageService, private _courseService: CoursesService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  async ngOnInit() {
    // this.currentActiveTab =  "curriculum"

    this._sharedService.settoggleButtonValue(false);
    this.getCourseDetail();

  }

  getCourseDetail() {
    this._courseService.getCourseById(this.courseId).subscribe(res => {
      this.courseDetails = res.course;
      this.allowReviewStatus = this.courseDetails.allowReview
    })
  }


  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  profileImageRemove() {
    this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
  }


  courseTabs(type: any) {
    this.currentActiveTab = type;
    console.log(this.currentActiveTab, "curent tab name ")
  }


  updateThumbnail() {
    this.isThumbnail = true;
    this.thumbnalAndTitleData = {
      "id": this.courseDetails.id,
      "url": this.courseDetails.image_url,
    }
  }

  closeThumbnailPopup(event: any) {
    this.isThumbnail = false;
    this.getCourseDetail();
    this.messageService.add({ severity: 'success', detail: ' Thumbnail Updated Successfully ! ' });
  }

  ngOnDestroy() {
    this._sharedService.settoggleButtonValue(true);
  }


}
