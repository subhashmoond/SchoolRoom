import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, FileUploadModule,ConfirmDialogModule, ToastModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent {

  @Input() contentTypes : any;
  @Input() lessonId : any;
  @Input() contentId : any;

  addContent!: FormGroup;
  submitbutton: boolean = false;
  selectFiles: any;
  oldFile: any;



  constructor(private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _coursesService : CoursesService, private _confirmationService: ConfirmationService) {
    translate.setDefaultLang('en-US')
  }

  ngOnInit() {
    this.formGroup();
    console.log(this.contentId, "video Edit ")
  }

  formGroup() {
    this.addContent = this._fb.group({

    })
  }


  onFileSelect(event: any) {
    const file = event.files[0];
    this.selectFiles = file;
  }

  fileRemove() {
    this.selectFiles = null;
  }


  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('video_file', this.selectFiles);

    this._coursesService.addVideoFile(body).subscribe(res => {
      console.log(res, "Image Uplodaed Successfully")
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }

}
