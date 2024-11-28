import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CouponsService } from '../../../core/services/coupons.service';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [TableModule, ToastModule, InputTextModule, ToolbarModule, KeyFilterModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  providers : [MessageService],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.css'
})
export class AddCouponComponent {

  createCouponsForm!: FormGroup;
  @Output() closeSideBars = new EventEmitter<any>()

  constructor(private _fb: FormBuilder, private _couponService: CouponsService, private _messageService : MessageService) { }


  ngOnInit() {

    this.createCouponsForm = this._fb.group({
      discount: ['', Validators.required],
      valid_to: ['', Validators.required]
    })

  }

  createCoupon() {

    const payload = {
      // "course": [10],
      "suggest_during_checkout": false,
      "valid_to": "2024-08-15",
      "discount": this.createCouponsForm.get('discount')?.value
    }

    this._couponService.createCoupons(payload).subscribe(res => {
      this.closeSideBars.emit(false)
    }, error => {
      this._messageService.add({ severity: 'error', detail: 'Error ' });
    })

  }

  closeSideBar() {
    this.closeSideBars.emit(false)
  }

}
