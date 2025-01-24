import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-digital-product-price',
  standalone: true,
  imports: [ ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, KeyFilterModule,
    ButtonModule, InputTextModule, ToastModule, CheckboxModule,
    CommonModule, InputSwitchModule],
  templateUrl: './digital-product-price.component.html',
  styleUrl: './digital-product-price.component.css'
})
export class DigitalProductPriceComponent {

  addProductPrice! : FormGroup
  digitalProductId : any;
  isAdvancedSetting : boolean = false;


  constructor( private _fb : FormBuilder, private _digitalService : DigitalProductService, private route : ActivatedRoute ){
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
      pgfees: []
    })

  }


  advancedSetting(){
    this.isAdvancedSetting = true
  }


  submit(){

    const payload = {

      "isPaid": this.addProductPrice.get('ispaid')?.value,
      "mrp": this.addProductPrice.get('mrp')?.value,
      "price": this.addProductPrice.get('price')?.value,
      "isDownloadable": false,
      "is_life_time_access": this.addProductPrice.get('timelimit')?.value,
      "validity": this.addProductPrice.get('days')?.value,
      "allow_handling_fees": this.addProductPrice.get('pgfees')?.value
      // "allow_handling_fees"
    }

    this._digitalService.updateDigitalProduct(this.digitalProductId, payload).subscribe(res => {
      
    })

  }



  

}
