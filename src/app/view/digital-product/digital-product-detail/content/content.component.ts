import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [TranslateModule, SkeletonModule, FormsModule, FileUploadModule, DialogModule, ButtonModule, ConfirmDialogModule, ToastModule, CommonModule, InputTextModule, EditorModule ],
  providers: [MessageService],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  @Input() digitalProductDetail : any;

  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  isLoader : boolean = false;

  contentListData : any;
  digitalProductId : any;
  fileTitleValue : any;
  contentStringValue : any;
  contentURLValue : any;

  constructor( private _digitalProductService : DigitalProductService, private route: ActivatedRoute,  private _messageService: MessageService,){
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit(){
    this.getContentFileList();
    console.log(this.digitalProductDetail, "Digital Product Datas")
  }

  getContentFileList(){
    this ._digitalProductService.getDigitalProductContentList(this.digitalProductId).subscribe(res => {
      this.contentListData = res.content
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


  submit(){

    debugger
    const formdata = new FormData();
    formdata.append('title', this.fileTitleValue)

    if(this.contentURLValue){
      formdata.append('link_content', this.contentURLValue)
    }

    if(this.contentStringValue){
      formdata.append('text', this.contentStringValue)
    }

    if(this.selectedFile){
      formdata.append('content', this.selectedFile)
    }


    this._digitalProductService.addDigitalProductContent(this.digitalProductId, formdata).subscribe((res : any) => {

      if(res.status === true){

        this.fileTitleValue = '';
        this.selectedFileObjectUrl = null;
        this.fileUpload.clear();
        this.getContentFileList();
        this.contentStringValue = '';
        this.contentURLValue = '';
  
        this._messageService.add({ severity: 'success', detail: 'File Uploaded Successfull !' });
        
      }


    })

    this.getContentFileList();
    
  }

  deleteDigitalProduct(id : any){
    this._digitalProductService.deleteDigitalProductContent(this.digitalProductId, id).subscribe((res : any) => {
      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: 'Content Deleted Successfull !' });
        this.getContentFileList()
      }
    })

  }

}
