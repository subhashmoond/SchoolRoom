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

}
