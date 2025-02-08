import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AddExamCategoryComponent } from './add-exam-category/add-exam-category.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExamCategoryService } from '../../core/services/exam-category.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { SubCategoryComponent } from "./sub-category/sub-category.component";
import { TagModule } from 'primeng/tag';
import { CategoryDetailComponent } from "./category-detail/category-detail.component";
import { TabViewModule } from 'primeng/tabview';
import { AddDigitalProductCategoryComponent } from './digital-product-category/add-digital-product-category/add-digital-product-category.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-exam-category',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule, AddExamCategoryComponent, ConfirmDialogModule, ToastModule, TableModule, PaginatorModule, TooltipModule, SubCategoryComponent, TagModule, CategoryDetailComponent, TabViewModule, AddDigitalProductCategoryComponent ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './exam-category.component.html',
  styleUrl: './exam-category.component.css'
})
export class ExamCategoryComponent {
  isSideBar: boolean = false;
  isAddDigitalCategory : boolean = false;
  editDigitalCategoryData : any;
  examCategoryList: any;
  isSubcategory: boolean = false;
  isViewDetails : boolean = false

  examCategoryId: any
  subCategoryData : any;
  digitalproductDataList : any ;

  offset = 0;
  totalRecorde = 2;
  limit = 15;

  constructor(private _messageService: MessageService, private _confirmationService: ConfirmationService, private _examCategory: ExamCategoryService) { }

  ngOnInit() {
    this.getExamCategoryAndSubCategoryList();
    this.getDigitalProductCategory();

  }

  addExamCategory() {
    this.isSideBar = true
  }

  getDigitalProductCategory(){

    this._examCategory.getDigitalProductCategory().subscribe(res => {
      this.digitalproductDataList = res.data
    })

  }

  getExamCategoryAndSubCategoryList() {

    this._examCategory.getExamCategoryList().subscribe(res => {
      this.examCategoryList = res.data
    })
  }


  closeSideBar(event: any) {

    if (event.status === true) {
      this.isSideBar = false;
      this.isAddDigitalCategory = false;
      this._messageService.add({ severity: 'success', detail: event.message });
    } else {
      this.isSideBar = false
    }

    this.getExamCategoryAndSubCategoryList();
    this.getDigitalProductCategory();

  }

  subCategoryCloseSideBar(event: any) {

    if (event.status === true) {
      this.isSubcategory = false
      this._messageService.add({ severity: 'success', detail: event.message });
    } else {
      this.isSubcategory = false
    }

    this.getExamCategoryAndSubCategoryList()

  }

  viewDetails(data : any) {
    this.isViewDetails = true
    this.subCategoryData = data
  }

  closeDetailSideBar(event : any){
    this.isViewDetails = false
    this.subCategoryData = []
  }

  onPageChange(event: any) {
  }


  addSubCategory(id: any) {
    this.isSubcategory = true;
    this.examCategoryId = id
  }

  
  

  deleteCategory(id: any) {

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete category ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        const payload = {
          "category_id": id
        }
    
        this._examCategory.deleteCategory(payload).subscribe((res: any) => {
          if (res.status === true) {
            this._messageService.add({ severity: 'success', detail: res.message });
            this.getExamCategoryAndSubCategoryList()
          } else {
            this._messageService.add({ severity: 'error', detail: res.message });
          }
        })
        
      },
      reject: () => {

      }

    });


  }



  // Digital Product Category 

  addDigiCategory(){
    this.isAddDigitalCategory = true
  }

  editDigiCategory(data : any){
    this.isAddDigitalCategory = true;
    this.editDigitalCategoryData = data
  }

  deleteDigiCategory(id : any){

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete category ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {
    
        this._examCategory.deleteDigitalCategory(id).subscribe((res: any) => {
          if (res.status === true) {
            this._messageService.add({ severity: 'success', detail: res.message });
            this.getDigitalProductCategory();
          } else {
            this._messageService.add({ severity: 'error', detail: res.message });
          }
        })
        
      },
      reject: () => {

      }

    });

  }




}
