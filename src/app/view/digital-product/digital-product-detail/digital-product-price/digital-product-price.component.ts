import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-digital-product-price',
  standalone: true,
  imports: [ ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, KeyFilterModule,
    ButtonModule, InputTextModule, ToastModule, CheckboxModule, 
    CommonModule, InputSwitchModule],
    providers: [MessageService],
  templateUrl: './digital-product-price.component.html',
  styleUrl: './digital-product-price.component.css'
})
export class DigitalProductPriceComponent {

  @Input() digitalProductDetail : any;

  addProductPrice! : FormGroup
  digitalProductId : any;
  isAdvancedSetting : boolean = false;


  constructor( private _fb : FormBuilder, private _messageService: MessageService, private _digitalService : DigitalProductService, private route : ActivatedRoute ){
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }

  ngOnInit(){

    this.addProductPrice = this._fb.group({
      ispaid: [true],
      price: [],
      mrp: [],
      timelimit: [],
      pgfees: [],
      days : []
    })

    this.addProductPrice.patchValue({
      ispaid: this.digitalProductDetail.isPaid,
      price: this.digitalProductDetail.price,
      mrp: this.digitalProductDetail.mrp,
      timelimit: this.digitalProductDetail.allow_handling_fees,
      pgfees: this.digitalProductDetail.allow_handling_fees,
      days : this.digitalProductDetail.validity
    })

    console.log(this.digitalProductDetail, " Digital Product Details ")

  }

  advancedSetting(){
    this.isAdvancedSetting = true
  }


  submit(){



    const payload = {

      "isPaid": this.addProductPrice.get('ispaid')?.value,
      "mrp": this.addProductPrice.get('mrp')?.value,
      "price": this.addProductPrice.get('price')?.value,
      "is_life_time_access": this.addProductPrice.get('timelimit')?.value,
      "validity": this.addProductPrice.get('days')?.value,
      "allow_handling_fees": this.addProductPrice.get('pgfees')?.value
      // "allow_handling_fees"
    }

    this._digitalService.updateDigitalProduct(this.digitalProductDetail.id, payload).subscribe((res : any) => {
      
      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: 'Price Updated Successfull !' });
      }

    })

  }



  

}
