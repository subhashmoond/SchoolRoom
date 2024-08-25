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
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-youtube-video',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CalendarModule, ChipsModule, CheckboxModule, ReactiveFormsModule, InputGroupModule, InputTextModule, FileUploadModule,ConfirmDialogModule, ToastModule, InputTextModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './youtube-video.component.html',
  styleUrl: './youtube-video.component.css'
})
export class YoutubeVideoComponent {

  @Input() contentTypes : any;
  settingContent!: FormGroup;
  @Input() lessonId : any;
  @Input() contentId : any;

  addContent!: FormGroup;
  submitbutton: boolean = false;
  editForm: boolean = false;



  constructor(private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _coursesService : CoursesService, private _confirmationService: ConfirmationService) {
    translate.setDefaultLang('en-US')
  }

  ngOnInit() {
    this.formGroup();
    this.settingFormGroup();
    if (this.contentTypes === 'edit') {
      this.editForm = true
      this.getContentSetting()
    }
  }

  settingFormGroup() {
    this.settingContent = this._fb.group({
      title: [],
      duration: [],
      watermark: [],
      available: [true],
      tags: [],
      formdate: [],
      todate: []
    })
  }

  getContentSetting() {
    this._coursesService.getYoutubeVideoSetting(this.contentId).subscribe(res => {
      this.settingContent.setValue({
        title: res.title,
        duration: res.duration,
        watermark: res.enable_Watermark,
        available: res.always_available,
        tags: res.tags,
        formdate: res.available_from,
        todate: res.available_to
      })
    })
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

  settingSubmit() {

    const payload = {
      "title": this.settingContent.get('title')?.value,
      "duration": this.settingContent.get('duration')?.value,
      "autoplay": true,
      "tags": this.settingContent.get('tags')?.value,
      "enable_Watermark": this.settingContent.get('watermark')?.value,
      "always_available": this.settingContent.get('available')?.value,
      "available_from": this.settingContent.get('formdate')?.value,
      "available_to": this.settingContent.get('todate')?.value
    }

    this._coursesService.editYoutubeVideoSetting(this.contentId, payload).subscribe(res => {
      console.log(res, "PDF Setting ")
    })

  }

}
