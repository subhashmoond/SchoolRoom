import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ExamCategoryService } from '../../../core/services/exam-category.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule ],
  providers: [MessageService],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {

  @Input() subCategoryData: any;
  @Output() closeSideBar = new EventEmitter<any>()

  constructor(private _messageService: MessageService, private _examCategoryService: ExamCategoryService) { }

  ngOnInit() {
    console.log(this.subCategoryData, "category view details")
  }

  deleteCategory(id: any) {

    const payload = {
      "sub_category_id": 3
    }

    this._examCategoryService.deleteSubCategory(payload).subscribe((res: any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: res.message });
        this.subCategoryData.subcategories = this.subCategoryData.subcategories.filter((category: any) => category.id !== id);
      } else {
        this._messageService.add({ severity: 'error', detail: res.message });
      }
    })

  }

  closeSideBars(){
    this.closeSideBar.emit(false)
  }

}
