import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ExamCategoryService } from '../../../core/services/exam-category.service';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, SidebarModule, TranslateModule,
      ReactiveFormsModule],
    providers: [MessageService],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {

  
  createExamSubCategoryForm!: FormGroup;
  @Input() examCategoryId : any;
  @Output() closeSideBars = new EventEmitter<any>();

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _examCategory : ExamCategoryService) { }


  ngOnInit() {

    this.createExamSubCategoryForm = this._fb.group({
      name: ['', Validators.required]
    })

  }


  sameExamCategory() {

    // this._messageService.add({ severity: 'success', detail: res.message });

    const payload = {
      "category_id": this.examCategoryId,
      "name": this.createExamSubCategoryForm.get('name')?.value
  }

    this._examCategory.addExamSubCategory(payload).subscribe((res : any) => {
      if(res.status === true){
        this.closeSideBars.emit(res)
        // this._messageService.add({ severity: 'success', detail: res.message });
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }

    })

  }

  closeSideBar() { 
    this.closeSideBars.emit('res')
  }


}
