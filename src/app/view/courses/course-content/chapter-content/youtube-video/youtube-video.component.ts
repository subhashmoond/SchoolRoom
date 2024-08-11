import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-youtube-video',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, FileUploadModule,ConfirmDialogModule, ToastModule, InputTextModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './youtube-video.component.html',
  styleUrl: './youtube-video.component.css'
})
export class YoutubeVideoComponent {

  @Input() contentTypes : any;
  @Input() lessonId : any;

  addContent!: FormGroup;
  submitbutton: boolean = false;



  constructor(private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _coursesService : CoursesService, private _confirmationService: ConfirmationService) {
    translate.setDefaultLang('en-US')
  }

  ngOnInit() {
    this.formGroup();

  }

  formGroup() {
    this.addContent = this._fb.group({
      title : ['', Validators.required],
      path : ['', Validators.required]
    })
  }


  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('title', this.addContent.get('title')?.value);
    body.append('path', this.addContent.get('path')?.value);

    this._coursesService.addYoutubeVideoFile(body).subscribe(res => {
      console.log(res, "Image Uplodaed Successfully")
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }

}
