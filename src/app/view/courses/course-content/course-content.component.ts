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

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule, CurriculumComponent, CourseInformationComponent, CoursePricingComponent, CoursePricingComponent,
    CourseCouponsComponent, CourseCommentComponent, CourseStudentsComponent],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {

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
