import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DigitalProductService } from '../../core/services/digital-product.service';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { AddDigitalProductComponent } from './add-digital-product/add-digital-product.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digital-product',
  standalone: true,
  imports: [ButtonModule, TableModule, PaginatorModule, CommonModule, TagModule, SidebarModule, AddDigitalProductComponent, ToastModule ],
  providers: [MessageService],
  templateUrl: './digital-product.component.html',
  styleUrl: './digital-product.component.css'
})
export class DigitalProductComponent {

  digitalProductList : any;
  addDigitalProduct : boolean = false

  constructor( private _digitalService : DigitalProductService, private _messageService: MessageService, private router : Router ){}

  ngOnInit(){
    this.getDigitalProductList()
  }

  addDigitalProducts(){
    this.addDigitalProduct = true
  }

  getDigitalProductList(){
    this._digitalService.getDigitalProduct().subscribe(res => {
      this.digitalProductList = res.data
    })
  }

  productDetailPage(id : any){
    this.router.navigate(['digital-product/detail', id])
  }

  deleteProduct(data : any){

    this._digitalService.deleteDigitalProduct(data.id).subscribe((res : any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: "Degital product deleted successfully!" });
        this.getDigitalProductList();
      }

    })

  }


}
