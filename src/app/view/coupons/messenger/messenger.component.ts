import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AddPushMessageComponent } from './add-push-message/add-push-message.component';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, 
    RippleModule, SkeletonModule, ToastModule, AddPushMessageComponent ],
  providers : [MessageService],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.css'
})
export class MessengerComponent {

  offset = 0;
    totalRecorde = 100;
    limit = 15;
    addMessenger : boolean = false;
    // openDropdownId: number | null = null;
    // editItemData : any;
    isLoader : boolean = false;
  
    messengerList: any = [];
  
    constructor(private renderer: Renderer2, private _router: Router, private _messageService : MessageService) {
    }
  
    ngOnInit() {
      this.getCouponData();
    }
  
  
    addProduct(){}
  
    deleteCoupon(id : any){
      const payload = {
        "promo_code": id
      }
  
      // this._couponService.deleteCoupons(payload).subscribe((res:any) => {
      //   if(res.status === true){
      //     this._messageService.add({ severity: 'success', detail: res.message });
      //     this.getCouponData()
      //   }else{
      //     this._messageService.add({ severity: 'error', detail: res.message });
      //   }
      // })
  
    }
  
    getCouponData() {
      this.isLoader = true;
      // this._couponService.getCouponsList().subscribe(res => {
      //   this.isLoader = false;
      //   this.couponstList = res.data;
      // })
    }
  
    openSidebar() {
      this.addMessenger = true;
    }
  
    onPageChange(event: any) {
    }
  
    viewDetails() {
      this._router.navigate(['/user/student-view']);
    }
  
    closeSideBar(){
      this.addMessenger = false;
    }

}
