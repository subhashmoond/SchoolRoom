import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CoursesService } from '../../../../../core/services/courses.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CalendarModule, ChipsModule, CheckboxModule, ReactiveFormsModule, InputGroupModule, InputTextModule, FileUploadModule,ConfirmDialogModule, ToastModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  @Input() contentTypes : any;
  @Input() lessonId : any;
  @Input() contentId : any;

  addContent!: FormGroup;
  settingContent! : FormGroup;
  submitbutton: boolean = false;
  selectFiles: any;
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

  formGroup() {
    this.addContent = this._fb.group({

    })
  }

  settingFormGroup() {
    this.settingContent = this._fb.group({
      title: [],
      downloadable: [],
      available: [true],
      tags: [],
      formdate: [],
      todate: []
    })
  }

  getContentSetting() {
    this._coursesService.getImageSetting(this.contentId).subscribe(res => {
      console.log(res, "content get API")

      this.settingContent.setValue({
        title: res.title,
        downloadable: res.downloadable,
        available: res.always_available,
        formdate: res.available_from,
        todate: res.available_to,
        tags: "new",
      })

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
    body.append('image', this.selectFiles);

    this._coursesService.addImageFile(body).subscribe(res => {
      console.log(res, "Image Uplodaed Successfully")
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }


  settingSubmit() {

    const payload = {
      "title": this.settingContent.get('title')?.value,
      "tags": this.settingContent.get('tags')?.value,
      "always_available": this.settingContent.get('available')?.value,
      "downloadable": this.settingContent.get('downloadable')?.value,
      "available_from": this.settingContent.get('formdate')?.value,
      "available_to": this.settingContent.get('todate')?.value
    }

    this._coursesService.editImageSetting(this.contentId, payload).subscribe(res => {
      console.log(res, "PDF Setting ")
    })

  }


}
