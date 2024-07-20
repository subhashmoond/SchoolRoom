import { Component, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [FileUploadModule, CommonModule, ToolbarModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {

  @ViewChild('fileUpload', { static: false }) fileUpload: any;


  selectedFile: File | null = null;
  selectedFileObjectUrl: string | null = null;

  constructor(private _sharedService : SharedService){}

  ngOnInit(){
    this._sharedService.settoggleButtonValue(false);
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

  




  ngOnDestroy(){
    this._sharedService.settoggleButtonValue(true);
  }


}
