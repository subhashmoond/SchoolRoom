import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ExamCategoryService } from '../../../core/services/exam-category.service';

@Component({
  selector: 'app-add-exam-category',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, SidebarModule, TranslateModule,
    ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './add-exam-category.component.html',
  styleUrl: './add-exam-category.component.css'
})
export class AddExamCategoryComponent {

  createExamCategoryForm!: FormGroup;
  @Output() closeSideBars = new EventEmitter<any>();

  isEdit : boolean = false

  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _examCategory : ExamCategoryService) { }


  ngOnInit() {

    this.createExamCategoryForm = this._fb.group({
      name: ['', Validators.required]
    })

  }


  sameExamCategory() {

    // this._messageService.add({ severity: 'success', detail: res.message });

    const payload = {
      "name": this.createExamCategoryForm.get('name')?.value
    }

    this._examCategory.addExamCategory(payload).subscribe((res : any) => {
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
