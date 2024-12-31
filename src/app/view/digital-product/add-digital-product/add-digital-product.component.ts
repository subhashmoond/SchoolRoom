import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SharedService } from '../../../shared/services/shared.service';
import { DigitalProductService } from '../../../core/services/digital-product.service';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-add-digital-product',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, CheckboxModule, MessagesModule, EditorModule,
    CommonModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './add-digital-product.component.html',
  styleUrl: './add-digital-product.component.css'
})
export class AddDigitalProductComponent {

  @Output() closepopup = new EventEmitter<any>();

  digitalProductForm!: FormGroup;
  addDigitalProductForm! : FormGroup;
  addProductFile! : FormGroup;
  addDecThumb! : FormGroup;
  activeIndex: number = 0;
  items: any;
  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;


  selectedFileObjectUrlTH: any;
  fileUploadTH: any;
  selectedFileTH: any;
  maxFileSizeLimitTH = 10 * 1024 * 1024;

  productType: any;
  activeIndexType: number = 0;
  productId : any;
  typeProduct : any


  constructor(private _router: Router, private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _sharedService: SharedService, private _digitalService: DigitalProductService) { }


  ngOnInit() {

    this.getDigitalProductType();

    this.activeIndex = 0

    this.items = [
      { label: 'Digital Product' },
      { label: 'Document and Price' },
      { label: 'Thumbnail and Description' }
    ];

    this.addDigitalProductForm = this._fb.group({
      title : ['', Validators.required]
    })

    this.addProductFile = this._fb.group({
      fileName : ['', Validators.required],
      ispaid : [true],
      price : []
    })

    this.addDecThumb = this._fb.group({
      description : []
    })

  }

  getDigitalProductType() {
    this._digitalService.getProductType().subscribe(res => {
      this.productType = res.data
    })
  }


  setActive(index: number, data : any) {
    this.activeIndexType = index;
    this.typeProduct = data.id

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


  onThamFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFileTH = event.files[0];
      if (this.selectedFileTH) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrlTH = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFileTH);
      }
    }
  }

  profileThamRemove() {
    this.selectedFileObjectUrlTH = null;
    this.fileUploadTH.clear();
  }



  submit() {

    console.log(this.activeIndex, "Comman Active Index", this.activeIndexType)



    if(this.activeIndex === 0){
      
      const formData = new FormData();
      formData.append('title', this.addDigitalProductForm.get('title')?.value )
      formData.append('productTypeId', this.typeProduct )

      this._digitalService.addDigitalProdcut(formData).subscribe((res:any) => {
        if(res.status === true){
          this.productId = res._id
          this.next();
        }else{
        this._messageService.add({ severity: 'error', detail: res.messages });
        }
      });

    }

    if(this.activeIndex === 1){

      const formData = new FormData();
      formData.append('fileName', this.addProductFile.get('fileName')?.value )
      // formData.append('filePath', this.selectedFileObjectUrl )
      formData.append('isPaid', this.addProductFile.get('ispaid')?.value )
      formData.append('mrp', this.addProductFile.get('price')?.value )
      formData.append('price', this.addProductFile.get('price')?.value )

      this._digitalService.updateDigitalProduct(this.productId, formData).subscribe(res => {
        this.next();
      })

    }

    if(this.activeIndex === 2){

      const formData = new FormData();
      formData.append('describe', this.addDecThumb.get('description')?.value )
      // formData.append('thumbnail', this.selectedFileObjectUrlTH )

      this._digitalService.updateDigitalProduct(this.productId, formData).subscribe(res => {
        this.closepopup.emit(false)
      })

    }

  }


  next() {
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  back() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

}
