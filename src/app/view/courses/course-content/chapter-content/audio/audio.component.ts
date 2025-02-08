import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CalendarModule, ChipsModule, CheckboxModule, ReactiveFormsModule, InputGroupModule, InputTextModule, FileUploadModule,ConfirmDialogModule, ToastModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {

  @Input() contentTypes : any;
  @Input() lessonId : any;
  @Input() contentId : any;
  @Output() closeSideBar = new EventEmitter<any>();

  addContent!: FormGroup;
  settingContent! : FormGroup;
  submitbutton: boolean = false;
  selectFiles: any;
  selectFilesName : any;
  oldFile: any;
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
      available: [true],
      tags: [],
      formdate: [],
      todate: []
    })
  }

  getContentSetting() {
    this._coursesService.getAudioSetting(this.contentId).subscribe(res => {
      console.log(res, "content get API")

      this.settingContent.patchValue({
        title: res.title,
        duration: res.duration,
        available: res.always_available,
        // tags: res.tags,
        formdate: new Date(res.available_from),
        todate: new Date(res.available_to)
      })

    })
  }

  formGroup() {
    this.addContent = this._fb.group({

    })
  }


  onFileSelect(event: any) {
    const file = event.files[0];
    this.selectFiles = file;

    if (file) {
      this.selectFilesName = {
        objectURL: URL.createObjectURL(file),
        name: file.name,
        type: file.type
      };
    }

  }

  fileRemove() {
    this.selectFiles = null;
  }


  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('audio_file', this.selectFiles);
    body.append('title', this.addContent.get('selectFilesName')?.value );

    this._coursesService.addAudioFile(body).subscribe(res => {
      this.closeSideBar.emit(false)
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
      "always_available": this.settingContent.get('available')?.value,
      "available_from": this.settingContent.get('formdate')?.value,
      "available_to": this.settingContent.get('todate')?.value
    }

    this._coursesService.editAudioSetting(this.contentId, payload).subscribe(res => {
      this.closeSideBar.emit(false)
      console.log(res, "PDF Setting ")
    })

  }

}
