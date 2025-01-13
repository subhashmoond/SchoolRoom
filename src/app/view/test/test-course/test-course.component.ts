import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateMainTestComponent } from '../main-test/create-main-test/create-main-test.component';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedService } from '../../../shared/services/shared.service';
import { TestCurriculumComponent } from './test-curriculum/test-curriculum.component';
import { CourseInformationComponent } from "../../courses/course-content/course-information/course-information.component";
import { CoursePricingComponent } from "../../courses/course-content/course-pricing/course-pricing.component";
import { CourseCouponsComponent } from "../../courses/course-content/course-coupons/course-coupons.component";
import { CourseCommentComponent } from "../../courses/course-content/course-comment/course-comment.component";
import { CourseStudentsComponent } from "../../courses/course-content/course-students/course-students.component";

@Component({
  selector: 'app-test-course',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule, TestCurriculumComponent, CourseInformationComponent, CoursePricingComponent, CourseCouponsComponent, CourseCommentComponent, CourseStudentsComponent],
  templateUrl: './test-course.component.html',
  styleUrl: './test-course.component.css'
})
export class TestCourseComponent {

  @ViewChild('fileUpload', { static: false }) fileUpload: any;


  selectedFile: File | null = null;
  selectedFileObjectUrl: string | null = null;
  currentActiveTab : string = 'curriculum';

  constructor(private _sharedService : SharedService){}

  async ngOnInit(){
    // this.currentActiveTab =  "curriculum"

    this._sharedService.settoggleButtonValue(false);

    this._sharedService.getGeminiAPI().subscribe(res => {
      console.log(res, "course content datas")
    });


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

  
  courseTabs(type : any){
    this.currentActiveTab = type;


    console.log(this.currentActiveTab, "curent tab name ")
  }



  ngOnDestroy(){
    this._sharedService.settoggleButtonValue(true);
  }



}
