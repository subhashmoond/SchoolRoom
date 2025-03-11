import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-digital-product-info',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, CheckboxModule, MessagesModule, EditorModule,
    CommonModule, InputSwitchModule],
  providers: [MessageService],
  templateUrl: './digital-product-info.component.html',
  styleUrl: './digital-product-info.component.css'
})
export class DigitalProductInfoComponent {



  updateDigitalProductForm!: FormGroup;
  productType: any;


  digitalProductId: any
  langlist: any;
  productCategoryData : any;

  constructor(private _router: Router, private _fb: FormBuilder, private _messageService: MessageService, private _digitalService: DigitalProductService, private route: ActivatedRoute, private _sharedService: SharedService) {
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit() {

    this.getProductDetailById();
    this.getDigitalProductType();
    this.getLangData();
    this.getProductCategory();

    this.updateDigitalProductForm = this._fb.group({
      name: [],
      edition: [],
      label: [],
      language: [],
      lifetime: [],
      validitydays: [],
      description: [],
      productcategory : []
    })

  }

  getLangData() {
    this._sharedService.getLangList().subscribe(res => {
      this.langlist = res
    })
  }

  getProductCategory(){
    this._digitalService.getDigitalProductCategoryList().subscribe(res => {
      this.productCategoryData = res.data
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
        description: res.data.description,
        edition: res.data.edition,
        label: res.data.label,
        language: res.data.language,
        // lifetime: res.data.isLifeTimeAccess,
        productcategory : res.data.category.id
        // ispublished: res.data.is_published,
        // validitydays: [],
      })

    })
  }


  // End content upload methode

  updateProduct() {

    console.log(this.updateDigitalProductForm.value, "info form datas ")

    const formValue = this.updateDigitalProductForm.value

    const payload = {
      "title": formValue.name,
      // "is_life_time_access": formValue.lifetime,
      // "validity":200,
      "edition": formValue.edition,
      "aboutus": formValue.description,
      "label": formValue.label,
      "language": formValue.language,
    }

    this._digitalService.updateDigitalProduct(this.digitalProductId, payload).subscribe( res => {
      
      this.getProductDetailById();

    })

  }

}
