import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DigitalProductService } from '../../../core/services/digital-product.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-digital-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, CheckboxModule, MessagesModule, EditorModule,
    CommonModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './digital-product-detail.component.html',
  styleUrl: './digital-product-detail.component.css'
})
export class DigitalProductDetailComponent {

  updateDigitalProductForm!: FormGroup;
  productType: any;

  selectedFileObjectUrlTH: any;
  fileUploadTH: any;
  selectedFileTH: any;
  maxFileSizeLimitTH = 10 * 1024 * 1024;

  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  maxFileSizeLimit = 10 * 1024 * 1024;

  digitalProductId: any

  constructor(private _router: Router, private _fb: FormBuilder, private _messageService: MessageService, private _digitalService: DigitalProductService, private route: ActivatedRoute,) {
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit() {

    this.getProductDetailById();
    this.getDigitalProductType();

    this.updateDigitalProductForm = this._fb.group({
      name: [],
      typeproduct: [],
      description: []
    })

  }

  getDigitalProductType() {
    this._digitalService.getProductType().subscribe(res => {
      this.productType = res.data
    })
  }

  getProductDetailById() {
    this._digitalService.getDigitalProductDetailById(this.digitalProductId).subscribe(res => {

      this.updateDigitalProductForm.patchValue({
        name: res.data.name,
        typeproduct: res.data.productType.id,
        description: res.data.description 
      })

    })
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


  // Document File Upload 
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

  // End content upload methode

  updateProduct(){
    
  }

}
