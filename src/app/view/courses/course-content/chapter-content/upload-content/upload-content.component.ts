import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../../core/services/courses.service';

@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, FileUploadModule,ConfirmDialogModule, ToastModule],
  providers:[MessageService, ConfirmationService],
  templateUrl: './upload-content.component.html',
  styleUrl: './upload-content.component.css'
})
export class UploadContentComponent {
  @Input() contentTypes : any;
  @Input() lessonId : any;
  @Input() contentId : any;

  addContent!: FormGroup;
  settingContent! : FormGroup;
  submitbutton: boolean = false;
  selectFiles: any;
  oldFile: any;
  editForm : boolean = false;



  constructor(private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _coursesService : CoursesService, private _confirmationService: ConfirmationService) {
    translate.setDefaultLang('en-US');
  }

  ngOnInit() {
    this.formGroup();
    if(this.contentTypes === 'edit'){
      this.editForm = true
    }
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

  settingSubmit(){
    
  }

  


}
