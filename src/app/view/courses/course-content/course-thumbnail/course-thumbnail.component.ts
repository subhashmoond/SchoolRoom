import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-course-thumbnail',
  standalone: true,
    imports: [ CommonModule, FileUploadModule, ReactiveFormsModule, InputTextModule ],
  
  templateUrl: './course-thumbnail.component.html',
  styleUrl: './course-thumbnail.component.css'
})
export class CourseThumbnailComponent {

  
  @Input() thumbnalAndTitleData : any;
  @Output() closepoup = new EventEmitter<any>();

  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  isUploadImage : boolean = false

  courseDetails : any


  constructor( private _fb : FormBuilder, private _courseService : CoursesService ) { }

  ngOnInit() {

    this.getDigitalProductDetails();

    console.log(this.thumbnalAndTitleData, "sdasd sdhsu ew79r jfd")

  }

  getDigitalProductDetails(){
    this._courseService.getCourseById(this.thumbnalAndTitleData.id).subscribe(res => {
      this.courseDetails = res.data;

      if(this.courseDetails.image_url !== "undefined"){
        this.isUploadImage = true
      }

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
    this.selectedFile = 'null';
    this.fileUpload = 'null'
    
  }


  submit(){

    const payload = new FormData();
    payload.append('course_id', this.thumbnalAndTitleData.id )
    payload.append('thumbnail', this.selectedFile )

    this._courseService.courseThumbnailUpdate(payload).subscribe(res => {
      this.closepoup.emit(false)
    })

  }

  deleteThumnail(){
    this.isUploadImage = false;
    // this._digitalProduct.deleteThumbnail(this.thumbnalAndTitleData.id).subscribe(res => {
    //   this.isUploadImage = false
    //   this.getDigitalProductDetails();
    // })

  }

}
