import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TestService } from '../../../core/services/test.service';

@Component({
  selector: 'app-bulk-upload-data',
  standalone: true,
  imports: [ CommonModule, ButtonModule, FileUploadModule, ReactiveFormsModule ],
  templateUrl: './bulk-upload-data.component.html',
  styleUrl: './bulk-upload-data.component.css'
})
export class BulkUploadDataComponent {

  @Output() closepopup = new EventEmitter<any>();

  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  constructor( private _tsService : TestService ){}

  ngOnInit(){

  }

  downloadSample(){
    const fileUrl = '../../../../assets/file/Question-Bluk-upload.xlsx'; // Path to your Excel file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Question-Bluk-upload.xlsx'; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      // if (this.selectedFile) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.selectedFileObjectUrl = e.target?.result as string;
      //   };
      //   reader.readAsDataURL(this.selectedFile);
      // }
    }
  }

  profileImageRemove() {
    // this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
    this.selectedFile = 'null';
    this.fileUpload = 'null'

  }

  submit(){

    const payload = new FormData();

    payload.append('file', this.selectedFile)
    payload.append('questionBankId', '331516a26436423da3a61fbb220dfa44');

    this._tsService.bulkQuestionUpload(payload).subscribe((res : any) => {

    })

  }


}
