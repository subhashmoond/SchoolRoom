import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DigitalProductService } from '../../../../core/services/digital-product.service';

@Component({
  selector: 'app-update-thumbnail',
  standalone: true,
  imports: [ CommonModule, FileUploadModule, ReactiveFormsModule, InputTextModule ],
  templateUrl: './update-thumbnail.component.html',
  styleUrl: './update-thumbnail.component.css'
})
export class UpdateThumbnailComponent {

  @Input() thumbnalAndTitleData : any;
  @Output() closepoup = new EventEmitter<any>();

  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  isUploadImage : boolean = false

  degetalProductDetails : any


  constructor( private _fb : FormBuilder, private _digitalProduct : DigitalProductService ) { }

  ngOnInit() {

    this.getDigitalProductDetails();

  }

  getDigitalProductDetails(){
    this._digitalProduct.getDigitalProductDetailById(this.thumbnalAndTitleData.id).subscribe(res => {
      this.degetalProductDetails = res.data;

      if(this.degetalProductDetails.thumbnail !== null){
        this.isUploadImage = true
      }

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
    this.selectedFile = 'null';
    this.fileUpload = 'null'
    
  }


  submit(){

    const payload = new FormData();
    payload.append('product_id', this.thumbnalAndTitleData.id )
    payload.append('thumbnail', this.selectedFile )

    this._digitalProduct.updateThumbnailandTitle(payload).subscribe(res => {
      this.closepoup.emit(false)
    })

  }

  deleteThumnail(){
    this._digitalProduct.deleteThumbnail(this.thumbnalAndTitleData.id).subscribe(res => {
      this.isUploadImage = false
      this.getDigitalProductDetails();
    })

  }

}
