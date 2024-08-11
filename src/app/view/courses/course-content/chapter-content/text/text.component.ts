import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, FileUploadModule,ConfirmDialogModule, ToastModule, InputTextModule, EditorModule, FormsModule ],
  providers:[MessageService, ConfirmationService],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  
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
      text : ['', Validators.required]
    })
  }



  submitForm() {

    const body = new FormData;
    body.append('lesson_id', this.lessonId);
    body.append('article_text', this.addContent.get('text')?.value);

    this._coursesService.addText(body).subscribe(res => {
      console.log(res, "Image Uplodaed Successfully")
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }

}
