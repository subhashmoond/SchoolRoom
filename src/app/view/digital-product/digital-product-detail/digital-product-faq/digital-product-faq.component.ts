import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-digital-product-faq',
  standalone: true,
  imports: [TranslateModule, SkeletonModule, TableModule, ReactiveFormsModule, FormsModule, FileUploadModule, DialogModule, ButtonModule, ConfirmDialogModule, ToastModule, CommonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './digital-product-faq.component.html',
  styleUrl: './digital-product-faq.component.css'
})
export class DigitalProductFaqComponent {

  faqFrom!: FormGroup

  digitalProductId: any;
  digitalProductDetail : any

  constructor(private _digitalProductService: DigitalProductService, private route: ActivatedRoute, private _messageService: MessageService, private _fb: FormBuilder) {
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit() {
    this.faqFrom = this._fb.group({
      faq: this._fb.array([])
    });


    this.getProductDetail()

  }


  getProductDetail(){

    this._digitalProductService.getDigitalProductDetailById(this.digitalProductId).subscribe(res => {
      this.digitalProductDetail = res.data;

       this.digitalProductDetail.faq.forEach((faqItem: any) => {
            this.faq.push(
              this._fb.group({
                question: [faqItem.question || '', Validators.required],
                answer: [faqItem.answer || '', Validators.required]
              })
            );
          });


    });

  }

  
  
  get faq(): FormArray {
    return this.faqFrom.get('faq') as FormArray;
  }
  
  addFaq() {
    const rowGroup = this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  
    this.faq.push(rowGroup);
  }

  deleteFaq(index: number) {
    this.faq.removeAt(index);
  }
  

  saveFaq() {

    const formFaqValue =  this.faqFrom.get('faq')?.value || [];

    const payload = {
      faq: formFaqValue.map((item : any) => ({
        question: item.question,
        answer: item.answer
      }))
    }

    console.log(payload, "form values payload payload payload")

    this._digitalProductService.updateDigitalProduct(this.digitalProductId, payload).subscribe(res => {

    })

  }



}
