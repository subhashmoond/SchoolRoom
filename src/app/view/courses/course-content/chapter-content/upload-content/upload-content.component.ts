import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CalendarModule, ChipsModule, CheckboxModule, ReactiveFormsModule, InputGroupModule, InputTextModule, FileUploadModule, ConfirmDialogModule, ToastModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './upload-content.component.html',
  styleUrl: './upload-content.component.css'
})
export class UploadContentComponent {
  @Input() contentTypes: any;
  @Input() lessonId: any;
  @Input() contentId: any;
  @Output() closeSideBar = new EventEmitter<any>();

  addContent!: FormGroup;
  settingContent!: FormGroup;
  submitbutton: boolean = false;
  selectFiles: any;
  oldFile: any;
  editForm: boolean = false;



  constructor(private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _coursesService: CoursesService, private _confirmationService: ConfirmationService) {
    translate.setDefaultLang('en-US');
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
      downloadable: [],
      available: [true],
      tags: [],
      formdate: [],
      todate: []
    })
  }

  getContentSetting() {
    this._coursesService.getPDFSettng(this.contentId).subscribe(res => {
      console.log(res, "content get API")

      this.settingContent.patchValue({
        title: res.title,
        downloadable: res.downloadable,
        available: res.always_available,
        formdate: res.available_from,
        todate: res.available_to,
        tags: "new",
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
  }

  fileRemove() {
    this.selectFiles = null;
  }


  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('pdf_file', this.selectFiles);

    this._coursesService.addPDFFile(body).subscribe(res => {
      console.log(res, "Content Datas")
      this.closeSideBar.emit(false)
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

    // this._clientService.postClientDocument(this.clientID, body).subscribe(res => {
    //   this.addSignatureClose.emit('uploadSigature');
    //   this._clientService.setReloadData('uploadSigature');
    // }, error => {
    //   const errorMsg = error.error.errors[0].developerMessage
    //     this._messageService.add({ severity: 'error', detail: errorMsg });
    // })
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

    this._coursesService.editPDFFie(this.contentId, payload).subscribe(res => {
      console.log(res, "PDF Setting ")
      this.closeSideBar.emit(false)

    })

  }




}
