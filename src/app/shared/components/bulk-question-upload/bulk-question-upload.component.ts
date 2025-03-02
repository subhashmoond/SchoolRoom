import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bulk-question-upload',
  standalone: true,
  imports: [ CommonModule, ButtonModule ],
  templateUrl: './bulk-question-upload.component.html',
  styleUrl: './bulk-question-upload.component.css'
})
export class BulkQuestionUploadComponent {

  constructor(){}


  ngOnInit(){

  }

  downloadSample() {
    const fileUrl = '../../../../assets/file/Question-Bluk-upload.xlsx'; // Path to your Excel file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Question-Bluk-upload.xlsx'; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
