import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CouponsService } from '../../core/services/coupons.service';
import { AddCouponComponent } from './add-coupon/add-coupon.component';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, AddCouponComponent],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent {

  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addStudentSideBar: boolean = false;

  couponstList: any = [];

  constructor(private renderer: Renderer2, private _router: Router, private _couponService : CouponsService) {
  }

  ngOnInit() {
    this.getCouponData();
  }


  getCouponData() {
    this._couponService.getCouponsList().subscribe(res => {
      console.log(res, "coupons Data Lists")
      this.couponstList = res.data
    })
  }

  openSidebar() {
    this.addStudentSideBar = true;
  }

  onPageChange(event: any) {
  }

  viewDetails() {
    this._router.navigate(['/user/student-view']);
  }

  closeSideBar(){
    this.addStudentSideBar = false;
    this.getCouponData();
  }

}
