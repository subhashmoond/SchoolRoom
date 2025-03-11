import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DigitalProductService } from '../../core/services/digital-product.service';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AddDigitalProductComponent } from './add-digital-product/add-digital-product.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-digital-product',
  standalone: true,
  imports: [ButtonModule, TableModule, PaginatorModule, CommonModule, ConfirmDialogModule, TagModule, SidebarModule, AddDigitalProductComponent, ToastModule, TooltipModule ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './digital-product.component.html',
  styleUrl: './digital-product.component.css'
})
export class DigitalProductComponent {

  digitalProductList: any;
  addDigitalProduct: boolean = false

  constructor(private _digitalService: DigitalProductService, private _confirmationService: ConfirmationService, private _messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.getDigitalProductList()
  }

  addDigitalProducts() {
    this.addDigitalProduct = true
  }

  getDigitalProductList() {
    this._digitalService.getDigitalProduct().subscribe(res => {
      this.digitalProductList = res.data
    })
  }

  productDetailPage(id: any) {
    this.router.navigate(['digital-product/detail', id])
  }


  publishProduct(id : any) {
    const payload = {
      "isPublished": true
    }

    this._digitalService.publishDigitalProduct(id, payload).subscribe((res : any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: "Digital product published successfully!" });
       this.getDigitalProductList();
      }

    });


  }



  deleteProduct(data: any) {

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete digital product ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        this._digitalService.deleteDigitalProduct(data.id).subscribe((res: any) => {

          if (res.status === true) {
            this._messageService.add({ severity: 'success', detail: "Digital product deleted successfully!" });
            this.getDigitalProductList();
          }

        })

      },
      reject: () => {

      }

    });



  }


}
