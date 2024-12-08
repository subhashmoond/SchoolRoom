import { Component, EventEmitter, Output } from '@angular/core';
import { NewsfeedService } from '../../../core/services/newsfeed.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { Title } from 'chart.js';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [TableModule, ToastModule, InputTextModule, ToolbarModule, KeyFilterModule, ButtonModule, DropdownModule, CommonModule, 
    CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule, CheckboxModule, InputSwitchModule, FileUploadModule ],
  providers : [MessageService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  @Output() closeSideBars = new EventEmitter<any>();

  createNewsForm! : FormGroup;
  postTypeList : any;
  selectedFileObjectUrl: any;
  maxFileSizeLimit = 10 * 1024 * 1024;
  fileUpload: any;
  selectedFile: any;

  constructor(private _fb: FormBuilder, private _newsfeedService : NewsfeedService, private _messageService : MessageService) { }


  ngOnInit(){

    this._newsfeedService.getPostTypeList().subscribe(res => {
      this.postTypeList = res.data
    })

    this.formGroup();
  }

  formGroup(){
    this.createNewsForm = this._fb.group({
      posttype : ['', Validators.required],
      title : ['', Validators.required],
      text : [],
      url : [],
    })
  }


  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  profileImageRemove() {
    this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
  }

  createNews(){

    const formData = new FormData();
    formData.append('type', this.createNewsForm.get('posttype')?.value)
    formData.append('title', this.createNewsForm.get('title')?.value)
    formData.append('text', this.createNewsForm.get('text')?.value)
    formData.append('attachUrl', this.createNewsForm.get('url')?.value)
    // formData.append('image', this.createNewsForm.get('posttype')?.value)

    this._newsfeedService.addPost(formData).subscribe((res : any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', detail:"News Feed Added Successfully" });
      }else{
        this._messageService.add({ severity: 'success', detail: res.message });
      }
    this.closeSideBars.emit(false)

    })

  }


  closeSideBar(){
    this.closeSideBars.emit(false)
  }



}
