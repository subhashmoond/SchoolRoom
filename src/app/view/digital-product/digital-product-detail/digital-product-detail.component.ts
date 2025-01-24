import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DigitalProductService } from '../../../core/services/digital-product.service';
import { DigitalProductInfoComponent } from './digital-product-info/digital-product-info.component';
import { DialogModule } from 'primeng/dialog';
import { UpdateThumbnailComponent } from './update-thumbnail/update-thumbnail.component';
import { SharedService } from '../../../shared/services/shared.service';
import { ContentComponent } from './content/content.component';
import { DigitalProductPriceComponent } from './digital-product-price/digital-product-price.component';
import { DigitalProductReviewComponent } from './digital-product-review/digital-product-review.component';
import { DigitalProductFaqComponent } from './digital-product-faq/digital-product-faq.component';

@Component({
  selector: 'app-digital-product-detail',
  standalone: true,
  imports: [ButtonModule, ToastModule, MessagesModule, CommonModule, DigitalProductInfoComponent, DialogModule, UpdateThumbnailComponent, ContentComponent, DigitalProductPriceComponent, DigitalProductReviewComponent, DigitalProductFaqComponent ],
  providers: [MessageService],
  templateUrl: './digital-product-detail.component.html',
  styleUrl: './digital-product-detail.component.css'
})
export class DigitalProductDetailComponent {

  digitalProductId : any;

  currentActiveTab : string = 'content';
  isThumbnail : boolean = false;

  digitalProductDetail : any;
  thumbnalAndTitleData : any

  constructor( private _sharedService : SharedService, private _router: Router, private _messageService: MessageService, private _digitalService: DigitalProductService, private route: ActivatedRoute,) {
    this.route.paramMap.subscribe(params => {
      this.digitalProductId = params.get('id')!;
    });
  }


  ngOnInit() {
    this._sharedService.settoggleButtonValue(false);

    this.getProductDetail();
  }

  getProductDetail(){

    this._digitalService.getDigitalProductDetailById(this.digitalProductId).subscribe(res => {
      this.digitalProductDetail = res.data
    });

  }


  courseTabs(type : any){
    this.currentActiveTab = type;
    console.log(this.currentActiveTab, "curent tab name ")
  }


  updateThumbnail(){
    
    this.isThumbnail = true;
    this.thumbnalAndTitleData = {
      "id" : this.digitalProductDetail.id,
      "title" : this.digitalProductDetail.name,
      "thumbnail" : this.digitalProductDetail.thumbnail
    }

  }


  closeThumbnailPopup(event : any){
    this.isThumbnail = false;
    this._messageService.add({ severity: 'success', detail: 'Thumbnail Updated Successfull !' });
    this.getProductDetail();
  }
  
  ngOnDestroy(){
    this._sharedService.settoggleButtonValue(true);
  }


}
