import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CalendarModule, EditorModule, ChipsModule, CheckboxModule, ReactiveFormsModule, InputGroupModule, InputTextModule, FileUploadModule,ConfirmDialogModule, ToastModule, InputTextModule, EditorModule, FormsModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  
  @Input() contentTypes : any;
  @Input() lessonId : any;
  @Input() contentId : any;
  @Output() closeSideBar = new EventEmitter<any>();

  addContent!: FormGroup;
  settingContent! : FormGroup;
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

  formGroup() {
    this.addContent = this._fb.group({
      text : ['', Validators.required]
    })
  }


  settingFormGroup() {
    this.settingContent = this._fb.group({
      title: [],
      text: [],
      available: [true]
    })
  }

  getContentSetting() {
    this._coursesService.getTextContent(this.contentId).subscribe(res => {
      console.log(res, "content get API")

      this.settingContent.setValue({
        title: res.title,
        text: res.text,
        available: res.always_available
      })

    })
  }




  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('article_text', this.addContent.get('text')?.value);

    this._coursesService.addText(body).subscribe(res => {
      console.log(res, "Image Uplodaed Successfully");
      this.closeSideBar.emit(false)
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }

  settingSubmit() {

    const payload = {
      "title": this.settingContent.get('title')?.value,
      "text": this.settingContent.get('text')?.value,
      "always_available": this.settingContent.get('available')?.value
    }

    this._coursesService.editTextContent(this.contentId, payload).subscribe(res => {
      console.log(res, "PDF Setting ");
      this.closeSideBar.emit(false)
    })

  }

}
