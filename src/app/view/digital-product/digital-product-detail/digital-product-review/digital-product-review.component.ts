import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-digital-product-review',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, ToastModule, RadioButtonModule, InputSwitchModule, SkeletonModule, ReactiveFormsModule, FormsModule, CheckboxModule, CalendarModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './digital-product-review.component.html',
  styleUrl: './digital-product-review.component.css'
})
export class DigitalProductReviewComponent {

  @Input() digitalProductDetail : any;

  allowReview : any;
  digitalProductId : any;

  constructor( private _digitalService : DigitalProductService, private route : ActivatedRoute, private _messageService: MessageService){
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit(){

    this.allowReview = this.digitalProductDetail.allowReviews

  }

  onAllowReviewChange(){
    console.log(this.allowReview, "Allow reviews")

    const payload = {
      "allowCourseReview": this.allowReview
  }

    this._digitalService.allowReviews(this.digitalProductId, payload).subscribe((res : any) => {
      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: 'Review Allow Successfull !' });
      }
    })

  }

}
