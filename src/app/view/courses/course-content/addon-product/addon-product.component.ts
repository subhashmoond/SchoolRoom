import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
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
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DigitalProductService } from '../../../../core/services/digital-product.service';
import { DropdownModule } from 'primeng/dropdown';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-addon-product',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, TagModule, ButtonModule, SidebarModule, PaginatorModule, CardModule, SkeletonModule, ReactiveFormsModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './addon-product.component.html',
  styleUrl: './addon-product.component.css'
})
export class AddonProductComponent {

  isAddOnProduct: boolean = false;
  addOnProductForm!: FormGroup;
  courseId: any;
  productList: any;
  testListData: any;
  isLoader: boolean = true;
  addedProductList: any;

  productType = [
    { 'name': "Digital Product", 'type': "digital_product" },
    { 'name': "Test Series", 'type': "test_series" },
  ]

  constructor(private _fb: FormBuilder, private _digitalProductService: DigitalProductService, private route: ActivatedRoute, private _messageService: MessageService, private _courseService: CoursesService) {

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {

    this.getAddedProductList();

    this.addOnProductForm = this._fb.group({
      productType: [],
      productId: []
    })

  }

  getAddedProductList() {
    this._courseService.getAddOnProductList(this.courseId).subscribe(res => {
      this.addedProductList = res.data
    })
  }

  getDigitalProductList() {
    this._digitalProductService.getDigitalProduct().subscribe(res => {
      this.productList = res.data
    })
  }

  getTestSeriesList() {
    this._courseService.getCourseListTypeWais('Test Series').subscribe(res => {
      this.testListData = res.courses
    })
  }

  onProductTypeChange(event: any) {
    console.log(event.value)

    if (event.value === 'digital_product') {
      this.getDigitalProductList();
    }

    if (event.value === 'test_series') {
      this.getTestSeriesList();
    }


  }

  saveProduct() {

    const payload = {
      "product_type": this.addOnProductForm.get('productType')?.value,
      "product_id": this.addOnProductForm.get('productId')?.value
    }

    this._courseService.postAddOnProdcut(this.courseId, payload).subscribe((res: any) => {

      if (res.status === true) {
        this.isAddOnProduct = false;
        this._messageService.add({ severity: 'success', summary: "Product Added Successfully !" });
        this.getAddedProductList();
        this.addOnProductForm.reset()
      }else{
        this._messageService.add({ severity: 'error', summary: "error" });
      }

    })

  }

  deleteDigitalProduct(productId : any){

    const payload = {
      "add_on_id": productId
    }

    this._courseService.deleteAddedProduct(this.courseId, payload).subscribe((res :any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', summary: "Product Deleted Successfully !" });
        this.getAddedProductList();
      }

    })

  }


  close() {
    this.isAddOnProduct = false
  }


  addProduct() {
    this.isAddOnProduct = true
  }

}
